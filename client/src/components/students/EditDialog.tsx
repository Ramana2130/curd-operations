import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenBox } from "lucide-react";
import EditForm from "./EditForm";

export function EditDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-none">
            <PenBox /> Edit Student
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Student</DialogTitle>
          </DialogHeader>
          <div className="gap-4">
            <EditForm />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
