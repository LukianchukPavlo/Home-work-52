import { useState } from "react";
import type { IBoard } from "../../interfaces/board";

interface EditBoardModalProps {
  board: IBoard;
  onClose: () => void;
  onSave: (id: string, name: string, description: string) => void;
}

export const EditBoardModal = ({ board, onClose, onSave }: EditBoardModalProps) => {
  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description);

  const handleSave = () => {
    onSave(board.id, name, description);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-all duration-300 ease-out
                   opacity-100 scale-100 animate-fadeIn"
      >
        <h3 className="text-lg font-bold mb-4">Edit Board</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Board name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Board description"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
