import React from "react";
import PokemonCard from "./PokemonCard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ poke }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: poke.name });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-8 cursor-grab relative transition-transform duration-300"
    >
      <PokemonCard details={poke.details} mode="collection" />
    </div>
  );
}
