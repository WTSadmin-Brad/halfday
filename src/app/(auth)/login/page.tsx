import { LoginForm } from "@/components/auth/forms/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Halfday",
  description: "Login to your Halfday account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-anti-flash-white">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
