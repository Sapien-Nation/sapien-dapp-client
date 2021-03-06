// utils
import { formatTimestampToRelative } from 'utils/date';

describe('formatTimestampToRelative', () => {
  const compare = '2021-02-06T03:48:30.501Z';

  test('seconds', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-06T03:49:29.501Z'
    );
    expect(format).toBe('59 sec');
  });

  test('0 seconds', () => {
    const format = formatTimestampToRelative(compare, compare);
    expect(format).toBe('0 sec');
  });

  test('minutes', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-06T03:49:31.501Z'
    );
    expect(format).toBe('1 min');
  });

  test('60 minutes', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-06T04:48:29.501Z'
    );
    expect(format).toBe('60 min');
  });

  test('hours', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-06T04:49:01.501Z'
    );
    expect(format).toBe('1 hr');
  });

  test('24 hours', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-07T03:48:29.501Z'
    );
    expect(format).toBe('24 hr');
  });

  test('day', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-07T03:48:30.501Z'
    );
    expect(format).toBe('1 day');
  });

  test('days', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-02-10T03:48:30.501Z'
    );
    expect(format).toBe('4 days');
  });

  test('month', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-03-08T03:48:30.501Z'
    );
    expect(format).toBe('1 month');
  });

  test('months', () => {
    const format = formatTimestampToRelative(
      compare,
      '2021-06-08T03:48:30.501Z'
    );
    expect(format).toBe('4 months');
  });

  test('year', () => {
    const format = formatTimestampToRelative(
      compare,
      '2022-03-08T03:48:30.501Z'
    );
    expect(format).toBe('1 year');
  });

  test('years', () => {
    const format = formatTimestampToRelative(
      compare,
      '2025-03-08T03:48:30.501Z'
    );
    expect(format).toBe('4 years');
  });
});
