import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { formatDate } from "./utils";

const meta: Meta<typeof DatePicker> = {
  title: "UI/Date/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    locale: {
      control: { type: "select" },
      options: ["en"],
    },
    format: {
      control: { type: "text" },
    },
    showTime: {
      control: { type: "boolean" },
    },
    rangeMode: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    weekMode: {
      control: { type: "boolean" },
      description:
        "Enable week selection mode - clicking a day selects the entire week",
    },
    disabledDate: {
      description: "Function to determine if a date should be disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic DatePicker
export const Default: Story = {
  args: {
    placeholder: "Select a date",
  },
};

// DatePicker with time
export const WithTime: Story = {
  args: {
    showTime: true,
    format: "MM/DD/YYYY HH:mm",
    placeholder: "Select date and time",
  },
};

// DatePicker with custom format
export const CustomFormat: Story = {
  args: {
    format: "DD/MM/YYYY",
    placeholder: "Select date (DD/MM/YYYY)",
  },
};

// DatePicker in range mode
export const RangeMode: Story = {
  args: {
    rangeMode: true,
    placeholder: "Select date range",
  },
};

// Disabled DatePicker
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled date picker",
  },
};

// DatePicker with initial value
export const WithInitialValue: Story = {
  args: {
    value: new Date("2024-01-15"),
    placeholder: "Date with initial value",
  },
};

// Interactive DatePicker with state management
export const Interactive: Story = {
  render: () => {
    const InteractiveDatePicker = () => {
      const [date, setDate] = useState<Date | null>(null);

      const handleChange = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setDate(value);
        } else {
          setDate(null);
        }
      };

      return (
        <div className="space-y-4">
          <DatePicker
            value={date}
            onChange={handleChange}
            placeholder="Select a date"
          />
          <div className="text-sm text-gray-600">
            Selected date: {date ? date.toLocaleDateString() : "None"}
          </div>
        </div>
      );
    };

    return <InteractiveDatePicker />;
  },
};

// Interactive Range DatePicker
export const InteractiveRange: Story = {
  render: () => {
    const InteractiveRangePicker = () => {
      const [dateRange, setDateRange] = useState<Date[]>([]);

      const handleChange = (value: Date | Date[] | null) => {
        if (Array.isArray(value)) {
          setDateRange(value);
        } else {
          setDateRange([]);
        }
      };

      return (
        <div className="space-y-4">
          <DatePicker
            value={dateRange}
            onChange={handleChange}
            rangeMode={true}
            placeholder="Select date range"
          />
          <div className="text-sm text-gray-600">
            Selected range:{" "}
            {dateRange.length === 2
              ? `${dateRange[0]?.toLocaleDateString()} - ${dateRange[1]?.toLocaleDateString()}`
              : "None"}
          </div>
        </div>
      );
    };

    return <InteractiveRangePicker />;
  },
};

// Interactive DatePicker with time
export const InteractiveWithTime: Story = {
  render: () => {
    const InteractiveTimePicker = () => {
      const [dateTime, setDateTime] = useState<Date | null>(null);

      const handleChange = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setDateTime(value);
        } else {
          setDateTime(null);
        }
      };

      return (
        <div className="space-y-4">
          <DatePicker
            value={dateTime}
            onChange={handleChange}
            showTime={true}
            format="MM/DD/YYYY HH:mm"
            placeholder="Select date and time"
          />
          <div className="text-sm text-gray-600">
            Selected date/time: {dateTime ? dateTime.toLocaleString() : "None"}
          </div>
        </div>
      );
    };

    return <InteractiveTimePicker />;
  },
};

// Multiple DatePickers example
export const MultipleExamples: Story = {
  render: () => {
    const MultipleDatePickers = () => {
      const [date1, setDate1] = useState<Date | null>(null);
      const [date2, setDate2] = useState<Date | null>(null);
      const [dateRange, setDateRange] = useState<Date[]>([]);

      const handleDate1Change = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setDate1(value);
        } else {
          setDate1(null);
        }
      };

      const handleDate2Change = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setDate2(value);
        } else {
          setDate2(null);
        }
      };

      const handleRangeChange = (value: Date | Date[] | null) => {
        if (Array.isArray(value)) {
          setDateRange(value);
        } else {
          setDateRange([]);
        }
      };

      return (
        <div className="max-w-md space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Basic Date Picker
            </label>
            <DatePicker
              value={date1}
              onChange={handleDate1Change}
              placeholder="Select a date"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date Picker with Time
            </label>
            <DatePicker
              value={date2}
              onChange={handleDate2Change}
              showTime={true}
              format="MM/DD/YYYY HH:mm"
              placeholder="Select date and time"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Date Range Picker
            </label>
            <DatePicker
              value={dateRange}
              onChange={handleRangeChange}
              rangeMode={true}
              placeholder="Select date range"
            />
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div>Date 1: {date1 ? date1.toLocaleDateString() : "None"}</div>
            <div>Date 2: {date2 ? date2.toLocaleString() : "None"}</div>
            <div>
              Range:{" "}
              {dateRange.length === 2
                ? `${dateRange[0]?.toLocaleDateString()} - ${dateRange[1]?.toLocaleDateString()}`
                : "None"}
            </div>
          </div>
        </div>
      );
    };

    return <MultipleDatePickers />;
  },
};

