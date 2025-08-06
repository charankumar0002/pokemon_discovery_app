import React from "react";

export default function CollectionSummary({ collection }) {
  const typeCounts = {};
  collection.forEach((poke) => {
    poke.details.types.forEach((t) => {
      const type = t.type.name;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });
  return (
    <div className="mb-10 text-center text-white">
      <span className="font-extrabold text-2xl tracking-wide">
        {collection.length} Pokémon
      </span>
      {Object.keys(typeCounts).length > 0 && (
        <span className="ml-3 text-sm font-semibold">
          {Object.entries(typeCounts).map(([type, count]) => (
            <span
              key={type}
              className={`inline-block mr-2 px-2.5 py-1 rounded-full shadow bg-opacity-40 border border-white uppercase font-bold`}
              style={{
                background: `linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)`,
                color: "#3841a1",
                borderColor: "#fff",
              }}
            >
              {type}: {count}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}
