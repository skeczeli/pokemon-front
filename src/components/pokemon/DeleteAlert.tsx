import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type DeleteAlertProps = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
  deleteLoading: boolean;
  pokemon: { name: string };
};

const DeleteAlert = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDelete,
  deleteLoading,
  pokemon,
}: DeleteAlertProps) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-red-500 hover:bg-red-600"
          variant="destructive"
          disabled={deleteLoading}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-xl max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700">
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold capitalize text-gray-900">
              {pokemon.name}
            </span>{" "}
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
