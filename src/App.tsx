import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import './App.css';

interface PokemonRecord {
  name: string;
  url: string;
}

interface PokemonUniverse {
  results: PokemonRecord[];
}

function App() {
  const navigate = useNavigate();
  const { pokemonUniverse } = useLoaderData() as {
    pokemonUniverse: PokemonUniverse;
  };
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([] as PokemonRecord[]);

  useEffect(() => {
    if (search.length === 0) {
      setSearchResults([]);
      return;
    }
    const results = pokemonUniverse.results
      .filter((r) => r.name.includes(search))
      .splice(0, 5);
    setSearchResults(results);
  }, [search, pokemonUniverse.results]);

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
            <button onClick={() => navigate(`/pokemon/${r.name}`)}>
              Select
            </button>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}

export default App;

export async function loader() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=100000`
  );
  const json = (await response.json()) as PokemonUniverse;
  json.results.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return {
    pokemonUniverse: json,
  };
}
