import { useInfiniteQuery } from "@tanstack/react-query";

export function usePokemonQuery() {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=6`
      );
      const data = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next
        ? new URL(lastPage.next).searchParams.get("offset")
        : undefined;
    },
  });
}
