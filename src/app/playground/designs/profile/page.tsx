"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Shield, Bell } from "lucide-react";
import NetworkBackground from "../../components/profile/animations/NetworkBackground";
import {
  ProfileHeader,
  ProfileAvatar,
  ProfileSection,
  ProfileField,
} from "../../components/profile/ui/profile-components";
import { Container } from "../../components/ui/containers";
import { profileStyles } from "../../styles/design-system";

interface UserProfile {
  name: string;
  initials: string;
  email: string;
  phone?: string;
  emergencyContact?: string;
  avatar?: string;
}

const ProfilePage = () => {
  const [profile] = useState<UserProfile>({
    name: "John Doe",
    initials: "JD",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    emergencyContact: "Jane Doe: +1 (555) 987-6543",
  });

  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  // Handle scroll for header transformation
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderCollapsed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050B2E] to-[#0A1445] text-white relative">
      {/* Background Effects */}
      <NetworkBackground density={1.5} connectionDistance={150} speed={0.3} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />

      {/* Header */}
      <ProfileHeader
        isCollapsed={isHeaderCollapsed}
        userName={profile.name}
        userInitials={profile.initials}
        avatarUrl={profile.avatar}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-16 pb-20 relative">
        {/* Hero Section */}
        <section className="h-[30vh] flex flex-col items-center justify-center mb-8">
          <ProfileAvatar
            size="lg"
            userInitials={profile.initials}
            avatarUrl={profile.avatar}
            editable
          />
          <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
          <p className="text-neutral-400">{profile.email}</p>
        </section>

        {/* Content Sections */}
        <Container
          variant="glass"
          elevation="raised"
          className="space-y-6 max-w-2xl mx-auto"
        >
          {/* Personal Information */}
          <ProfileSection title="Personal Information">
            <ProfileField
              label="Email"
              value={profile.email}
              icon={<Mail className="w-5 h-5" />}
              editable
            />
            <ProfileField
              label="Phone"
              value={profile.phone || "Not set"}
              icon={<Phone className="w-5 h-5" />}
              editable
            />
            <ProfileField
              label="Emergency Contact"
              value={profile.emergencyContact || "Not set"}
              icon={<Shield className="w-5 h-5" />}
              editable
            />
          </ProfileSection>

          {/* Notification Settings */}
          <ProfileSection title="Notification Settings">
            <ProfileField
              label="Email Notifications"
              value="Enabled"
              icon={<Bell className="w-5 h-5" />}
              editable
            />
            <ProfileField
              label="Push Notifications"
              value="Disabled"
              icon={<Bell className="w-5 h-5" />}
              editable
            />
          </ProfileSection>
        </Container>
      </main>
    </div>
  );
};

export default ProfilePage;
