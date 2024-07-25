import { client } from "@/lib/redis";
import { getBestRank, getTotalTop100Ranks } from "@/lib/utils";
import { ApiPerson, WCAPerson } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { WcaId } from "@wca/helpers";

/**
 * This component is to be used to display a guess
 * 
 * Each guess will show the user the following items:
 *     - WCA id year
 *     - World rank
 *     - Number of top 100 rankings
 *     - Country
 */
export default async function GuessItem({ wcaId } : { wcaId: WcaId }) {
  const res = await fetch(`https://www.worldcubeassociation.org/api/v0/persons/${wcaId}`);
  const cuber = await res.json() as ApiPerson;
  const { person } = cuber

  // const cuber = await client.json.get(`cubers:${wcaId}`)
  // console.log(cuber)
  
  const cuberItems = [
    { header: "Year", body: wcaId.slice(0, 4) },
    { header: "Rank", body: getBestRank(cuber) },
    { header: "Top 100", body: getTotalTop100Ranks(cuber) },
    { header: "Country", body: person.country.id }
  ]

  return (
    <Card as={Link} href={`https://wca.link/${wcaId}`} isExternal className="m-2 w-5/12">
      <CardHeader className="flex">
        <Avatar showFallback src={person.avatar.url} size="lg" name={person.name} />
        <div className="text-xl m-4">{person.name} ({wcaId})</div>
      </CardHeader>

      <CardBody>
        <div className="flex justify-between">
          {cuberItems.map((item, index) => (
            <Card key={index} className="w-full m-2">
              <CardHeader>{item.header}</CardHeader>
              <CardBody>{item.body}</CardBody>
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
