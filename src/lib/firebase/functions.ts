import {
  getFunctions,
  httpsCallable,
  HttpsCallable,
  HttpsCallableResult,
  Functions,
} from "firebase/functions";
import { functions } from "./index";

// Type definitions for cloud functions
interface SyncFunctionPayload {
  userId: string;
  lastSyncTimestamp: number;
}

interface ProcessPayrollPayload {
  startDate: string;
  endDate: string;
  locationId?: string;
}

interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

// Cloud Function wrappers
export const syncUserData = httpsCallable<SyncFunctionPayload, void>(
  functions,
  "syncUserData"
);

export const processPayroll = httpsCallable<ProcessPayrollPayload, string>(
  functions,
  "processPayroll"
);

export const sendNotification = httpsCallable<NotificationPayload, void>(
  functions,
  "sendNotification"
);

// Utility function to handle function calls with proper error handling
export async function callFunction<T, R>(
  functionName: HttpsCallable<T, R>,
  data: T
): Promise<R> {
  try {
    const result: HttpsCallableResult<R> = await functionName(data);
    return result.data;
  } catch (error: any) {
    // Handle specific error codes
    const code = error.code as string;
    const message = error.message || "An unknown error occurred";

    switch (code) {
      case "functions/cancelled":
        throw new Error("The operation was cancelled.");
      case "functions/invalid-argument":
        throw new Error("Invalid arguments provided to the function.");
      case "functions/deadline-exceeded":
        throw new Error("The operation timed out.");
      case "functions/not-found":
        throw new Error("The requested resource was not found.");
      case "functions/permission-denied":
        throw new Error("Permission denied. Please check your authentication.");
      case "functions/resource-exhausted":
        throw new Error("Resource quota exceeded or rate limit reached.");
      case "functions/failed-precondition":
        throw new Error(
          "The system is not in a state required for the operation."
        );
      case "functions/internal":
        throw new Error("An internal error occurred. Please try again later.");
      case "functions/unavailable":
        throw new Error(
          "The service is currently unavailable. Please try again later."
        );
      case "functions/unauthenticated":
        throw new Error(
          "Authentication required. Please sign in and try again."
        );
      default:
        throw new Error(message);
    }
  }
}

// Example usage of the utility function:
export async function triggerSync(
  userId: string,
  lastSyncTimestamp: number
): Promise<void> {
  return callFunction(syncUserData, { userId, lastSyncTimestamp });
}

export async function generatePayrollReport(
  startDate: string,
  endDate: string,
  locationId?: string
): Promise<string> {
  return callFunction(processPayroll, { startDate, endDate, locationId });
}

export async function pushNotification(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  return callFunction(sendNotification, { userId, title, body, data });
}
