'use client'

import * as React from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { GlassContainer } from "../../ui/glass/container";
import { GlassInput } from "../../ui/glass/input";
import { GlassButton } from "../../ui/glass/button";
import { AnimateIn } from "../../_backup/AnimateIn";
import { signInWithEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface LoginFormProps {
  isLoading?: boolean;
}

export function LoginForm({ isLoading: initialLoading = false }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(initialLoading);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmail(email, password);
      router.push("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimateIn>
      <div className="w-full max-w-md mx-auto px-4">
        <GlassContainer variant="solid" className="backdrop-blur-2xl" size="lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center items-center py-4">
              <div className="relative group">
                <Image
                  src="/logo/logo-pink.svg"
                  alt="Halfday Logo"
                  width={180}
                  height={48}
                  className="relative
                    [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.3))_drop-shadow(0_-1px_1px_rgba(255,255,255,0.4))]
                    transition-all duration-500"
                  priority
                />
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              <GlassInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="minimal"
                withGradient
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <GlassInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="minimal"
                withGradient
                icon={<Lock className="w-5 h-5" />}
                required
              />
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <GlassButton
                type="submit"
                variant="gradient"
                withGlow
                className="w-full"
                disabled={isLoading}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Sign In
              </GlassButton>

              <div className="text-center">
                <GlassButton variant="link" type="button">
                  Forgot your password?
                </GlassButton>
              </div>
            </div>
          </form>
        </GlassContainer>
      </div>
    </AnimateIn>
  );
}
