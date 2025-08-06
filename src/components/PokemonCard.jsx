import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { TYPE_COLORS } from "../utils/typeColors";

export default function PokemonCard({
  name,
  url,
  inCollection,
  onAdd,
  onRemove,
  mode, // "discovery" or "collection"
  details: propDetails
}) {
  const [details, setDetails] = useState(propDetails || null);

  useEffect(() => {
    if (!propDetails && url) {
      fetch(url)
        .then((res) => res.json())
        .then(setDetails);
    }
  }, [propDetails, url]);

  if (!details)
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg flex items-center justify-center min-h-[260px]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center min-w-[220px]">
      <div className="absolute top-4 right-4 flex gap-2">
        {mode === "discovery" && !inCollection && (
          <button
            aria-label="Add"
            onClick={() => onAdd && onAdd(details)}
            className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 shadow transition"
            title="Add to Collection"
          >
            <FaPlus size={18} />
          </button>
        )}
        {inCollection && (
          <button
            aria-label="Remove"
            onClick={() => onRemove && onRemove(details.name)}
            className="bg-red-500 hover:bg-red-700 text-white rounded-full p-2 shadow transition"
            title="Remove from Collection"
          >
            <FaTimes size={18} />
          </button>
        )}
      </div>
      {/* Image, name, types, stats */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-200 to-pink-500 flex items-center justify-center shadow-lg mb-3">
        <img
          src={details.sprites.front_default}
          alt={details.name}
          className="w-16 h-16 object-contain"
        />
      </div>
      <h3 className="text-lg font-bold text-center capitalize">{details.name}</h3>
      <div className="flex gap-2 mt-2 mb-3">
        {details.types.map(({ type }) => (
          <span
            key={type.name}
            className={`text-xs font-bold px-2 py-1 rounded-full shadow-sm border border-white ${TYPE_COLORS[type.name] ?? TYPE_COLORS.default}`}
          >
            {type.name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="text-center">
          <div className="font-bold text-blue-600">{details.stats[0].base_stat}</div>
          <div className="text-xs text-gray-500">HP</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-yellow-600">{details.stats[1].base_stat}</div>
          <div className="text-xs text-gray-500">Attack</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-gray-700">{details.stats[2].base_stat}</div>
          <div className="text-xs text-gray-500">Defense</div>
        </div>
      </div>
    </div>
  );
}
