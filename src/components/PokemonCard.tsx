import { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { TYPE_COLORS } from "../utils/typeColors";
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  name: string;
  url?: string;
  inCollection?: boolean;
  onAdd?: (pokemon: Pokemon) => void;
  onRemove?: (name: string) => void;
  mode: "discovery" | "collection";
  details?: Pokemon;
}

export default function PokemonCard({
  url,
  inCollection,
  onAdd,
  onRemove,
  mode,
  details: propDetails,
}: PokemonCardProps) {
  const [details, setDetails] = useState<Pokemon | null>(propDetails || null);

  useEffect(() => {
    if (!propDetails && url) {
      fetch(url)
        .then((res) => res.json())
        .then(setDetails);
    }
  }, [propDetails, url]);

  if (!details)
    return (
      <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg flex items-center justify-center min-h-[200px] sm:min-h-[260px]">
        <span className="text-gray-400 text-sm sm:text-base">Loading...</span>
      </div>
    );

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-2 sm:p-4 flex flex-col items-center w-full">
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2">
        {mode === "discovery" && !inCollection && (
          <button
            aria-label="Add"
            onClick={() => onAdd && onAdd(details)}
            className="bg-green-500 hover:bg-green-700 text-white rounded-full p-1.5 sm:p-2 shadow transition"
            title="Add to Collection"
          >
            <FaPlus size={14} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        )}
        {mode === "discovery" && inCollection && (
          <button
            aria-label="Remove"
            onClick={() => onRemove && onRemove(details.name)}
            className="bg-red-500 hover:bg-red-700 text-white rounded-full p-1.5 sm:p-2 shadow transition"
            style={{ pointerEvents: "auto" }}
            title="Remove from Collection"
          >
            <FaTimes size={14} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        )}
      </div>
      {/* Image, name, types, stats */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-200 to-pink-500 flex items-center justify-center shadow-lg mb-3">
        <img
          src={details.sprites.front_default}
          alt={details.name}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-center capitalize">
        {details.name}
      </h3>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-2 mb-3">
        {details.types.map(({ type }) => (
          <span
            key={type.name}
            className={`text-xs font-bold px-2 py-1 rounded-full shadow-sm border border-white ${
              TYPE_COLORS[type.name] ?? TYPE_COLORS.default
            }`}
          >
            {type.name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-4 sm:gap-6 mt-2">
        <div className="text-center">
          <div className="font-bold text-blue-600 text-sm sm:text-base">
            {details.stats[0].base_stat}
          </div>
          <div className="text-xs text-gray-500">HP</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-yellow-600 text-sm sm:text-base">
            {details.stats[1].base_stat}
          </div>
          <div className="text-xs text-gray-500">Attack</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-gray-700 text-sm sm:text-base">
            {details.stats[2].base_stat}
          </div>
          <div className="text-xs text-gray-500">Defense</div>
        </div>
      </div>
    </div>
  );
}