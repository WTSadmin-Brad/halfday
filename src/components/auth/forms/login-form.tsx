"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginFormSchema, type LoginFormData } from "@/lib/validation/schemas";
import { signInWithEmail } from "@/lib/firebase/auth";
import { 
  NeumorphicCard, 
  CardHeader, 
  CardContent,
  CardFooter 
} from "@/components/auth/elements/neumorphic-card";
import { NeumorphicInput } from "@/components/auth/elements/neumorphic-input";
import { NeumorphicButton } from "@/components/auth/elements/neumorphic-button";
import { Logo } from "@/components/ui/logo";

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <NeumorphicCard className="p-6">
        <CardContent className="space-y-8">
          <div className="text-center">
            <Logo variant="full" size="2xl" className="mx-auto select-none" />
          </div>
          <div className="space-y-4">
            <NeumorphicInput
              id="email"
              type="email"
              placeholder="name@example.com"
              {...form.register("email")}
              error={form.formState.errors.email?.message}
              className="bg-[#edf0f4] shadow-[inset_2px_2px_5px_rgba(174,174,192,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] border-none transition-shadow duration-300"
            />
            <NeumorphicInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
              error={form.formState.errors.password?.message}
              className="bg-[#edf0f4] shadow-[inset_2px_2px_5px_rgba(174,174,192,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] border-none transition-shadow duration-300"
            />
          </div>
          <div className="space-y-4">
            <NeumorphicButton
              type="submit"
              disabled={isLoading}
              className="group w-full"
            >
              <span className="bg-gradient-to-t from-[#EFF1F3] to-[#FCA311] inline-block text-transparent bg-clip-text text-lg font-bold [text-shadow:_1px_1px_1px_rgba(0,0,0,0.15)]">
                {isLoading ? "Signing in..." : "Sign in"}
              </span>
            </NeumorphicButton>
            <div className="text-center space-y-2">
              <button 
                type="button"
                className="text-sm font-normal text-gunmetal hover:bg-gradient-to-b hover:from-orange hover:to-[#e8950f] hover:bg-clip-text hover:text-transparent transition-colors"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot your password?
              </button>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm text-gunmetal">Don't have an account?</span>
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="font-medium bg-gradient-to-t from-[#EFF1F3] to-[#FCA311] inline-block text-transparent bg-clip-text font-semibold [text-shadow:_1px_1px_1px_rgba(0,0,0,0.15)]"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </NeumorphicCard>
    </form>
  );
}
