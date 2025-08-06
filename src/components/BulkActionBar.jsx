import React from "react";

export default function BulkActionBar({
  selectedCount,
  allSelected,
  onSelectAll,
  onRemove,
  onDone,
}) {
  return (
    <div className="fixed left-0 right-0 bottom-0 sm:static sm:mb-6 px-4 z-50">
      <div className="max-w-3xl mx-auto flex items-center justify-between bg-white bg-opacity-95 shadow-2xl rounded-2xl p-3 sm:p-4 border border-indigo-200">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="w-5 h-5 accent-indigo-600 rounded border border-gray-400"
            title="Select all"
          />
          <span className="text-indigo-700 font-semibold">
            {selectedCount} Selected
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            disabled={selectedCount === 0}
            onClick={onRemove}
          >
            Remove Selected
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
            onClick={onDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
