import { Ability } from '../App';

export default function Abilities(props: { abilities: Ability[] }) {
  return (
    <>
      <h2>Abilities</h2>
      <ol>
        {props.abilities.map((s) => (
          <li key={s.ability.name}>
            Name: {s.ability.name}, Slot: {s.slot}
          </li>
        ))}
      </ol>
    </>
  );
}
