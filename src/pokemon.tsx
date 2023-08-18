import { useLoaderData } from 'react-router-dom';
import Abilities from './components/abilities';
import Stats from './components/stats';

export interface Ability {
  ability: { name: string };
  slot: string;
}

export interface Stat {
  stat: { name: string };
  base_stat: number;
}

interface Pokemon {
  sprites?: { front_default?: string };
  name: string;
  abilities: Ability[];
  stats: Stat[];
}
export default function Pokemon() {
  const { data } = useLoaderData() as { data: Pokemon };
  return (
    <>
      <h1 style={{ textTransform: 'uppercase' }}>{data.name}</h1>
      <img width={150} src={data?.sprites?.front_default} />
      <Abilities abilities={data.abilities} />
      <Stats stats={data.stats} />
    </>
  );
}

//@ts-expect-error type issue
export async function loader({ params }) {
  const response = await fetch(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    `https://pokeapi.co/api/v2/pokemon/${params?.name as string}`
  );
  const json = (await response.json()) as Pokemon;
  return {
    data: json,
  };
}
