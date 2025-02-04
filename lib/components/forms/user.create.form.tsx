"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/ui/select";
import { redirect } from "next/navigation";
import { createOneUser } from "@/lib/action";
import { ArrowRightIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useFormState } from "react-dom";
import { useEffect } from "react";

// Schema de validação com Zod
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must have at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(7, { message: "Password must have at least 7 characters" }),
  role: z.enum(["admin", "user"], { message: "Role is required" }),
});

export function UserCreateForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const [state, formAction, isPending] = useFormState(
    createOneUser,
    undefined
  );

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("role", data.role);

        formAction(formData);
    }

  useEffect(() => {
    if(state?.success) redirect(state.redirect_to!)
  }, [state])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Nome */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>Enter your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormDescription>Enter your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormDescription>Choose a secure password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Função (Role) */}
        <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select>
                <FormDescription>Select the user role.</FormDescription>
                <FormMessage />
                <input type="hidden" name="role" value={field.value} />
                </FormItem>
            )}
        />


        {/* Botão de Cadastro */}
        <Button className="mt-4 w-fit" aria-disabled={isPending}>
          {isPending ? "Signing up..." : "Sign Up"}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Mensagem de Erro */}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.error}</p>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
