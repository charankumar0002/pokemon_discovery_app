import React from 'react';
import { usePokemonQuery } from '../hooks/usePokemonQuery';
import PokemonCard from '../components/PokemonCard';
import InfiniteScrollTrigger from '../components/InfiniteScrollTrigger';

export default function Discovery() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonQuery();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {data?.pages.map((page) =>
        page.results.map((poke) => (
          <PokemonCard key={poke.name} name={poke.name} url={poke.url} />
        ))
      )}
      {hasNextPage && (
        <InfiniteScrollTrigger onVisible={fetchNextPage} />
      )}
      {isFetchingNextPage && <div className="col-span-full text-center">Loading more...</div>}
    </div>
  );
}