// Week Selection DatePicker
export const WeekSelection: Story = {
  render: () => {
    const WeekSelectionPicker = () => {
      const [selectedWeek, setSelectedWeek] = useState<Date | null>(null);

      const handleWeekChange = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setSelectedWeek(value);
        } else {
          setSelectedWeek(null);
        }
      };

      const getWeekRange = (date: Date) => {
        const weekStart = new Date(date);
        weekStart.setDate(weekStart.getDate());

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return { weekStart, weekEnd };
      };

      return (
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Week Selection Mode
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Click on any day to select the entire week (Monday to Sunday) -
              Week display starts with Sunday
            </p>
            <DatePicker
              value={selectedWeek}
              onChange={handleWeekChange}
              weekMode={true}
              placeholder="Select a week"
            />
          </div>

          {selectedWeek && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Selected Week:</h4>
              <div className="text-sm text-gray-600">
                {(() => {
                  const { weekStart, weekEnd } = getWeekRange(selectedWeek);
                  return `${formatDate(weekStart, "DD/MM/YYYY")} - ${formatDate(weekEnd, "DD/MM/YYYY")}`;
                })()}
              </div>
            </div>
          )}
        </div>
      );
    };

    return <WeekSelectionPicker />;
  },
};

// DatePicker with Disabled Dates
export const WithDisabledDates: Story = {
  render: () => {
    const DisabledDatesPicker = () => {
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);

      const handleDateChange = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setSelectedDate(value);
        } else {
          setSelectedDate(null);
        }
      };

      // Disable weekends (Saturday and Sunday) - Note: Week now starts on Monday
      const disableWeekends = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
      };

      // Disable past dates
      const disablePastDates = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      };

      // Disable specific dates (e.g., holidays)
      const disableSpecificDates = (date: Date) => {
        const holidays = [
          new Date(2024, 0, 1), // New Year's Day
          new Date(2024, 6, 4), // Independence Day
          new Date(2024, 11, 25), // Christmas
        ];

        return holidays.some(
          holiday =>
            holiday.getDate() === date.getDate() &&
            holiday.getMonth() === date.getMonth() &&
            holiday.getFullYear() === date.getFullYear()
        );
      };

      // Combine all disabled date conditions
      const isDateDisabled = (date: Date) => {
        return (
          disableWeekends(date) ||
          disablePastDates(date) ||
          disableSpecificDates(date)
        );
      };

      return (
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Disabled Dates Examples
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              This picker disables weekends, past dates, and specific holidays
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-900">
                Weekend Disabled
              </h4>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disabledDate={disableWeekends}
                placeholder="Weekends disabled"
              />
            </div>

            <div>
              <h4 className="mb-2 font-medium text-gray-900">
                Past Dates Disabled
              </h4>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disabledDate={disablePastDates}
                placeholder="Past dates disabled"
              />
            </div>

            <div>
              <h4 className="mb-2 font-medium text-gray-900">
                Holidays Disabled
              </h4>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disabledDate={disableSpecificDates}
                placeholder="Holidays disabled"
              />
            </div>

            <div>
              <h4 className="mb-2 font-medium text-gray-900">All Conditions</h4>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                disabledDate={isDateDisabled}
                placeholder="All conditions applied"
              />
            </div>
          </div>

          {selectedDate && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">Selected Date:</h4>
              <div className="text-sm text-gray-600">
                {selectedDate.toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      );
    };

    return <DisabledDatesPicker />;
  },
};

// Comprehensive Week Selection with Disabled Dates
export const WeekSelectionWithDisabledDates: Story = {
  render: () => {
    const ComprehensiveWeekPicker = () => {
      const [selectedWeek, setSelectedWeek] = useState<Date | null>(null);

      const handleWeekChange = (value: Date | Date[] | null) => {
        if (value && !Array.isArray(value)) {
          setSelectedWeek(value);
        } else {
          setSelectedWeek(null);
        }
      };

      const getWeekRange = (date: Date) => {
        const weekStart = new Date(date);
        const day = weekStart.getDay();
        weekStart.setDate(weekStart.getDate() - day);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return { weekStart, weekEnd };
      };

      // Disable weekends and past dates for week selection
      const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Disable past dates
        if (date < today) return true;

        // Disable weekends
        const day = date.getDay();
        if (day === 0 || day === 6) return true;

        // Disable specific business holidays
        const holidays = [
          new Date(2024, 0, 1), // New Year's Day
          new Date(2024, 6, 4), // Independence Day
          new Date(2024, 11, 25), // Christmas
        ];

        return holidays.some(
          holiday =>
            holiday.getDate() === date.getDate() &&
            holiday.getMonth() === date.getMonth() &&
            holiday.getFullYear() === date.getFullYear()
        );
      };

      return (
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Week Selection with Business Rules
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              This picker combines week selection with business logic:
            </p>
            <ul className="mb-4 list-inside list-disc text-sm text-gray-600">
              <li>
                Click any day to select the entire week (Monday to Sunday) -
                Week display starts with Sunday
              </li>
              <li>Weekends are disabled</li>
              <li>Past dates are disabled</li>
              <li>Business holidays are disabled</li>
            </ul>
          </div>

          <DatePicker
            value={selectedWeek}
            onChange={handleWeekChange}
            weekMode={true}
            disabledDate={isDateDisabled}
            placeholder="Select a business week"
          />

          {selectedWeek && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 font-medium text-gray-900">
                Selected Business Week:
              </h4>
              <div className="text-sm text-gray-600">
                {(() => {
                  const { weekStart, weekEnd } = getWeekRange(selectedWeek);
                  return `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
                })()}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Note: Only business days (Monday-Friday) are selectable
              </div>
            </div>
          )}
        </div>
      );
    };

    return <ComprehensiveWeekPicker />;
  },
};
