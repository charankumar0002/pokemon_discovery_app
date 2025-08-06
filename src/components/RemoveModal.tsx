

interface RemoveModalProps {
  open: boolean;
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RemoveModal({ open, count, onConfirm, onCancel }: RemoveModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 shadow-2xl w-[320px] text-center">
        <div className="text-2xl font-bold mb-2 text-red-600">
          Remove Pokémon?
        </div>
        <div className="mb-6 text-gray-700">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{count} Pokémon</span> from your
          collection?
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold shadow"
            onClick={onConfirm}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}