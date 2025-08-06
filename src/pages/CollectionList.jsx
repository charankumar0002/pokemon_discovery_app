import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useLocalStorage } from "../hooks/useLocalStorage";
import PokemonCard from "../components/PokemonCard";

// SortableItem: no pre-filled name to onRemove, just pass handler
function SortableItem({ poke, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: poke.name });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-6 cursor-grab"
    >
      <PokemonCard
        details={poke.details}
        inCollection={true}
        onRemove={onRemove}
        mode="collection"
      />
    </div>
  );
}

export default function MyCollection() {
  const [collection, setCollection] = useLocalStorage("collection", []);

  // Only remove if exists!
  const handleRemove = React.useCallback(
    (name) => {
      setCollection((prev) =>
        prev.some((poke) => poke.name === name)
          ? prev.filter((poke) => poke.name !== name)
          : prev
      );
    },
    [setCollection]
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = collection.findIndex((item) => item.name === active.id);
      const newIndex = collection.findIndex((item) => item.name === over.id);
      const newCollection = arrayMove(collection, oldIndex, newIndex);
      setCollection(newCollection);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-400 py-10 px-2">
      <h2 className="text-center text-2xl font-bold mb-6 text-white">
        My Collection
      </h2>
      {collection.length === 0 ? (
        <div className="text-center text-white mt-20 text-lg">
          No Pokémon in your collection yet!
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={collection.map((poke) => poke.name)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {collection.map((poke) => (
                <SortableItem
                  key={poke.name}
                  poke={poke}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
