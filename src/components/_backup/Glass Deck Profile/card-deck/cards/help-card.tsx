import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../glass-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassTextarea } from "@/components/ui/glass/textarea";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/ui/utils";

interface HelpCardProps {
  isActive?: boolean;
  version: string;
  buildNumber: string;
  onStartTutorial: () => void;
  onSubmitFeedback: (feedback: { type: string; description: string }) => void;
}

const HelpCard: React.FC<HelpCardProps> = ({
  isActive = false,
  version,
  buildNumber,
  onStartTutorial,
  onSubmitFeedback,
}) => {
  const [feedbackType, setFeedbackType] = React.useState("");
  const [feedbackDescription, setFeedbackDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackType && feedbackDescription) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await onSubmitFeedback({
          type: feedbackType,
          description: feedbackDescription,
        });
        setFeedbackType("");
        setFeedbackDescription("");
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Failed to submit feedback"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <GlassCard isActive={isActive}>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartTutorial}
            className="flex items-center justify-center gap-3 p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-colors"
          >
            <PlayCircle className="w-5 h-5 text-white/90" />
            <span className="font-outfit text-base font-medium text-white/90">
              Start Tutorial
            </span>
          </motion.button>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Version Information
          </h3>
          <div className="flex flex-col gap-2 p-3 bg-white/[0.03] rounded-lg">
            <span className="font-outfit text-sm text-white/60">
              Version: {version}
            </span>
            <span className="font-outfit text-sm text-white/60">
              Build: {buildNumber}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-outfit text-base font-medium text-white/80 m-0">
            Report an Issue
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger className="w-full bg-white/[0.03] border-white/10">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="improvement">
                  Improvement Suggestion
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <GlassTextarea
              value={feedbackDescription}
              onChange={(e) => setFeedbackDescription(e.target.value)}
              placeholder="Describe the issue or suggestion in detail..."
              className="min-h-[100px] resize-y"
              maxLength={500}
            />

            {submitError && (
              <p className="text-red-400 text-sm mt-1">{submitError}</p>
            )}

            <Button
              type="submit"
              disabled={!feedbackType || !feedbackDescription || isSubmitting}
              className={cn(
                "w-full bg-white/10 hover:bg-white/15 text-white/90",
                "backdrop-blur-sm border border-white/[0.08]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200"
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </div>
      </div>
    </GlassCard>
  );
};

export default HelpCard;
