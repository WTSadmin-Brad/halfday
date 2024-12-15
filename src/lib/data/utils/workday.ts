import { WorkDay, WorkStatus, PayPeriod } from "../models/workday";

export const workDayUtils = {
  calculateHours(status: WorkStatus): number {
    switch (status) {
      case "FULL":
        return 8;
      case "HALF":
        return 4;
      case "OFF":
        return 0;
    }
  },

  isInPayPeriod(workDay: WorkDay, payPeriod: PayPeriod): boolean {
    return (
      workDay.date >= payPeriod.startDate && workDay.date <= payPeriod.endDate
    );
  },

  canEdit(workDay: WorkDay): boolean {
    if (workDay.locked) return false;
    if (workDay.syncStatus === "PENDING") return false;

    const now = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    return workDay.date >= twoWeeksAgo && workDay.date <= now;
  },

  summarizeWorkDays(workDays: WorkDay[]): {
    totalDays: number;
    fullDays: number;
    halfDays: number;
    offDays: number;
    totalHours: number;
  } {
    return workDays.reduce(
      (acc, day) => ({
        totalDays: acc.totalDays + 1,
        fullDays: acc.fullDays + (day.status === "FULL" ? 1 : 0),
        halfDays: acc.halfDays + (day.status === "HALF" ? 1 : 0),
        offDays: acc.offDays + (day.status === "OFF" ? 1 : 0),
        totalHours: acc.totalHours + this.calculateHours(day.status),
      }),
      {
        totalDays: 0,
        fullDays: 0,
        halfDays: 0,
        offDays: 0,
        totalHours: 0,
      }
    );
  },

  createWorkDayId(userId: string, date: Date): string {
    return `${userId}_${date.toISOString().split("T")[0]}`;
  },

  getPayPeriodDates(date: Date): { startDate: Date; endDate: Date } {
    const startDate = new Date(date);
    startDate.setDate(1);

    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    return { startDate, endDate };
  },
};
