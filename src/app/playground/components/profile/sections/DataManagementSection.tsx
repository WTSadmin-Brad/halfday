/**
 * DataManagementSection Component
 * 
 * Purpose:
 * Provides user control over data synchronization, storage, and management
 * with real-time status indicators and interactive controls.
 * 
 * Key Features:
 * - Sync status visualization
 * - Storage usage tracking
 * - Cache management
 * - Data export options
 * 
 * Implementation Notes:
 * - Uses glass-morphism design for status cards
 * - Implements progressive loading states
 * - Provides clear visual feedback for async operations
 */

import React from 'react';
import { useState } from 'react';
import { 
  RefreshCw, 
  Database, 
  Download, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import ProfileContainer from '../ProfileContainer';

// Type definitions for component state management
interface SyncStatus {
  lastSync: Date | null;
  status: 'synced' | 'syncing' | 'error';
  pendingChanges: number;
}

interface StorageInfo {
  used: number;
  total: number;
  lastCleared: Date | null;
}

const DataManagementSection = () => {
  // State management for various data metrics
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: new Date(),
    status: 'synced',
    pendingChanges: 0
  });

  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    used: 25.4,
    total: 100,
    lastCleared: new Date()
  });

  // Status indicator component with dynamic styling
  const StatusIndicator = ({ status }: { status: SyncStatus['status'] }) => {
    const statusConfig = {
      synced: {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'All changes synced'
      },
      syncing: {
        icon: RefreshCw,
        color: 'text-blue-500',
        text: 'Syncing...'
      },
      error: {
        icon: AlertCircle,
        color: 'text-red-500',
        text: 'Sync error'
      }
    };

    const Config = statusConfig[status];
    const Icon = Config.icon;

    return (
      <div className={`flex items-center space-x-2 ${Config.color}`}>
        <Icon className="h-4 w-4" />
        <span className="text-sm">{Config.text}</span>
      </div>
    );
  };

  // Mock sync function - In production, this would interface with actual sync logic
  const handleSync = async () => {
    setSyncStatus(prev => ({ ...prev, status: 'syncing' }));
    
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus(prev => ({
        ...prev,
        status: 'synced',
        lastSync: new Date(),
        pendingChanges: 0
      }));
    }, 2000);
  };

  // Storage usage visualization component
  const StorageUsage = () => (
    <div className="relative pt-2">
      <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-400">
        <span>{storageInfo.used.toFixed(1)} MB used</span>
        <span>{storageInfo.total} MB total</span>
      </div>
    </div>
  );

  return (
    <ProfileContainer className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Data Management</h2>

      {/* Sync Status Card */}
      <div className="space-y-6">
        <div className="bg-white bg-opacity-5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-medium">Sync Status</h3>
              <StatusIndicator status={syncStatus.status} />
            </div>
            <button
              onClick={handleSync}
              disabled={syncStatus.status === 'syncing'}
              className={`
                p-2 rounded-lg
                transition-all duration-300
                ${syncStatus.status === 'syncing'
                  ? 'bg-blue-500 bg-opacity-50 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
                }
              `}
            >
              <RefreshCw className={`
                h-5 w-5 text-white
                ${syncStatus.status === 'syncing' ? 'animate-spin' : ''}
              `} />
            </button>
          </div>

          <div className="text-sm text-gray-400 flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>
              Last synced: {syncStatus.lastSync?.toLocaleTimeString() || 'Never'}
            </span>
          </div>

          {syncStatus.pendingChanges > 0 && (
            <div className="mt-2 text-sm text-yellow-500">
              {syncStatus.pendingChanges} changes pending sync
            </div>
          )}
        </div>

        {/* Storage Management Card */}
        <div className="bg-white bg-opacity-5 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Storage Usage</h3>
          <StorageUsage />
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button className="
              flex items-center justify-center gap-2
              px-4 py-2 rounded-lg
              bg-blue-500 hover:bg-blue-600
              text-white text-sm
              transition-colors duration-300
            ">
              <Download className="h-4 w-4" />
              Export Data
            </button>
            
            <button className="
              flex items-center justify-center gap-2
              px-4 py-2 rounded-lg
              bg-red-500 hover:bg-red-600
              text-white text-sm
              transition-colors duration-300
            ">
              <Trash2 className="h-4 w-4" />
              Clear Cache
            </button>
          </div>
        </div>

        {/* Data Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-5 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-400 mb-1">
              <Database className="h-4 w-4" />
              <span className="text-sm">Stored Records</span>
            </div>
            <span className="text-xl text-white font-medium">1,234</span>
          </div>

          <div className="bg-white bg-opacity-5 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-400 mb-1">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Sync Frequency</span>
            </div>
            <span className="text-xl text-white font-medium">15 min</span>
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default DataManagementSection;