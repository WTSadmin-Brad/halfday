'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { GlassContainer } from '@/components/ui/glass/container'
import { GlassInput } from '@/components/ui/glass/input'
import { GlassButton } from '@/components/ui/glass/button'
import { User, Phone, Mail, Heart } from 'lucide-react'

interface PersonalInfoForm {
  name: string
  phone: string
  email: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
}

export function ProfileInfoTab() {
  const form = useForm<PersonalInfoForm>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    }
  })

  const onSubmit = (data: PersonalInfoForm) => {
    console.log(data)
    // TODO: Implement save functionality
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-500">
      {/* Personal Information */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white/90">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <GlassInput
                {...form.register('name')}
                placeholder="Full Name"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <GlassInput
                {...form.register('phone')}
                placeholder="Phone Number"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <GlassInput
                {...form.register('email')}
                placeholder="Email Address"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </GlassContainer>

      {/* Emergency Contact */}
      <GlassContainer variant="subtle" size="sm">
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white/90">Emergency Contact</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <GlassInput
                {...form.register('emergencyContact.name')}
                placeholder="Contact Name"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <GlassInput
                {...form.register('emergencyContact.phone')}
                placeholder="Contact Phone"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Heart className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <GlassInput
                {...form.register('emergencyContact.relationship')}
                placeholder="Relationship"
                className="pl-10"
              />
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
