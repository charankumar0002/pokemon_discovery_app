import { useState, useEffect } from "react";
import { usePokemonQuery } from "../hooks/usePokemonQuery";
import PokemonCard from "../components/PokemonCard";
import InfiniteScrollTrigger from "../components/InfiniteScrollTrigger";
import { updateCollection } from "../utils/updateCollection";
import { Pokemon } from '../types/pokemon';

interface CollectionItem {
  name: string;
  details: Pokemon;
}

function getInitialCollection(): CollectionItem[] {
  try {
    return JSON.parse(localStorage.getItem("collection") || "[]");
  } catch {
    return [];
  }
}

export default function Discovery() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonQuery();
  const [collection, setCollection] = useState<CollectionItem[]>(getInitialCollection);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  // Add Pokémon
  function handleAdd(details: Pokemon) {
    const exists = collection.find((p) => p.name === details.name);
    if (!exists) {
      const updated = [
        ...collection,
        {
          name: details.name,
          details: {
            ...details,
            sprites: { front_default: details.sprites.front_default },
            types: details.types,
            stats: [details.stats[0], details.stats[1], details.stats[2]],
          },
        },
      ];
      setCollection(updated);
      updateCollection(updated.map(item => item.details));
    }
  }

  // Remove Pokémon
  function handleRemove(name: string) {
    const updated = collection.filter((p) => p.name !== name);
    setCollection(updated);
    updateCollection(updated.map(item => item.details));
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {data?.pages.map((page, pageIndex) =>
        page.results.map((poke) => (
          <PokemonCard
            key={`${pageIndex}-${poke.name}`}
            name={poke.name}
            url={poke.url}
            inCollection={!!collection.find((p) => p.name === poke.name)}
            onAdd={handleAdd}
            onRemove={handleRemove}
            mode="discovery"
          />
        ))
      )}
      {hasNextPage && <InfiniteScrollTrigger onVisible={fetchNextPage} />}
      {isFetchingNextPage && (
        <div className="col-span-full text-center text-white mt-4 text-sm sm:text-base flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          Loading more Pokemon...
        </div>
      )}
    </div>
  );
}