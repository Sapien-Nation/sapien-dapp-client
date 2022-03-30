import {
  format as formatDateFns,
  formatRelative as formatDateRelativeFns,
  subDays as subDaysFns,
} from 'date-fns';

export const formatDate = (
  date: Date | number | string,
  format = 'MM/dd/yyyy',
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  }
) => formatDateFns(new Date(date), format, options);

export const formatDateRelative = (
  date: Date | number | string,
  baseDate = Date.now(),
  options: { locale?: Locale; weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 } = {}
) => formatDateRelativeFns(new Date(date), baseDate, options);

export const subtractDays = (date: Date | number, amount = 0) =>
  subDaysFns(date, amount);

export const getFormattedDate = (isoString: string) => {
  const options = { month: 'short', day: 'numeric', year: '2-digit' };
  const date = new Date(isoString);
  // @ts-ignore
  const americanDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return americanDate;
};
