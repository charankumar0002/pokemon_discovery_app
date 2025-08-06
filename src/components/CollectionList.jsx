import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, image }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-white rounded shadow mb-2">
      <img src={image} alt={id} className="w-20 h-20 mx-auto" />
      <h3 className="text-center capitalize mt-2">{id}</h3>
    </div>
  );
}

export default function MyCollection() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('collection') || '[]');
    setCollection(data);
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = collection.findIndex((item) => item.name === active.id);
      const newIndex = collection.findIndex((item) => item.name === over.id);
      const newCollection = arrayMove(collection, oldIndex, newIndex);
      setCollection(newCollection);
      localStorage.setItem('collection', JSON.stringify(newCollection));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={collection.map((c) => c.name)} strategy={verticalListSortingStrategy}>
        {collection.map((poke) => (
          <SortableItem key={poke.name} id={poke.name} image={poke.image} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
