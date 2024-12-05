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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <NeumorphicCard className="p-6">
        <CardContent className="space-y-6">
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
              className="w-full bg-[#edf0f4] text-gray-700 font-medium text-base shadow-[4px_4px_8px_rgba(174,174,192,0.2),-4px_-4px_8px_rgba(255,255,255,0.6)] hover:shadow-[2px_2px_4px_rgba(174,174,192,0.2),-2px_-2px_4px_rgba(255,255,255,0.6)] active:shadow-[inset_2px_2px_4px_rgba(174,174,192,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.6)] transition-shadow duration-300"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </NeumorphicButton>
            <div className="text-center space-y-2">
              <button 
                type="button"
                className="text-sm font-normal text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot your password?
              </button>
              <p className="text-sm font-normal text-gray-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </NeumorphicCard>
    </form>
  );
}
