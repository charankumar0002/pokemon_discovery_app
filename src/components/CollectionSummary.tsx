import { Pokemon } from '../types/pokemon';

interface CollectionItem {
  details?: Pokemon;
}

interface CollectionSummaryProps {
  collection: CollectionItem[];
}

export default function CollectionSummary({ collection }: CollectionSummaryProps) {
  const typeCounts: Record<string, number> = {};
  collection.forEach((poke) => {
    poke.details?.types?.forEach((t) => {
      const type = t.type.name;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });
  return (
    <div className="mb-6 sm:mb-10 text-center text-white px-2">
      <div className="font-extrabold text-xl sm:text-2xl tracking-wide mb-3">
        {collection.length} Pokémon
      </div>
      {Object.keys(typeCounts).length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-semibold">
          {Object.entries(typeCounts).map(([type, count]) => (
            <span
              key={type}
              className="inline-block px-2 sm:px-2.5 py-1 rounded-full shadow bg-opacity-40 border border-white uppercase font-bold"
              style={{
                background: `linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)`,
                color: "#3841a1",
                borderColor: "#fff",
              }}
            >
              {type}: {count}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}