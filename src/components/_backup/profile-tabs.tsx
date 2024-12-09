'use client'

import { GlassContainer } from '@/components/ui/glass/container'
import { GlassButton } from '@/components/ui/glass/button'
import { UserIcon, Settings, Database, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export type TabKey = 'info' | 'settings' | 'data' | 'help'

interface ProfileTabsProps {
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
}

const tabs = [
  {
    key: 'info' as TabKey,
    icon: UserIcon,
    label: 'Personal Info'
  },
  {
    key: 'settings' as TabKey,
    icon: Settings,
    label: 'Settings'
  },
  {
    key: 'data' as TabKey,
    icon: Database,
    label: 'Data'
  },
  {
    key: 'help' as TabKey,
    icon: HelpCircle,
    label: 'Help'
  }
]

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <GlassContainer
      variant="subtle"
      size="sm"
      className="w-full overflow-x-auto scrollbar-hide"
    >
      <div className="flex min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          const Icon = tab.icon
          
          return (
            <GlassButton
              key={tab.key}
              variant={isActive ? 'default' : 'ghost'}
              onClick={() => onTabChange(tab.key)}
              className="relative flex items-center px-4 py-2 group"
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </GlassButton>
          )
        })}
      </div>
    </GlassContainer>
  )
}
