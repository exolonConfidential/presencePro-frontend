import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

import { CardWrapper } from "../card-wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  year: z.enum(["One", "Two", "Three", "Four"]),
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
  subjectCode: z.string().min(1, "Subject code is required"),
  startTime: z.string(),
  endTime: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function TimetableForm() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: "Four",
      day: "Monday",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const requestConfig = {
        url: "http://localhost:3000/admin/addTimetable",
        method: "post",
        data: data,
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
      heading="Timetable"
      subheading="Upload Timetable"
      backButtonHref="/admin"
      backButtonLabel="Click here"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="One">First Year</SelectItem>
                      <SelectItem value="Two">Second Year</SelectItem>
                      <SelectItem value="Three">Third Year</SelectItem>
                      <SelectItem value="Four">Fourth Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subjectCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter subject code"
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full grid grid-cols-2 gap-2">
            <Button type="submit" disabled={loading} className="cursor-pointer">
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <Button
              onClick={() => navigate("/timetable")}
              className="cursor-pointer"
            >
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
}
