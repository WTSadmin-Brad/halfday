import { RegisterForm } from "@/components/_backup/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Halfday",
  description: "Create your Halfday account",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
