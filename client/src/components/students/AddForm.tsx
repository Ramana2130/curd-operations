import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { addStudent } from "../../services/studentService";
import { DialogClose } from "../ui/dialog";

const formSchema = z.object({
  name: z.string().min(1),
  registerNumber: z.string().min(1),
  email: z.string(),
  department: z.string(),
});

export default function AddForm() {
const departments = [
  { label: "Information Technology", value: "Information Technology" },
  { label: "Computer Science and Engineering", value: "Computer Science and Engineering" },
  { label: "Electronics and Communication Engineering", value: "Electronics and Communication Engineering" },
  { label: "Electrical and Electronics Engineering", value: "Electrical and Electronics Engineering" },
  { label: "Mechanical Engineering", value: "Mechanical Engineering" },
  { label: "Civil Engineering", value: "Civil Engineering" },
  { label: "Automobile Engineering", value: "Automobile Engineering" },
  { label: "Biomedical Engineering", value: "Biomedical Engineering" },
  { label: "Chemical Engineering", value: "Chemical Engineering" },
  { label: "Agricultural Engineering", value: "Agricultural Engineering" },
  { label: "Mechatronics Engineering", value: "Mechatronics Engineering" },
] as const;


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newStudent = await addStudent(values);
      setTimeout(() => {
        window.location.reload(); // refresh the page
      }, 1500);
      toast.success(`Student added: ${newStudent.name} successfully!`);
      form.reset();
    } catch (error: any) {
      if(error.response?.data?.error){
        toast.error(error.response.data.error);
    }else{
      toast.error("Failed to add student. Please try again.");
    }
  }
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-6xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter student name"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Register Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the register number"
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter the email" type="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Department</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        " justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? departments.find(
                            (department) => department.value === field.value
                          )?.label
                        : "Select department"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No department found.</CommandEmpty>
                      <CommandGroup>
                        {departments.map((department) => (
                          <CommandItem
                            value={department.label}
                            key={department.value}
                            onSelect={() => {
                              form.setValue("department", department.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                department.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {department.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
         <DialogClose type="submit" className="w-full bg-blue-700 hover:bg-blue-600 rounded p-2 text-white font-semibold">
            Submit
          </DialogClose>
      </form>
    </Form>
  );
}
