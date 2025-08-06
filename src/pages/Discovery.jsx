import React, { useState, useEffect } from "react";
import { usePokemonQuery } from "../hooks/usePokemonQuery";
import PokemonCard from "../components/PokemonCard";
import InfiniteScrollTrigger from "../components/InfiniteScrollTrigger";
import { CgSpinner } from "react-icons/cg";
import { updateCollection } from "../utils/updateCollection";

function getInitialCollection() {
  try {
    return JSON.parse(localStorage.getItem("collection")) || [];
  } catch {
    return [];
  }
}

export default function Discovery() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonQuery();
  const [collection, setCollection] = useState(getInitialCollection);

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  // Add Pokémon
  function handleAdd(details) {
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
      updateCollection(updated); // This updates localStorage AND notifies App.jsx
    }
  }

  // Remove Pokémon
  function handleRemove(name) {
    const updated = collection.filter((p) => p.name !== name);
    setCollection(updated);
    updateCollection(updated); // This updates localStorage AND notifies App.jsx
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.pages.map((page) =>
        page.results.map((poke) => (
          <PokemonCard
            key={poke.name}
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
        <div className="col-span-full text-center text-white mt-4">
          Loading more Pokemon...
        </div>
      )}
    </div>
  );
}
