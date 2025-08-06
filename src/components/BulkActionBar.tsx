interface BulkActionBarProps {
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onRemove: () => void;
  onDone: () => void;
}

export default function BulkActionBar({
  selectedCount,
  allSelected,
  onSelectAll,
  onRemove,
  onDone,
}: BulkActionBarProps) {
  return (
    <div className="fixed left-0 right-0 bottom-0 px-2 sm:px-4 z-50">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between bg-white bg-opacity-95 shadow-2xl rounded-2xl p-3 sm:p-4 border border-indigo-200 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="w-4 h-4 sm:w-5 sm:h-5 accent-indigo-600 rounded border border-gray-400"
            title="Select all"
          />
          <span className="text-indigo-700 font-semibold text-sm sm:text-base">
            {selectedCount} Selected
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold shadow transition text-sm sm:text-base flex-1 sm:flex-none"
            disabled={selectedCount === 0}
            onClick={onRemove}
          >
            Remove
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-semibold transition text-sm sm:text-base flex-1 sm:flex-none"
            onClick={onDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}