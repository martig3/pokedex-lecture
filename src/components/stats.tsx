import { Stat } from '../App';

export default function Stats(props: { stats: Stat[] }) {
  return (
    <>
      <h2>Stats</h2>
      <ul>
        {props.stats.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name.toUpperCase()}: {s.base_stat}
          </li>
        ))}
      </ul>
    </>
  );
}
