import { BadRequestException } from '@nestjs/common';
import { endOfDay, startOfDay, getTime } from 'date-fns';
import {
  format,
  formatInTimeZone,
  toZonedTime as utcToZonedTime,
} from 'date-fns-tz';

export const df = {
  date: 'yyyy-MM-dd',
  time: 'HH:mm:ss',
  hm: 'h:mm A',
  full: 'yyyy-MM-dd HH:mm:ss',
  dt: 'yyyy-MM-dd h:mm A',
};

export function utcToZt(date: string, timeZone = 'Asia/Seoul'): Date {
  return utcToZonedTime(new Date(date), timeZone);
}

export function utcToZtByDate(date: Date, timeZone = 'Asia/Seoul'): Date {
  return utcToZonedTime(date, timeZone);
}

export function fDateTime(date: string): string {
  return format(new Date(date), df.full);
}

export function fDateToUtc(date: Date): string {
  return formatInTimeZone(date, 'UTC', df.full);
}

export function fDate(date: string): string {
  return format(new Date(date), df.date);
}

export function fDateByDate(date: Date): string {
  return format(date, df.date);
}

export function fDateGetStart(date: string): Date {
  return startOfDay(new Date(date));
}
export function fDateGetEnd(date: string): Date {
  return endOfDay(new Date(date));
}

export function getTimestamp(date: Date) {
  return getTime(date);
}
