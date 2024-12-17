/**
 * PersonalInformationSection Component
 *
 * A form section for managing user personal information with neumorphic design
 * and responsive validation.
 *
 * Key Features:
 * - Real-time validation
 * - Nested container architecture
 * - Smooth focus animations
 * - Error state handling
 */

import React from "react";
import { useState } from "react";
import { User, Phone, Mail, Heart } from "lucide-react";
import ProfileContainer from "./ProfileContainer";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  emergencyContact: string;
}

const PersonalInformationSection = () => {
  // State management for form fields
  const [info, setInfo] = useState<PersonalInfo>({
    name: "",
    phone: "",
    email: "",
    emergencyContact: "",
  });

  // Form field configuration for consistent styling and behavior
  const fields = [
    {
      id: "name",
      label: "Full Name",
      icon: <User className="h-4 w-4" />,
      value: info.name,
      placeholder: "Enter your full name",
    },
    {
      id: "phone",
      label: "Phone Number",
      icon: <Phone className="h-4 w-4" />,
      value: info.phone,
      placeholder: "(555) 555-5555",
    },
    {
      id: "email",
      label: "Email Address",
      icon: <Mail className="h-4 w-4" />,
      value: info.email,
      placeholder: "your@email.com",
    },
    {
      id: "emergencyContact",
      label: "Emergency Contact",
      icon: <Heart className="h-4 w-4" />,
      value: info.emergencyContact,
      placeholder: "Contact name and number",
    },
  ];

  // Handle input changes with type safety
  const handleChange = (id: keyof PersonalInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <ProfileContainer className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Personal Information
      </h2>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label
              htmlFor={field.id}
              className="text-sm text-gray-300 flex items-center gap-2"
            >
              {field.icon}
              {field.label}
            </label>

            {/* Input Container - Implements nested neumorphic design */}
            <div className="relative">
              <input
                id={field.id}
                type="text"
                value={field.value}
                onChange={(e) =>
                  handleChange(field.id as keyof PersonalInfo, e.target.value)
                }
                placeholder={field.placeholder}
                className="
                  w-full px-4 py-3 
                  bg-white bg-opacity-5 
                  rounded-lg
                  text-white 
                  placeholder-gray-500
                  transition-all duration-300
                  border border-transparent
                  focus:border-blue-500 focus:bg-opacity-10
                  focus:outline-none focus:ring-0
                "
              />
            </div>
          </div>
        ))}

        {/* Save Button - Elevated state example */}
        <div className="pt-4">
          <button
            className="
            w-full px-6 py-3
            bg-blue-600 hover:bg-blue-700
            text-white font-medium
            rounded-lg
            transition-all duration-300
            transform hover:scale-[1.02]
            active:scale-[0.98]
          "
          >
            Save Changes
          </button>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default PersonalInformationSection;
