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
import { addStudent } from "@/services/studentservice";

const formSchema = z.object({
  name: z.string().min(1),
  register_number: z.string().min(1),
  email: z.string(),
  department: z.string(),
});

export default function AddForm() {
const departments = [
  { label: "Information Technology", value: "it" },
  { label: "Computer Science and Engineering", value: "cse" },
  { label: "Electronics and Communication Engineering", value: "ece" },
  { label: "Electrical and Electronics Engineering", value: "eee" },
  { label: "Mechanical Engineering", value: "mech" },
  { label: "Civil Engineering", value: "civil" },
  { label: "Automobile Engineering", value: "auto" },
  { label: "Biomedical Engineering", value: "bme" },
  { label: "Chemical Engineering", value: "chem" },
  { label: "Agricultural Engineering", value: "agri" },
  { label: "Mechatronics Engineering", value: "mechatronics" },
] as const;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const newStudent = await addStudent(values);
      setTimeout(() => {
        window.location.reload(); // refresh the page
      }, 1500);
      toast.success(`Student added: ${newStudent.name}`);
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
          name="register_number"
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
        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-600">
          Submit
        </Button>
      </form>
    </Form>
  );
}
