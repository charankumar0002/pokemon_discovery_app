import { Pokemon } from '../types/pokemon';

export function updateCollection(newCollection: Pokemon[]): void {
  localStorage.setItem("collection", JSON.stringify(newCollection));
  window.dispatchEvent(new Event("collectionUpdated"));
}