"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerAction } from "zsa-react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/loader-button";
import { SignInSchema } from "@/schemas";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AlertSuccess } from "@/components/alert-success";
import { AlertError } from "@/components/alert-error";
import { signInAction } from "@/auth/sign-in/actions";

export function SignInForm() {
  const { execute, isPending, data, error } = useServerAction(signInAction, {
    onSuccess({ data }) {
      console.log(data);
    },
    onError({ err }) {
      console.log(err);
    },
  });

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    execute(values);
  }

  return (
    <CardWrapper
      title="Sign In"
      description="Sign in to your account"
      footerLinkLabel="Don't have an account?"
      footerLinkHref="/sign-up"
      showOAuthButtons={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <Link
                    href="/auth/reset"
                    className={cn(
                      buttonVariants({ variant: "link", size: "sm" }),
                      "justify-start p-0",
                    )}
                  >
                    Forgot password?
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Status */}
          <AlertError message={error?.message} />
          <AlertSuccess message={data?.message} />

          {/* Submit Button */}
          <LoaderButton type="submit" className="w-full" isPending={isPending}>
            Sign In
          </LoaderButton>
        </form>
      </Form>
    </CardWrapper>
  );
}
