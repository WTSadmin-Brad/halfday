import { LoginForm } from "@/components/auth/forms/login-form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Halfday",
  description: "Login to your Halfday account",
};

export default function LoginPage() {
  return (
    <AuroraBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>
    </AuroraBackground>
  );
}
