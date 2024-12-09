'use client'

import * as React from 'react'
import { GlassContainer } from '@/components/ui/glass/container'
import { GlassButton } from '@/components/ui/glass/button'
import { Database, Download, RotateCw, Shield } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

export function ProfileDataTab() {
  const [syncProgress, setSyncProgress] = React.useState(0)
  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSyncing(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Sync Settings */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Data Sync</h3>
              <p className="text-sm text-white/60">Manage your data synchronization</p>
            </div>
            <Database className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-sync" className="flex flex-col">
                <span>Automatic Sync</span>
                <span className="text-sm text-white/60">Keep your data up to date</span>
              </Label>
              <Switch id="auto-sync" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>Last synced 2 hours ago</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-1" />
              <div className="flex justify-end mt-2">
                <GlassButton
                  size="sm"
                  variant="ghost"
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-2"
                >
                  <RotateCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </GlassContainer>

      {/* Data Export */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Data Export</h3>
              <p className="text-sm text-white/60">Download your data</p>
            </div>
            <Download className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-4">
            <p className="text-sm text-white/80">
              Download a copy of your data including your profile information,
              schedule history, and preferences.
            </p>
            <div className="flex justify-end">
              <GlassButton
                variant="ghost"
                className="inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Data
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassContainer>

      {/* Data Privacy */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white/90">Privacy</h3>
              <p className="text-sm text-white/60">Manage your data privacy</p>
            </div>
            <Shield className="h-5 w-5 text-white/40" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics" className="flex flex-col">
                <span>Usage Analytics</span>
                <span className="text-sm text-white/60">Help us improve the app</span>
              </Label>
              <Switch id="analytics" />
            </div>
          </div>
        </div>
      </GlassContainer>
    </div>
  )
}
