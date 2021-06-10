// types
import type { ISOString } from 'tools/types/common';

export const formatTimestampToRelative = (
  compare: ISOString,
  current: ISOString = new Date().toISOString()
) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = new Date(current).getTime() - new Date(compare).getTime();

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} sec`;
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} min`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hr`;
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return `${Math.round(elapsed / msPerDay)} ${days === 1 ? 'day' : 'days'}`;
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return `${Math.round(elapsed / msPerMonth)} ${
      months === 1 ? 'month' : 'months'
    }`;
  } else {
    const years = Math.round(elapsed / msPerYear);
    return `${Math.round(elapsed / msPerYear)} ${
      years === 1 ? 'year' : 'years'
    }`;
  }
};
