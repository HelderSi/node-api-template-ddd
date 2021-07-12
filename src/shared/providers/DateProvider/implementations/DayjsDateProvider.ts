import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
    dateNow(): Date {
        return dayjs().toDate()
    }
    compareInHours(startDate: Date, endDate: Date): number {
        const startUTC = this.convertToUTCString(startDate)
        const endUTC = this.convertToUTCString(endDate)
        return dayjs(endUTC).diff(startUTC, 'hours')
    }
    convertToUTCString(date: Date): string {
        return dayjs(date).utc().local().format()
    }
}

export { DayjsDateProvider }