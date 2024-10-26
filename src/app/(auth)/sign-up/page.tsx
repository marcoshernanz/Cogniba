"use client";

import { z } from "zod";

import Link from "next/link";
import FormAlert from "@/components/FormAlert";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaGoogle } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/zod/schemas/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Separator } from "@/components/ui/separator";
import createClient from "@/lib/supabase/client";

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof SignUpSchema>) {
    setError(null);

    startTransition(async () => {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
      }
    });
  }

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex min-h-screen items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-sm border-transparent px-2 shadow-none xs:border-border xs:shadow-sm">
          <CardHeader className="pb-9">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Create a new account</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <Button
              onClick={handleSignInWithGoogle}
              type="button"
              variant="outline"
              className="flex w-full items-center justify-center gap-2 bg-background font-semibold text-foreground hover:bg-muted hover:text-black"
            >
              <FaGoogle className="" />
              Continue with Google
            </Button>

            <div className="flex w-full items-center pt-2">
              <Separator className="w-full shrink" />
              <span className="px-2 text-sm">or</span>
              <Separator className="w-full shrink" />
            </div>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Marcos Hernanz"
                        autoComplete="off"
                        required
                        className="bg-transparent"
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
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="marcos@example.com"
                        autoComplete="email"
                        required
                        className="bg-transparent"
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
                        {...field}
                        disabled={isPending}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6">
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign Up
            </Button>

            {error && <FormAlert variant="destructive" message={error} />}

            <div className="mt-2.5 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
