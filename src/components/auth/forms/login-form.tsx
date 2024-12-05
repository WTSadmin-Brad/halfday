"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginFormSchema, type LoginFormData } from "@/lib/utils/validation";
import { signInWithEmail } from "@/lib/firebase/auth";
import { 
  NeumorphicCard, 
  CardHeader, 
  CardContent,
  CardFooter 
} from "@/components/auth/elements/neumorphic-card";
import { NeumorphicInput } from "@/components/auth/elements/neumorphic-input";
import { NeumorphicButton } from "@/components/auth/elements/neumorphic-button";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await signInWithEmail(data.email, data.password);
      toast.success("Successfully logged in!");
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to log in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
      <NeumorphicCard>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
          <p className="text-sm text-muted-foreground text-center">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <NeumorphicInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <NeumorphicInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={form.formState.errors.password?.message}
            {...form.register("password")}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <NeumorphicButton
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Sign In
          </NeumorphicButton>
          <div className="text-sm text-center space-y-2">
            <button
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="text-primary hover:underline"
            >
              Forgot password?
            </button>
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/register")}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </CardFooter>
      </NeumorphicCard>
    </form>
  );
}
