import { LoginForm } from "@/components/auth/forms/login-form";
import { Logo } from "@/components/ui/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Halfday",
  description: "Login to your Halfday account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#edf0f4]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <Logo variant="full" size={48} className="mx-auto" />
          <h1 className="text-[28px] font-medium tracking-tight text-gray-800">
            Welcome back
          </h1>
          <p className="text-base font-normal text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
