'use client'

import * as React from "react";
import { Mail, ArrowRight } from "lucide-react";
import { GlassContainer } from "../../ui/glass/container";
import { GlassInput } from "../../ui/glass/input";
import { GlassButton } from "../../ui/glass/button";
import { AnimateIn } from "../../_backup/AnimateIn";
import { sendPasswordResetEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface ForgotPasswordFormProps {
  isLoading?: boolean;
}

export function ForgotPasswordForm({ isLoading: initialLoading = false }: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(initialLoading);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendPasswordResetEmail(email);
      toast.success("Password reset email sent! Check your inbox.");
      router.push("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimateIn>
      <div className="w-full max-w-md mx-auto px-4">
        <GlassContainer variant="solid" hover="none" className="backdrop-blur-2xl" size="lg">
          <form onSubmit={handleSubmit} className="w-full space-y-4 font-outfit">
            {/* Logo at top but loads last */}
            <div className="flex justify-center items-center py-4">
              <div className="relative group">
                <Image
                  src="/logo/logo-pink.svg"
                  alt="Halfday Logo"
                  width={180}
                  height={48}
                  className="animate-logo-fade-in relative
                    [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.5))]
                    transition-all duration-500"
                  priority
                />
              </div>
            </div>

            {/* Description */}
            <div className="animate-fade-up delay-1 text-center">
              <p className="text-white text-base font-medium">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Input Fields */}
            <div className="animate-fade-up delay-2">
              <GlassInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="minimal"
                withGradient
                icon={<Mail className="w-5 h-5" />}
                required
                className="text-lg"
              />
            </div>

            {/* Actions */}
            <div className="animate-fade-up delay-3">
              <GlassButton
                type="submit"
                variant="gradient"
                withGlow
                className="w-full text-lg font-medium"
                disabled={isLoading}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Send Reset Link
              </GlassButton>
            </div>

            <div className="animate-fade-up delay-5 text-center">
              <div className="flex flex-col space-y-2 text-center">
                <Link
                  href="/login"
                  className="text-crystal-lavender transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-crystal-lavender after:transition-all after:duration-300 hover:after:w-full [text-shadow:0_1px_1px_rgba(0,0,0,0.5)]"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </GlassContainer>
      </div>
    </AnimateIn>
  );
}
