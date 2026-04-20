import { useState, useEffect } from "react";
import { CalendarProps, DayInfo, ViewMode } from "../types";
import { getWeekStart, getWeekEnd } from "../utils";

export const useCalendar = ({
  value,
  onChange,
  rangeMode = false,
  rangeValue = [],
  onRangeChange = () => {},
  weekMode = false,
  disabledDate,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const [selectedYear, setSelectedYear] = useState(currentMonth.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.getMonth());
  const [tempRangeValue, setTempRangeValue] = useState<Date[]>(rangeValue);
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");

  // Calculate year range
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear + 100;

  const [yearPage, setYearPage] = useState(
    Math.floor((selectedYear - minYear) / 12)
  );

  useEffect(() => {
    setCurrentMonth(new Date(selectedYear, selectedMonth));
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    setTempRangeValue(rangeValue);
  }, [rangeValue]);

  const getDaysInMonth = (date: Date): DayInfo[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days: DayInfo[] = [];

    // Previous month days - keep Sunday-based display
    for (let i = startDate - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        day: prevDate.getDate(),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        day,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        day: nextDate.getDate(),
      });
    }

    return days;
  };

  const isSelected = (date: Date): boolean => {
    if (rangeMode) {
      const [start, end] = tempRangeValue;
      return (
        (start && date.toDateString() === start.toDateString()) ||
        (end && date.toDateString() === end.toDateString()) ||
        false
      );
    }
    return value ? date.toDateString() === value.toDateString() : false;
  };

  const isInRange = (date: Date): boolean => {
    if (!rangeMode || tempRangeValue.length !== 2) return false;
    const [start, end] = tempRangeValue;
    return start && end ? date >= start && date <= end : false;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isDateDisabled = (date: Date): boolean => {
    if (disabledDate) {
      return disabledDate(date);
    }
    return false;
  };

  const isInSelectedWeek = (date: Date): boolean => {
    if (!weekMode || !value) return false;
    const weekStart = getWeekStart(value);
    const weekEnd = getWeekEnd(value);
    return date >= weekStart && date <= weekEnd;
  };

  const handleDateClick = (date: Date) => {
    // Check if date is disabled
    if (isDateDisabled(date)) {
      return;
    }

    if (weekMode) {
      // In week mode, select the entire week
      const weekStart = getWeekStart(date);
      onChange(weekStart); // Set the start of the week as the value
      return;
    }

    if (rangeMode) {
      const [start, end] = tempRangeValue;
      if (!start || (start && end)) {
        setTempRangeValue([date]);
      } else {
        if (date < start) {
          setTempRangeValue([date, start]);
        } else {
          setTempRangeValue([start, date]);
        }
      }
    } else {
      onChange(date);
    }
  };

  const handleRangeConfirm = () => {
    onRangeChange(tempRangeValue);
  };

  const handleMonthChange = (increment: number) => {
    const newMonth = selectedMonth + increment;
    if (newMonth < 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else if (newMonth > 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(newMonth);
    }
  };

  const handleYearChange = (increment: number) => {
    const newYear = selectedYear + increment;
    if (newYear >= minYear && newYear <= maxYear) {
      setSelectedYear(newYear);
      setYearPage(Math.floor((newYear - minYear) / 12));
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === "year") {
      setYearPage(Math.floor((selectedYear - minYear) / 12));
    }
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setViewMode("calendar");
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setViewMode("calendar");
  };

  const handleYearPageChange = (increment: number) => {
    const newPage = yearPage + increment;
    const maxPage = Math.floor((maxYear - minYear) / 12);
    if (newPage >= 0 && newPage <= maxPage) {
      setYearPage(newPage);
    }
  };

  const getYearRangeForPage = () => {
    const startYear = minYear + yearPage * 12;
    const endYear = Math.min(startYear + 11, maxYear);
    const years: (number | null)[] = Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
    while (years.length < 12) {
      years.push(null);
    }
    return years;
  };

  const getYearPageRange = () => {
    const startYear = minYear + yearPage * 12;
    const endYear = Math.min(startYear + 11, maxYear);
    return `${startYear}-${endYear}`;
  };

  return {
    currentMonth,
    selectedYear,
    selectedMonth,
    tempRangeValue,
    viewMode,
    yearPage,
    minYear,
    maxYear,
    getDaysInMonth,
    isSelected,
    isInRange,
    isToday,
    isDateDisabled,
    isInSelectedWeek,
    handleDateClick,
    handleRangeConfirm,
    handleMonthChange,
    handleYearChange,
    handleViewModeChange,
    handleYearSelect,
    handleMonthSelect,
    handleYearPageChange,
    getYearRangeForPage,
    getYearPageRange,
  };
};
