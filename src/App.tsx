import { useEffect, useState } from 'react';
import './App.css';
import Abilities from './components/abilities';

export interface Ability {
  ability: { name: string };
  slot: string;
}

export interface Stat {
  stat: { name: string };
  base_stat: number;
}

interface Pokemon {
  abilities: Ability[];
  stats: Stat[];
}
function App() {
  const [data, setData] = useState<Pokemon>({ abilities: [], stats: [] });
  const pokemonName = 'ditto';
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const json = (await response.json()) as Pokemon;
      setData(json);
    };
    getData().catch(console.error);
  }, []);
  return (
    <>
      <h1 style={{ textTransform: 'uppercase' }}>{pokemonName}</h1>
      <Abilities abilities={data.abilities} />
      <h2>Stats</h2>
      <ol>
        {data.stats.map((s) => (
          <li key={s.stat.name}>
            Name: {s.stat.name}, Value: {s.base_stat}
          </li>
        ))}
      </ol>
    </>
  );
}

export default App;
