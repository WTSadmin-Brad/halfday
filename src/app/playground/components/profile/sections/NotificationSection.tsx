/**
 * NotificationSection Component
 * 
 * Manages user notification preferences with toggle switches and
 * time-based controls.
 * 
 * Features:
 * - Master toggle for all notifications
 * - Individual notification controls
 * - Time-range selection for quiet hours
 * - Smooth toggle animations
 */

import React from 'react';
import { useState } from 'react';
import { Bell, Calendar, Clock, Truck } from 'lucide-react';
import ProfileContainer from '../ProfileContainer';

interface NotificationSettings {
  masterToggle: boolean;
  statusUpdates: boolean;
  scheduleChanges: boolean;
  locationUpdates: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

const NotificationSection = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    masterToggle: true,
    statusUpdates: true,
    scheduleChanges: true,
    locationUpdates: false,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '07:00'
  });

  const handleMasterToggle = () => {
    const newState = !settings.masterToggle;
    setSettings(prev => ({
      ...prev,
      masterToggle: newState,
      statusUpdates: newState,
      scheduleChanges: newState,
      locationUpdates: newState
    }));
  };

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-300
        ${enabled ? 'bg-blue-600' : 'bg-gray-700'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-white
          transition-transform duration-300
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );

  const notificationTypes = [
    {
      id: 'statusUpdates',
      label: 'Status Updates',
      icon: <Bell className="h-4 w-4" />,
      description: 'Notifications about your daily status changes'
    },
    {
      id: 'scheduleChanges',
      label: 'Schedule Changes',
      icon: <Calendar className="h-4 w-4" />,
      description: 'Updates about schedule modifications'
    },
    {
      id: 'locationUpdates',
      label: 'Location Changes',
      icon: <Truck className="h-4 w-4" />,
      description: 'Alerts about location or truck assignments'
    }
  ];

  return (
    <ProfileContainer className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Notifications</h2>

      {/* Master Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-medium">All Notifications</h3>
          <p className="text-sm text-gray-400">Enable or disable all notifications</p>
        </div>
        <ToggleSwitch enabled={settings.masterToggle} onToggle={handleMasterToggle} />
      </div>

      {/* Individual Notification Types */}
      <div className="space-y-4">
        {notificationTypes.map(type => (
          <div
            key={type.id}
            className={`
              flex items-center justify-between p-4
              bg-white bg-opacity-5 rounded-lg
              transition-opacity duration-300
              ${!settings.masterToggle ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <div className="flex items-center space-x-3">
              <div className="text-gray-400">{type.icon}</div>
              <div>
                <h4 className="text-white font-medium">{type.label}</h4>
                <p className="text-sm text-gray-400">{type.description}</p>
              </div>
            </div>
            <ToggleSwitch
              enabled={settings[type.id as keyof NotificationSettings] as boolean}
              onToggle={() => handleToggle(type.id as keyof NotificationSettings)}
            />
          </div>
        ))}
      </div>

      {/* Quiet Hours Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <h3 className="text-white font-medium">Quiet Hours</h3>
          </div>
          <ToggleSwitch
            enabled={settings.quietHoursEnabled}
            onToggle={() => handleToggle('quietHoursEnabled')}
          />
        </div>

        <div className={`
          grid grid-cols-2 gap-4 transition-opacity duration-300
          ${!settings.quietHoursEnabled ? 'opacity-50 pointer-events-none' : ''}
        `}>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Start Time</label>
            <input
              type="time"
              value={settings.quietHoursStart}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                quietHoursStart: e.target.value
              }))}
              className="
                w-full px-4 py-2
                bg-white bg-opacity-5
                rounded-lg
                text-white
                border border-transparent
                focus:border-blue-500
                focus:outline-none
              "
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">End Time</label>
            <input
              type="time"
              value={settings.quietHoursEnd}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                quietHoursEnd: e.target.value
              }))}
              className="
                w-full px-4 py-2
                bg-white bg-opacity-5
                rounded-lg
                text-white
                border border-transparent
                focus:border-blue-500
                focus:outline-none
              "
            />
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default NotificationSection;