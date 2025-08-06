// src/utils/updateCollection.js
export function updateCollection(newCollection) {
  localStorage.setItem("collection", JSON.stringify(newCollection));
  window.dispatchEvent(new Event("collectionUpdated"));
}
