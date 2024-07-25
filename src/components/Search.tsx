import { client } from '@/lib/redis'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'

export default async function Search() {
  // const cubers = await client.json.objKeys('cubers:2016GOTT01')
  // console.log(cubers)

  // console.log(cubers);
  const cubers = [{wcaId: '2016GOTT01'}]

  return (
    <></>
    // <Autocomplete
    //   defaultItems={cubers}
    //   label="Cubers"
    //   placeholder='Guess a cuber'
    // >
    //   {cuber => <AutocompleteItem key={cuber.wcaId}>{cuber.wcaId}</AutocompleteItem>}
    // </Autocomplete>
  )
}
