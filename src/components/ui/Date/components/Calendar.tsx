import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { CalendarProps } from "../types";
import { useCalendar } from "../hooks/useCalendar";
import { locales } from "../constants";

export const CalendarComponent: React.FC<CalendarProps> = ({
  value,
  onChange,
  rangeMode = false,
  rangeValue = [],
  onRangeChange = () => {},
  weekMode = false,
  disabledDate,
}) => {
  const t = locales.en;
  const {
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
  } = useCalendar({
    value,
    onChange,
    rangeMode,
    rangeValue,
    onRangeChange,
    weekMode,
    disabledDate,
  });

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between border-b pb-2">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleYearChange(-1)}
            disabled={selectedYear <= minYear}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
            type="button"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleMonthChange(-1)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewModeChange("month")}
            className="text-sm font-medium text-gray-900 hover:text-blue-600"
            type="button"
          >
            {t.months[selectedMonth]}
          </button>
          <button
            onClick={() => handleViewModeChange("year")}
            className="text-sm font-medium text-gray-900 hover:text-blue-600"
            type="button"
          >
            {selectedYear}
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleMonthChange(1)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleYearChange(1)}
            disabled={selectedYear >= maxYear}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
            type="button"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Month/Year Selection Views */}
      {viewMode === "month" && (
        <div className="grid h-56 grid-cols-3 gap-1">
          {t.months.map((month, index) => (
            <button
              key={index}
              onClick={() => handleMonthSelect(index)}
              className={`h-10 rounded-xl p-2 text-sm font-medium transition-colors ${
                index === selectedMonth
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
              type="button"
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {viewMode === "year" && (
        <div>
          {/* Year Navigation Header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={() => handleYearPageChange(-1)}
              disabled={yearPage === 0}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
              type="button"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {getYearPageRange()}
            </span>
            <button
              onClick={() => handleYearPageChange(1)}
              disabled={yearPage >= Math.floor((maxYear - minYear) / 12)}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
              type="button"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>

          {/* Year Grid */}
          <div className="grid h-56 grid-cols-3 gap-1">
            {getYearRangeForPage().map((year, index) => (
              <button
                key={year || `empty-${index}`}
                onClick={() => year && handleYearSelect(year)}
                disabled={!year}
                className={`h-10 rounded-xl p-2 text-sm font-medium transition-colors ${
                  !year
                    ? "invisible"
                    : year === selectedYear
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                type="button"
              >
                {year || ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <>
          {/* Weekdays */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {t.weekdays.map(day => (
              <div
                key={day}
                className="py-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map(({ date, isCurrentMonth, day }, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                type="button"
                disabled={isDateDisabled(date)}
                className={`
                  rounded p-2 text-sm transition-colors
                  ${!isCurrentMonth ? "text-gray-300" : "text-gray-900"}
                  ${isSelected(date) ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
                  ${isInRange(date) ? "bg-blue-100" : ""}
                  ${isInSelectedWeek(date) && weekMode ? "bg-blue-200" : ""}
                  ${isToday(date) && !isSelected(date) ? "bg-blue-50 font-medium text-blue-600" : ""}
                  ${isDateDisabled(date) ? "cursor-not-allowed bg-gray-100 text-gray-300" : "hover:bg-blue-50"}
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Range mode actions */}
      {rangeMode && (
        <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            type="button"
          >
            {t.clear}
          </button>
          <button
            onClick={handleRangeConfirm}
            disabled={tempRangeValue.length !== 2}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:bg-gray-300"
            type="button"
          >
            {t.ok}
          </button>
        </div>
      )}
    </div>
  );
};
