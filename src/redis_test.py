import requests
import zipfile
from io import BytesIO
import redis
import pandas as pd
import os

def process_data(redis_client, singles_df, averages_df, persons_df, countries_df):
  """
  Processes singles and averages dataframes to create event_data and cuber_data,
  linking information from person and country DataFrames, merging before filtering

  Args:
      redis_client: The redis client object used for interacting with the Redis database.
      singles_df: Pandas DataFrame containing data about single competition results.
              * personId (str): WCA id.
              * eventId (str): WCA event ids such as 333, sq1, 333bld, ...
              * best (int): WCA result which could be a time in centiseconds or a result such as moves for FMC.
              * worldRank (int): World ranking for the event.
              * continentRank (int): Continental ranking for the event.
              * countryRank (int): Country ranking for the event.
      averages_df: Pandas DataFrame containing data about average competition results.
              * personId (str): WCA id.
              * eventId (str): WCA event ids such as 333, sq1, 333bld, ...
              * best (int): WCA result which could be a time in centiseconds or a result such as moves for FMC.
              * worldRank (int): World ranking for the event.
              * continentRank (int): Continental ranking for the event.
              * countryRank (int): Country ranking for the event.
      persons_df: Pandas DataFrame containing information about people.
              * subid (int): Identifier for the person with a nationality change.
              * name (str): Name of the person.
              * countryId (str): Identifier for the person's country.
              * gender (str): Gender of the person ("m", "f", or "0").
              * id: (str): WCA id.
      countries_df: Pandas DataFrame containing information about countries.
              * id (str): Unique identifier for the country (might match countryId in persons_df).
              * continentId (str): Identifier for the continent the country belongs to.
              * iso2 (str): Two-letter ISO code for the country.
              * name (str): Name of the country.
  """
  persons_headers = {
    'id': 'personId',
    'name': 'personName'
  }

  countries_headers = {
    'id': 'countryId',
    'name': 'countryName'
  }

  persons_df = persons_df.rename(columns=persons_headers)
  countries_df = countries_df.rename(columns=countries_headers)

  singles_df['event_type'] = 'single'
  averages_df['event_type'] = 'average'

  combined_df = pd.concat([singles_df, averages_df])
  combined_df['worldRank'] = pd.to_numeric(combined_df['worldRank'])
  combined_df = combined_df[combined_df['worldRank'] <= 100]
  persons_df = persons_df[persons_df['subid'] == 1]

  combined_df = combined_df.merge(persons_df, on='personId', how='left')
  combined_df = combined_df.merge(countries_df, on='countryId', how='left')

  print(len(combined_df['personId'].unique()))
  return
  
  for person_id, person_data in combined_df.groupby('personId'):
    person_name = person_data['personName'].iloc[0]
    country_id = person_data['countryId'].iloc[0]
    continent_id = person_data['continentId'].iloc[0]
    iso2 = person_data['iso2'].iloc[0]
    country_name = person_data['countryName'].iloc[0]
    
    events = []
    for _, event in person_data.iterrows():
      event_data = {
          "event_id": event['eventId'],
          "worldRank": event['worldRank'],
          "continentRank": event['continentRank'],
          "countryRank": event['countryRank'],
          "best": event['best'],
          "event_type": event['event_type'],
        }
      events.append(event_data)

    cuber_data = {
      "wcaId": person_id,
      "name": person_name,
      "country": {
        "id": country_id,
        "continentId": continent_id,
        "iso2": iso2,
        "name": country_name,
      },
      "events": events,
    }

    print(f'Processing {person_id}')
    redis_client.json().mset([(f"{os.environ['REDIS_HASH_NAME']}:{person_id}", "$", cuber_data)])


def main(redis_client):

  # Download TSV data (assuming it's within a ZIP archive)
  url = "https://www.worldcubeassociation.org/export/results/WCA_export.tsv"
  response = requests.get(url, stream=True)
  response.raise_for_status()
  print('Got WCA_export.tsv')

  # Process data from ZIP archive
  with BytesIO(response.content) as data_buffer:
    singles_df = pd.DataFrame()
    averages_df = pd.DataFrame()
    persons_df = pd.DataFrame()
    countries_df = pd.DataFrame()

    with zipfile.ZipFile(data_buffer) as zip_file:
      with zip_file.open("WCA_export_RanksSingle.tsv") as singles:
            print('opening WCA_export_RanksSingle.tsv')
            singles_df = pd.read_csv(singles, delimiter='\t', dtype={'personId': str, 'eventId': str, 'best': int, 'worldRank': int, 'continentRank': int, 'countryRank': int})
      with zip_file.open("WCA_export_RanksAverage.tsv") as averages:
          print('opening WCA_export_RanksAverage.tsv')
          averages_df = pd.read_csv(averages, delimiter='\t', dtype={'personId': str, 'eventId': str, 'best': int, 'worldRank': int, 'continentRank': int, 'countryRank': int})
      with zip_file.open("WCA_export_Persons.tsv") as persons:
        print('opening WCA_export_Persons.tsv')
        persons_df = pd.read_csv(persons, delimiter='\t', dtype={ 'subid': int, 'name': str, 'countryId': str, 'gender': str, 'id:': str })
      with zip_file.open("WCA_export_Countries.tsv") as countries:
        print('opening WCA_export_Countries.tsv')
        countries_df = pd.read_csv(countries, delimiter='\t', dtype={ 'id': str, 'continentId': str, 'iso2': str, 'name': str })

      process_data(redis_client, singles_df, averages_df, persons_df, countries_df)
      
      person = redis_client.json().get(f"{os.environ['REDIS_HASH_NAME']}:2016GOTT01")
      print(person)

if __name__ == "__main__":  
  redis_client = redis.Redis(host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT'], password=os.environ['REDIS_PASSWORD'])
  main(redis_client)
  redis_client.close()