import { client } from '@/lib/redis'
import GuessItem from './GuessItem'
import Search from './Search'

export default async function Game() {
  const cuber = await client.json.get('cubers:2016GOTT01')
  console.log(cuber)

  const guesses = ['2016GOTT01', '2015CHER07', '2022CECC02']

  return (
    <div className='flex flex-col justify-center items-center'>
      <Search />
      {guesses && guesses.map(wcaId => (
        <GuessItem 
          key={wcaId}
          wcaId={wcaId}
        />
      ))}
    </div>
  )
}
