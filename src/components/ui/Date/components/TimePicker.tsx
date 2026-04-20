import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { TimePickerProps } from "../types";

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [time, setTime] = useState({
    hours: value ? value.getHours() : 0,
    minutes: value ? value.getMinutes() : 0,
    seconds: value ? value.getSeconds() : 0,
  });

  useEffect(() => {
    if (value) {
      setTime({
        hours: value.getHours(),
        minutes: value.getMinutes(),
        seconds: value.getSeconds(),
      });
    }
  }, [value]);

  const handleTimeChange = (
    type: "hours" | "minutes" | "seconds",
    val: string
  ) => {
    const newTime = { ...time, [type]: parseInt(val) };
    setTime(newTime);

    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(newTime.hours, newTime.minutes, newTime.seconds, 0);
    onChange(newDate);
  };

  return (
    <div className="flex items-center space-x-2 border-t p-3">
      <Clock className="h-4 w-4 text-gray-400" />
      <select
        value={time.hours}
        onChange={e => handleTimeChange("hours", e.target.value)}
        className="rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        value={time.minutes}
        onChange={e => handleTimeChange("minutes", e.target.value)}
        className="rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <span>:</span>
      <select
        value={time.seconds}
        onChange={e => handleTimeChange("seconds", e.target.value)}
        className="rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>
  );
};
