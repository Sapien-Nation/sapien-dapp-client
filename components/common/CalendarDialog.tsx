/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid'

// utils
import { formatDate, getWeekDay, addDays, subtractDays, getDaysInMonth } from 'utils/date';

// components
import { Dialog } from 'components/common';

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
    const postfix = (i < 9) ? `0${i+1}` : `${i+1}`
    const formatted = formatDate(curDate,'yyyy-MM') + `-${postfix}`;
    const d = { date: formatted, isCurrentMonth: true };
    if (formatted == formatDate(curDate,'yyyy-MM-dd')) {
      d['isToday'] = true;
      d['isSelected'] = true;
    }
    days.push(d);
  }

  const lastDay = new Date(formatDate(curDate,'yyyy-MM') + `-${daysInMonth}`);
  const lastDayUTC = new Date(lastDay.getTime() + lastDay.getTimezoneOffset() * 60000);
  const weekDay = getWeekDay(lastDay);

  let x = weekDay+1;
  if (weekDay == 6) x = 0;
  for (let i = 0; i < (6 - (x)); i++) {
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
  setValue: (string) => void;
  setShowDialog: (boolean) => void;
}

const CalendarDialog = ({title, onClose, setValue, setShowDialog}:Props) => {
  const [days, setDays] = useState(getDays(new Date()));
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [month, setMonth] = useState({
    value: formatDate(new Date(), 'yyyy-MM'),
    name: `${formatDate(new Date(),'LLLL')} ${formatDate(new Date(),'yyyy')}`
  });

  const updateSelectedDay = (date) => {
    const newDays = days.map(day => {
      if (day.date == date) {
        return { ...day, isSelected: true}
      }
      delete day.isSelected
      return day;
    });
    setDays(newDays);
    setSelectedDay(date);
  }

  const updateMonth = (val) => {
    const firstDay = new Date(month.value + '-01');
    const firstDayUTC = new Date(firstDay.getTime() + firstDay.getTimezoneOffset() * 60000);
    if (val == 'prev') { 
      const prevDay = subtractDays(firstDayUTC,1);
      setDays(getDays(prevDay));
      setMonth({
        value: formatDate(prevDay, 'yyyy-MM'), 
        name: `${formatDate(prevDay,'LLLL')} ${formatDate(prevDay,'yyyy')}`
      });
    }
    if (val == 'next') {
      const daysInMonth = getDaysInMonth(firstDayUTC);
      const lastDay = new Date(month.value + `-${daysInMonth}`);
      const lastDayUTC = new Date(lastDay.getTime() + lastDay.getTimezoneOffset() * 60000);
      const nextDay = addDays(lastDayUTC,1);
      setDays(getDays(nextDay));
      setMonth({
        value: formatDate(nextDay, 'yyyy-MM'), 
        name: `${formatDate(nextDay,'LLLL')} ${formatDate(nextDay,'yyyy')}`
      });
    }
  }

  return (
    <Dialog
      show
      title={title}
      onClose={onClose}
      onConfirm={() => {
        setValue(selectedDay);
        setShowDialog(false);
        console.log(`SELECTED: ${selectedDay}`)
      }}
    >
      <div>
        <div className="mt-10 text-center lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:mt-9 xl:col-start-1">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() => updateMonth('prev')}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="text-white flex-auto font-semibold">{month.name}</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              onClick={() => updateMonth('next')}
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
                onClick={() => updateSelectedDay(day.date)}
                disabled={!day.isCurrentMonth}
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