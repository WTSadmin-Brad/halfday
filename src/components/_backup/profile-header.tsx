'use client'

import { GlassContainer } from '@/components/ui/glass/container'
import { UserIcon } from 'lucide-react'

interface ProfileHeaderProps {
  name: string
  status: 'online' | 'offline' | 'away'
  achievements: {
    sevenDay: boolean
    thirtyDay: boolean
    sixMonth: boolean
  }
}

const AchievementBadge = ({ earned, days }: { earned: boolean; days: string }) => (
  <div
    className={`flex items-center space-x-1 ${
      earned ? 'text-white' : 'text-white/40'
    }`}
  >
    <div className="w-2 h-2 rounded-full bg-current" />
    <span className="text-xs">{days}</span>
  </div>
)

export function ProfileHeader({ name, status, achievements }: ProfileHeaderProps) {
  return (
    <GlassContainer
      variant="solid"
      size="lg"
      className="w-full animate-container-fade-in"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="p-3 rounded-full bg-white/10">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black
                ${status === 'online' ? 'bg-green-400' : 
                  status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'}`}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{name}</h2>
            <p className="text-sm text-white/60 capitalize">{status}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <AchievementBadge earned={achievements.sevenDay} days="7d" />
          <AchievementBadge earned={achievements.thirtyDay} days="30d" />
          <AchievementBadge earned={achievements.sixMonth} days="6m" />
        </div>
      </div>
    </GlassContainer>
  )
}
