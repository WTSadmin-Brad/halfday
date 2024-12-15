import { DomainModel } from "./common";

export type WorkStatus = "FULL" | "HALF" | "OFF";

export interface WorkLocation {
  id: string;
  name: string;
  active: boolean;
}

export interface Truck {
  id: string;
  number: string;
  active: boolean;
}

export interface WorkDay extends DomainModel {
  userId: string;
  date: Date;
  status: WorkStatus;
  locationId?: string;
  truckId?: string;
  notes?: string;
  locked: boolean;
  payPeriodId?: string;
}

export interface PayPeriod extends DomainModel {
  startDate: Date;
  endDate: Date;
  status: "OPEN" | "LOCKED" | "PROCESSED";
  lockedAt?: Date;
  lockedBy?: string;
}
