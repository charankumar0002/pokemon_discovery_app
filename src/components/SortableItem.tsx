import { memo } from "react";
import PokemonCard from "./PokemonCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pokemon } from '../types/pokemon';

interface CollectionItem {
  name: string;
  details?: Pokemon;
}

interface SortableItemProps {
  poke: CollectionItem;
}

function SortableItem({ poke }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: poke.name });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-8 cursor-grab relative"
    >
      <PokemonCard details={poke.details} mode="collection" name={poke.name} />
    </div>
  );
}

export default memo(SortableItem);