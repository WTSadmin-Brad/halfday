import { Timestamp } from "firebase/firestore";
import { BaseDocument, SyncStatus } from "@/lib/firebase/types";

export interface DomainModel extends BaseDocument {
  version: number;
  syncStatus: SyncStatus;
}

export interface TimestampModel {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type WithTimestamps<T> = T & TimestampModel;
