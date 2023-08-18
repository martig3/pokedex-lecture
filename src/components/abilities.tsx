import { Ability } from '../pokemon';

export default function Abilities(props: { abilities: Ability[] }) {
  return (
    <>
      <h2>Abilities</h2>
      <ol>
        {props.abilities.map((s) => (
          <li key={s.ability.name}>
            {s.ability.name.toUpperCase()}, Slot: {s.slot}
          </li>
        ))}
      </ol>
    </>
  );
}
