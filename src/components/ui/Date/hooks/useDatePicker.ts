import { useState, useRef, useEffect } from "react";
import { DatePickerProps } from "../types";
import { ensureTimeFormat, formatDate, parseDate } from "../utils";

export const useDatePicker = ({
  value,
  onChange = () => {},
  format = "DD/MM/YYYY",
  rangeMode = false,
  showTime = false,
  onClear = () => {},
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showAbove, setShowAbove] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const effectiveFormat = ensureTimeFormat(format, showTime);

  useEffect(() => {
    if (rangeMode && Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        setInputValue(
          `${formatDate(start, effectiveFormat)} - ${formatDate(end, effectiveFormat)}`
        );
      } else if (start) {
        setInputValue(formatDate(start, effectiveFormat));
      } else {
        setInputValue("");
      }
    } else if (value && !Array.isArray(value)) {
      setInputValue(formatDate(value, effectiveFormat));
    } else {
      setInputValue("");
    }
  }, [value, effectiveFormat, rangeMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if there's enough space below to show calendar
  const checkPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const calendarHeight = 400; // Approximate calendar height
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Show above if not enough space below but enough space above
      setShowAbove(spaceBelow < calendarHeight && spaceAbove > calendarHeight);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkPosition();
      // Recheck on window resize
      window.addEventListener("resize", checkPosition);
      return () => window.removeEventListener("resize", checkPosition);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (rangeMode) {
      // Handle range input parsing
      const parts = val.split(" - ");
      if (parts.length === 2) {
        const start = parseDate(parts[0] || "", effectiveFormat);
        const end = parseDate(parts[1] || "", effectiveFormat);
        if (start && end) {
          onChange([start, end]);
        }
      }
    } else {
      const parsed = parseDate(val, effectiveFormat);
      if (parsed) {
        onChange(parsed);
      }
    }
  };

  const handleDateChange = (date: Date) => {
    onChange(date);
    if (!showTime && !rangeMode) {
      setIsOpen(false);
    }
  };

  const handleRangeChange = (range: Date[]) => {
    onChange(range);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue("");
    onChange(rangeMode ? [] : null);
    onClear(e);
  };

  return {
    isOpen,
    setIsOpen,
    inputValue,
    showAbove,
    containerRef,
    effectiveFormat,
    handleInputChange,
    handleDateChange,
    handleRangeChange,
    handleClear,
  };
};
