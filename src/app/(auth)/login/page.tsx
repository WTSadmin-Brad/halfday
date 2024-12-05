import { LoginForm } from "@/components/auth/forms/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Halfday",
  description: "Login to your Halfday account",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
