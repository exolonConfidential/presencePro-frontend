import { z } from "zod";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "../card-wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Form schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password length should be atleat 6 characters",
  }),
});

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/signin",
        values
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/admin", { replace: true });
    } catch (error: any) {
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
    }
  };

  return (
    <CardWrapper
      heading="Admin"
      subheading="Login with you email and password"
      backButtonLabel="click here"
      backButtonHref="/"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      disabled={isSubmitting}
                      className="hover:border-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      type="password"
                      disabled={isSubmitting}
                      className="hover:border-blue-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button
              type="submit"
              variant="secondary"
              className="cursor-pointer w-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loging..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
