"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { registerFormSchema, type RegisterFormData } from "@/lib/utils/validation";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { 
  NeumorphicCard, 
  CardHeader, 
  CardContent,
  CardFooter 
} from "@/components/auth/elements/neumorphic-card";
import { NeumorphicInput } from "@/components/auth/elements/neumorphic-input";
import { NeumorphicButton } from "@/components/auth/elements/neumorphic-button";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    try {
      await signUpWithEmail(data.email, data.password, `${data.firstName} ${data.lastName}`);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <NeumorphicCard>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <h2 className="text-xl font-semibold text-center">Register</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <NeumorphicInput
                disabled={isLoading}
                {...form.register("firstName")}
                label="First Name"
                placeholder="First Name"
                type="text"
                error={form.formState.errors.firstName?.message}
              />
              <NeumorphicInput
                disabled={isLoading}
                {...form.register("lastName")}
                label="Last Name"
                placeholder="Last Name"
                type="text"
                error={form.formState.errors.lastName?.message}
              />
            </div>
            <NeumorphicInput
              disabled={isLoading}
              {...form.register("email")}
              label="Email"
              placeholder="Email"
              type="email"
              error={form.formState.errors.email?.message}
            />
            <NeumorphicInput
              disabled={isLoading}
              {...form.register("password")}
              label="Password"
              placeholder="Password"
              type="password"
              error={form.formState.errors.password?.message}
            />
            <NeumorphicInput
              disabled={isLoading}
              {...form.register("confirmPassword")}
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              error={form.formState.errors.confirmPassword?.message}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <NeumorphicButton
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </NeumorphicButton>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </form>
    </NeumorphicCard>
  );
}
