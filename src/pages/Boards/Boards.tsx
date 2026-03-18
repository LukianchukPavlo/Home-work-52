import {useGetBoardsQuery, useDeleteBoardMutation, useUpdateBoardMutation,
} from "../../app/store/api/boards";
import { BoardCard } from "../../components/BoardCard/BoardCard";
import { EditBoardModal } from "../../components/BoardModal/EditBoardModal";
import { DeleteBoardModal } from "../../components/BoardModal/DeleteBoardModal";
import type { IBoard } from "../../interfaces";
import { toast } from "react-toastify";
import { useState } from "react";

export const Boards = () => {
  const { data, isLoading, error } = useGetBoardsQuery();

  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();

  const [editingBoard, setEditingBoard] = useState<IBoard | null>(null);
  const [deletingBoard, setDeletingBoard] = useState<IBoard | null>(null);

  const [activeBoardId, setActiveBoardId] = useState<string | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading the boards</p>;

  const boards = (data?.data ?? []) as IBoard[];

  
  const handleDelete = async () => {
    if (!deletingBoard) return;

    try {
      setActiveBoardId(deletingBoard.id);

      await deleteBoard(deletingBoard.id).unwrap();

      toast.success("Board deleted successfully!");
      setDeletingBoard(null);
    } catch {
      toast.error("Failed to delete board");
    } finally {
      setActiveBoardId(null);
    }
  };

  
  const handleEdit = async (
    id: string,
    name: string,
    description: string
  ) => {
    try {
      setActiveBoardId(id);

      await updateBoard({ id, name, description }).unwrap();

      toast.success("Board updated successfully!");
      setEditingBoard(null);
    } catch {
      toast.error("Failed to update board");
    } finally {
      setActiveBoardId(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {boards.map((board) => {
          const isActive = activeBoardId === board.id;

          return (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={() => setDeletingBoard(board)}
              onEdit={() => setEditingBoard(board)}
              isDeleting={isActive} 
            />
          );
        })}
      </div>

      
      {editingBoard && (
        <EditBoardModal
          board={editingBoard}
          onClose={() => setEditingBoard(null)}
          onSave={handleEdit}
        />
      )}

      
      {deletingBoard && (
        <DeleteBoardModal
          boardName={deletingBoard.name}
          onClose={() => setDeletingBoard(null)}
          onConfirm={handleDelete} // 👈 без id
          isDeleting={activeBoardId === deletingBoard.id}
        />
      )}
    </>
  );
};