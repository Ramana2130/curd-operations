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
import { Button } from "@/components/ui/button";
import { deleteStudentById } from "@/services/studentService";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteDialogProps{
  StudentId: number;
}

export function DeleteDialog({StudentId} : DeleteDialogProps) {
  const handleDelete = async () => {
    try {
      await deleteStudentById(StudentId);
      toast.success("Student Deleted Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      toast.error("Student delete failed. Try Again");
      console.log("Error in student deletebyId :" , error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-600 border-none w-full flex justify-start font-normal"
        >
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 text-white" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
