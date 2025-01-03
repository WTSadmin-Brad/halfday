import { RegisterForm } from "@/components/auth/forms/register-form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Halfday",
  description: "Create your Halfday account",
};

export default function RegisterPage() {
  return (
    <AuroraBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </AuroraBackground>
  );
}
