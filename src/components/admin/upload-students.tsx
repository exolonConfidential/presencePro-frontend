import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { CardWrapper } from "../card-wrapper";


const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rollNo: z.string().min(1, "Roll No is required"),
  year: z.enum(["One", "Two", "Three", "Four"]),
  branch: z.enum(["computer", "electronics", "information", "chemical","biotech"]),
  password: z.string().min(6,"Atleast 6 characters required").optional(),
  fingerprintId: z.string()
});

const UploadStudent = () => {
  const [loading, setLoading] = useState(false);
  const [success,setSuccess] = useState<string | null>();
  const [error,setError] = useState<string | null>();
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      rollNo: "",
      year: "Four",
      branch: "electronics",
      password: "",
    },
  });
  const token = localStorage.getItem("token");

  const onSubmit = async (values: z.infer<typeof studentSchema>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const res = await axios.post("https://presence-pro-backend.onrender.com/student/addStudents", values, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setSuccess(res.data.msg)
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.msg ||
          "Internal server down. Please try again.";
        form.reset()
        setError(message);
      } else if (error instanceof Error) {
        form.reset()
        setError(error.message || "Something went wrong.");
      } else {
        form.reset()
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (

      <CardWrapper heading="Students" subheading="Upload Students" backButtonHref="/admin" backButtonLabel="Click here">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Student name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rollNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 22ECE0031" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="One">One</SelectItem>
                      <SelectItem value="Two">Two</SelectItem>
                      <SelectItem value="Three">Three</SelectItem>
                      <SelectItem value="Four">Four</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Branch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="computer">Computer</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="information">Information</SelectItem>
                      <SelectItem value="chemical">Chemical</SelectItem>
                      <SelectItem value="biotech">Biotech</SelectItem>
                     
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div> 
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fingerprintId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fingerprint Id</FormLabel>
                <FormControl>
                  <Input placeholder="2...999"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Uploading..." : "Upload Student"}
          </Button>
          {success? (<p className="text-sm text-green-400">{success}</p>): (<p className="text-sm text-destructive">{error}</p>) }
        </form>
      </Form>
      </CardWrapper>

  );
};

export default UploadStudent;
