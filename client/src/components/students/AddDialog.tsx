import { Button } from "@/components/ui/button"
import {
  Dialog,  
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddForm from "./AddForm"
import { Plus } from "lucide-react"

export function AddDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus /> Add Student
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-center">Add Student</DialogTitle>
           
          </DialogHeader>
          <div className="gap-4">
            <AddForm />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
