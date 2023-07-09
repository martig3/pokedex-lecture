import { useEffect, useState } from 'react';
import './App.css';

interface Pokemon {
  abilities: { ability: { name: string }; slot: string }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

function App() {
  const [data, setData] = useState<Pokemon>({ abilities: [], stats: [] });
  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
      const json = (await response.json()) as Pokemon;
      setData(json);
    };
    getData().catch(console.error);
  }, []);
  return (
    <>
      <h2>Abilities</h2>
      <ol>
        {data.abilities.map((s) => (
          <li key={s.ability.name}>
            Name: {s.ability.name}, Slot: {s.slot}
          </li>
        ))}
      </ol>
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
