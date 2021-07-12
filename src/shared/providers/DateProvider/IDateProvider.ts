
export interface IDateProvider {
    dateNow(): Date;
    compareInHours(startDate: Date, endDate: Date): number;
    convertToUTCString(date: Date): string;
}