
import PokemonCard from "./PokemonCard";
import { Pokemon } from '../types/pokemon';

interface CollectionItem {
  name: string;
  details?: Pokemon;
}

interface SelectableItemProps {
  poke: CollectionItem;
  selected: boolean;
  onSelectChange: (name: string, checked: boolean) => void;
}

export default function SelectableItem({ poke, selected, onSelectChange }: SelectableItemProps) {
  return (
    <div className="mb-8 relative group animate-fadein transition-all duration-300">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelectChange(poke.name, e.target.checked)}
        className="absolute top-4 left-4 z-30 w-5 h-5 accent-indigo-600 rounded-md border border-gray-300 group-hover:ring-2 ring-indigo-400 transition"
        title="Select for removal"
        style={{
          transition: "opacity 0.2s",
          opacity: 1,
        }}
      />
      <PokemonCard details={poke.details} mode="collection" name={poke.name} />
    </div>
  );
}