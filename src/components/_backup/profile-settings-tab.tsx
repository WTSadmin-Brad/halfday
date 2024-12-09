'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { GlassContainer } from '@/components/ui/glass/container'
import { GlassButton } from '@/components/ui/glass/button'
import { Bell, Moon, Sun, Monitor, Volume2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface NotificationSettings {
  enabled: boolean
  scheduleReminders: boolean
  payrollAlerts: boolean
  announcements: boolean
  quietHoursEnabled: boolean
  quietHoursStart: string
  quietHoursEnd: string
  preferredContact: 'sms' | 'email' | 'push'
}

interface AppearanceSettings {
  theme: 'system' | 'light' | 'dark'
  reducedMotion: boolean
}

interface SettingsForm {
  notifications: NotificationSettings
  appearance: AppearanceSettings
}

export function ProfileSettingsTab() {
  const form = useForm<SettingsForm>({
    defaultValues: {
      notifications: {
        enabled: true,
        scheduleReminders: true,
        payrollAlerts: true,
        announcements: true,
        quietHoursEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '07:00',
        preferredContact: 'push'
      },
      appearance: {
        theme: 'system',
        reducedMotion: false
      }
    }
  })

  const onSubmit = (data: SettingsForm) => {
    console.log(data)
    // TODO: Implement save functionality
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-500">
      {/* Notification Settings */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Notifications</h3>
              <p className="text-sm text-white/60">Manage your notification preferences</p>
            </div>
            <Bell className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-enabled" className="flex flex-col">
                <span>Enable Notifications</span>
                <span className="text-sm text-white/60">Receive updates about your schedule</span>
              </Label>
              <Switch id="notifications-enabled" />
            </div>

            <div className="space-y-4 pl-4 pt-4 border-l border-white/10">
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule-reminders">Schedule Reminders</Label>
                <Switch id="schedule-reminders" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="payroll-alerts">Payroll Alerts</Label>
                <Switch id="payroll-alerts" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="announcements">Announcements</Label>
                <Switch id="announcements" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <Switch id="quiet-hours" />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiet-start">Start Time</Label>
                  <Select defaultValue="22:00">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiet-end">End Time</Label>
                  <Select defaultValue="07:00">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassContainer>

      {/* Appearance Settings */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Appearance</h3>
              <p className="text-sm text-white/60">Customize your app experience</p>
            </div>
            <Monitor className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Theme</Label>
              <div className="flex items-center gap-2">
                <GlassButton
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 p-0"
                  type="button"
                >
                  <Monitor className="h-4 w-4" />
                </GlassButton>
                <GlassButton
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 p-0"
                  type="button"
                >
                  <Sun className="h-4 w-4" />
                </GlassButton>
                <GlassButton
                  size="sm"
                  variant="ghost"
                  className="w-10 h-10 p-0"
                  type="button"
                >
                  <Moon className="h-4 w-4" />
                </GlassButton>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="flex flex-col">
                <span>Reduced Motion</span>
                <span className="text-sm text-white/60">Minimize animations</span>
              </Label>
              <Switch id="reduced-motion" />
            </div>
          </div>
        </div>
      </GlassContainer>

      {/* Save Button */}
      <div className="flex justify-end">
        <GlassButton type="submit" className="px-8">
          Save Changes
        </GlassButton>
      </div>
    </form>
  )
}
