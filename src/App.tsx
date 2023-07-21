import { useEffect, useState } from 'react';
import './App.css';
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

interface PokemonRecord {
  name: string;
  url: string;
}

interface PokemonUniverse {
  results: PokemonRecord[];
}

interface Pokemon {
  sprites?: { front_default?: string };
  name: string;
  abilities: Ability[];
  stats: Stat[];
}
function App() {
  const [data, setData] = useState<Pokemon>({
    abilities: [],
    stats: [],
    name: '',
  } as Pokemon);
  const [pokemon, setPokemon] = useState({ results: [] } as PokemonUniverse);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([] as PokemonRecord[]);

  useEffect(() => {
    if (search.length === 0) {
      setSearchResults([]);
      return;
    }
    const results = pokemon.results
      .filter((r) => r.name.includes(search))
      .splice(0, 5);
    setSearchResults(results);
  }, [search, pokemon.results]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=100000`
      );
      const json = (await response.json()) as PokemonUniverse;
      json.results.sort((a, b) => a.name.localeCompare(b.name, 'en'));
      setPokemon(json);
    };
    getData().catch(console.error);
  }, []);
  const getPokemon = async (url: string) => {
    const response = await fetch(url);
    const json = (await response.json()) as Pokemon;
    setData(json);
    setSearchResults([]);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search Pokemon..."
        onChange={(event) => setSearch(event.target.value)}
      />
      <ul>
        {searchResults.map((r) => (
          <li key={r.name}>
            {r.name}{' '}
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await getPokemon(r.url)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
      <h1 style={{ textTransform: 'uppercase' }}>{data.name}</h1>
      <img width={150} src={data?.sprites?.front_default} />
      <Abilities abilities={data.abilities} />
      <Stats stats={data.stats} />
    </>
  );
}

export default App;
