import { ForgotPasswordForm } from "@/components/auth/forms/forgot-password-form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Halfday",
  description: "Reset your Halfday account password",
};

export default function ForgotPasswordPage() {
  return (
    <AuroraBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ForgotPasswordForm />
      </div>
    </AuroraBackground>
  );
}
