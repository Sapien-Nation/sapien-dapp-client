/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'

// utils
import { formatDate, getWeekDay, addDays, subtractDays, getDaysInMonth } from 'utils/date';

// components
import { Dialog } from 'components/common';

const days = [
  { date: '2021-12-27' },
  { date: '2021-12-28' },
  { date: '2021-12-29' },
  { date: '2021-12-30' },
  { date: '2021-12-31' },
  { date: '2022-01-01', isCurrentMonth: true },
  { date: '2022-01-02', isCurrentMonth: true },
  { date: '2022-01-03', isCurrentMonth: true },
  { date: '2022-01-04', isCurrentMonth: true },
  { date: '2022-01-05', isCurrentMonth: true },
  { date: '2022-01-06', isCurrentMonth: true },
  { date: '2022-01-07', isCurrentMonth: true },
  { date: '2022-01-08', isCurrentMonth: true },
  { date: '2022-01-09', isCurrentMonth: true },
  { date: '2022-01-10', isCurrentMonth: true },
  { date: '2022-01-11', isCurrentMonth: true },
  { date: '2022-01-12', isCurrentMonth: true, isToday: true },
  { date: '2022-01-13', isCurrentMonth: true },
  { date: '2022-01-14', isCurrentMonth: true },
  { date: '2022-01-15', isCurrentMonth: true },
  { date: '2022-01-16', isCurrentMonth: true },
  { date: '2022-01-17', isCurrentMonth: true },
  { date: '2022-01-18', isCurrentMonth: true },
  { date: '2022-01-19', isCurrentMonth: true },
  { date: '2022-01-20', isCurrentMonth: true },
  { date: '2022-01-21', isCurrentMonth: true },
  { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
  { date: '2022-01-23', isCurrentMonth: true },
  { date: '2022-01-24', isCurrentMonth: true },
  { date: '2022-01-25', isCurrentMonth: true },
  { date: '2022-01-26', isCurrentMonth: true },
  { date: '2022-01-27', isCurrentMonth: true },
  { date: '2022-01-28', isCurrentMonth: true },
  { date: '2022-01-29', isCurrentMonth: true },
  { date: '2022-01-30', isCurrentMonth: true },
  { date: '2022-01-31', isCurrentMonth: true },
  { date: '2022-02-01' },
  { date: '2022-02-02' },
  { date: '2022-02-03' },
  { date: '2022-02-04' },
  { date: '2022-02-05' },
  { date: '2022-02-06' },
]

const getDays = (curDate) => {
  const firstDay = new Date(formatDate(curDate,'yyyy-MM') + '-01');
  const firstDayUTC = new Date(firstDay.getTime() + firstDay.getTimezoneOffset() * 60000);
  const dayOfWeek = getWeekDay(firstDay);

  let days = [];
  let daysBefore = [];
  for (let i = 0; i < dayOfWeek+1; i++) {
    const day = subtractDays(firstDayUTC, i+1);
    const formatted = formatDate(day,'yyyy-MM-dd');
    daysBefore.push({ date: formatted });
  }
  days = days.concat(daysBefore.reverse());

  const daysInMonth = getDaysInMonth(firstDayUTC);
  for (let i = 0; i < daysInMonth; i++) {
    const postfix = (i < 10) ? `0${i+1}` : `${i+1}`
    const formatted = formatDate(curDate,'yyyy-MM') + `-${postfix}`;
    const d = { date: formatted, isCurrentMonth: true };
    if (formatted == formatDate(curDate,'yyyy-MM-dd')) d['isToday'] = true;
    days.push(d);
  }

  const lastDay = new Date(formatDate(curDate,'yyyy-MM') + `-${daysInMonth}`);
  const lastDayUTC = new Date(lastDay.getTime() + lastDay.getTimezoneOffset() * 60000);
  const weekDay = getWeekDay(lastDay);

  for (let i = 0; i < (6 - (weekDay+1)); i++) {
    const day = addDays(lastDayUTC, i + 1);
    const formatted = formatDate(day,'yyyy-MM-dd');
    days.push({ date: formatted});
  }

  return days;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  title: string;
  onClose: () => void;
}

const CalendarDialog = ({title, onClose}:Props) => {
  const [currentDate, setCurrentDate] = useState(formatDate(new Date(),'yyyy-MM-dd'));
  const [days, setDays] = useState(getDays(new Date()));
  const [month, setMonth] = useState(formatDate(new Date(),'LLLL'));
  console.log(`DAYS: ${JSON.stringify(days)}`)


  return (
    <Dialog
      show
      title={title}
      onClose={onClose}
    >
      <div>
        <div className="mt-10 text-center lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:mt-9 xl:col-start-1">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="text-white flex-auto font-semibold">{month}</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                  day.isToday && !day.isSelected && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg'
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CalendarDialog;