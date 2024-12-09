'use client'

import * as React from 'react'
import { GlassContainer } from '@/components/ui/glass/container'
import { GlassButton } from '@/components/ui/glass/button'
import { BookOpen, MessageCircle, Mail, ExternalLink, Info } from 'lucide-react'

export function ProfileHelpTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Quick Help */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Quick Help</h3>
              <p className="text-sm text-white/60">Get started with Halfday</p>
            </div>
            <BookOpen className="h-5 w-5 text-white/40" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <GlassButton
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center text-center gap-2"
            >
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="font-medium">View Tutorial</span>
              <span className="text-sm text-white/60">Learn the basics</span>
            </GlassButton>

            <GlassButton
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center text-center gap-2"
            >
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="font-medium">Chat Support</span>
              <span className="text-sm text-white/60">Talk to our team</span>
            </GlassButton>
          </div>
        </div>
      </GlassContainer>

      {/* FAQs */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Common Questions</h3>
              <p className="text-sm text-white/60">Quick answers to frequent questions</p>
            </div>
            <Info className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do I update my schedule?",
                answer: "Navigate to the Calendar tab and click on any date to update your availability."
              },
              {
                question: "How do notifications work?",
                answer: "You'll receive notifications about schedule changes, payroll updates, and important announcements."
              },
              {
                question: "Can I export my data?",
                answer: "Yes! Go to the Data tab to download all your information."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-white/90">{faq.question}</h4>
                <p className="text-sm text-white/60">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassContainer>

      {/* Contact */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Contact Support</h3>
              <p className="text-sm text-white/60">Get in touch with our team</p>
            </div>
            <Mail className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-4">
            <p className="text-sm text-white/80">
              Our support team is available Monday through Friday, 9AM to 5PM CST.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <GlassButton
                variant="ghost"
                className="flex-1 inline-flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Support
              </GlassButton>
              <GlassButton
                variant="ghost"
                className="flex-1 inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Help Center
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassContainer>

      {/* App Info */}
      <div className="text-center text-sm text-white/40">
        <p>Halfday v1.0.0</p>
      </div>
    </div>
  )
}
