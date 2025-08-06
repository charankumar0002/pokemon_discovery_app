import { useState, useCallback } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SortableItem from "../components/SortableItem";
import SelectableItem from "../components/SelectableItem";
import CollectionSummary from "../components/CollectionSummary";
import BulkActionBar from "../components/BulkActionBar";
import RemoveModal from "../components/RemoveModal";
import { updateCollection } from "../utils/updateCollection";
import { Pokemon } from '../types/pokemon';

interface CollectionItem {
  name: string;
  details?: Pokemon;
}

export default function MyCollection() {
  const [collection, setCollection] = useLocalStorage<CollectionItem[]>("collection", []);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  // DnD reorder handler (normal mode only)
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = collection.findIndex((item) => item.name === active.id);
      const newIndex = collection.findIndex((item) => item.name === over.id);
      const newCollection = arrayMove(collection, oldIndex, newIndex);
      setCollection(newCollection);
    }
  }, [collection, setCollection]);

  // Bulk select logic
  const handleSelectChange = (name: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, name] : prev.filter((n) => n !== name)
    );
  };
  const toggleSelectAll = () => {
    if (selected.length === collection.length) setSelected([]);
    else setSelected(collection.map((p) => p.name));
  };

  // Remove modal workflow
  const handleRemoveSelected = () => setShowModal(true);
  const handleModalConfirm = () => {
    const updatedCollection = collection.filter((poke) => !selected.includes(poke.name));
    setCollection(updatedCollection);
    updateCollection(updatedCollection.map(item => item.details).filter(Boolean) as Pokemon[]);
    setSelected([]);
    setBulkEditMode(false);
    setShowModal(false);
  };
  const handleModalCancel = () => setShowModal(false);

  const exitBulkEdit = () => {
    setBulkEditMode(false);
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-400 px-3 sm:px-4 relative">
      {collection.length > 0 && !bulkEditMode && (
        <button
          className="absolute top-4 right-1 md:right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition text-sm z-10"
          onClick={() => setBulkEditMode(true)}
        >
          Edit
        </button>
      )}
      <div className="pt-4 pb-2">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-2">
          My Collection
        </h2>
        <div className="max-w-5xl mx-auto">
          <CollectionSummary collection={collection} />
        </div>
      </div>

      {collection.length === 0 ? (
        <div className="text-center text-white mt-8 text-base sm:text-lg font-medium">
          No Pokémon in your collection yet!
        </div>
      ) : !bulkEditMode ? (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={collection.map((poke) => poke.name)}
            strategy={verticalListSortingStrategy}
          >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {collection.map((poke) => (
            <SortableItem key={poke.name} poke={poke} />
          ))}
        </div>
          </SortableContext>
        </DndContext>
      ) : (
      <>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-20 sm:pb-28">
          {collection.map((poke) => (
            <SelectableItem
              key={poke.name}
              poke={poke}
              selected={selected.includes(poke.name)}
              onSelectChange={handleSelectChange}
            />
          ))}
        </div>
        <BulkActionBar
          selectedCount={selected.length}
          allSelected={selected.length === collection.length}
          onSelectAll={toggleSelectAll}
          onRemove={handleRemoveSelected}
          onDone={exitBulkEdit}
        />
      </>
      )}

      <RemoveModal
        open={showModal}
        count={selected.length}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
}