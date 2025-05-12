import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "../card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const subjectSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  teacher: z.string().min(1, "Teacher's name is required"),
  year: z.enum(["One", "Two", "Three", "Four"]),
});

export const UploadSubjects = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const token = localStorage.getItem("token");

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      code: "",
      name: "",
      teacher: "",
      year: "Four",
    },
  });

  const viewRedirect = () => {
    navigate("/admin/subjects");
  };

  const handleSubmit = async (values: z.infer<typeof subjectSchema>) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const requestConfig = {
        url: "https://presence-pro-backend.onrender.com/admin/addSub",
        method: "post",
        data: values,
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.request(requestConfig);
      setSuccess(res.data.msg);
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.msg ||
          "Internal server down. Please try again.";
        form.reset();
        setError(message);
      } else if (error instanceof Error) {
        form.reset();
        setError(error.message || "Something went wrong.");
      } else {
        form.reset();
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardWrapper
      heading="Subjects"
      subheading="Upload subjects"
      backButtonHref="/admin"
      backButtonLabel="Click here"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="subject name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="KECXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="teacher's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full grid grid-cols-2 gap-2">
            <Button type="submit" disabled={loading} className="cursor-pointer">
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <Button onClick={viewRedirect} className="cursor-pointer">
              View
            </Button>
          </div>
          {success ? (
            <p className="text-sm text-green-400">{success}</p>
          ) : (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};
