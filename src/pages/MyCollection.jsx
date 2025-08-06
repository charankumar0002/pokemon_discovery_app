import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
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

export default function MyCollection() {
  const [collection, setCollection] = useLocalStorage("collection", []);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // DnD reorder handler (normal mode only)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = collection.findIndex((item) => item.name === active.id);
      const newIndex = collection.findIndex((item) => item.name === over.id);
      const newCollection = arrayMove(collection, oldIndex, newIndex);
      setCollection(newCollection);
    }
  };

  // Bulk select logic
  const handleSelectChange = (name, checked) => {
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
    setCollection((prev) =>
      prev.filter((poke) => !selected.includes(poke.name))
    );
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-400 py-10 px-2">
      <h2 className="text-center text-3xl font-bold mb-7 text-white drop-shadow-lg tracking-wide">
        My Collection
      </h2>
      <CollectionSummary collection={collection} />
      {collection.length > 0 && (
        <div className="flex items-center justify-end mb-7 px-2">
          {!bulkEditMode ? (
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition"
              onClick={() => setBulkEditMode(true)}
            >
              Bulk Edit
            </button>
          ) : null}
        </div>
      )}

      {collection.length === 0 ? (
        <div className="text-center text-white mt-20 text-lg font-medium">
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
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {collection.map((poke) => (
                <SortableItem key={poke.name} poke={poke} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-28">
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
