import React from "react";
import PokemonCard from "./PokemonCard";

export default function SelectableItem({ poke, selected, onSelectChange }) {
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
      <PokemonCard details={poke.details} mode="collection" />
    </div>
  );
}
