// Utility functions for DatePicker
// Ensure format includes seconds when showTime = true
export const ensureTimeFormat = (
  fmt: string,
  includeSeconds: boolean
): string => {
  if (!includeSeconds) return fmt;
  if (!fmt.includes("HH")) return (fmt + " HH:mm:ss").trim();
  // If HH:mm exists without :ss, add :ss
  return fmt.replace(/HH:mm(?!:ss)/, "HH:mm:ss");
};

export const formatDate = (
  date: Date | null,
  format: string = "DD/MM/YYYY"
): string => {
  if (!date) return "";

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", String(year))
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

export const parseDate = (
  dateString: string,
  format: string = "DD/MM/YYYY"
): Date | null => {
  if (!dateString) return null;

  try {
    // Handle different format patterns
    if (format.includes("DD/MM/YYYY")) {
      const parts = dateString.split(/[\/\s:]/);
      if (parts.length >= 3) {
        const day = parseInt(parts[0] || "0");
        const month = parseInt(parts[1] || "0") - 1;
        const year = parseInt(parts[2] || "0");
        const hours = parts[3] ? parseInt(parts[3]) : 0;
        const minutes = parts[4] ? parseInt(parts[4]) : 0;
        const seconds = parts[5] ? parseInt(parts[5]) : 0;
        return new Date(year, month, day, hours, minutes, seconds);
      }
    } else if (format.includes("MM/DD/YYYY")) {
      const parts = dateString.split(/[\/\s:]/);
      if (parts.length >= 3) {
        const month = parseInt(parts[0] || "0") - 1;
        const day = parseInt(parts[1] || "0");
        const year = parseInt(parts[2] || "0");
        const hours = parts[3] ? parseInt(parts[3]) : 0;
        const minutes = parts[4] ? parseInt(parts[4]) : 0;
        const seconds = parts[5] ? parseInt(parts[5]) : 0;
        return new Date(year, month, day, hours, minutes, seconds);
      }
    }
    return new Date(dateString);
  } catch {
    return null;
  }
};

// Helper function to get week start (Monday) for a given date
export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  const daysToSubtract = day === 0 ? 6 : day - 1;
  d.setDate(d.getDate() - daysToSubtract);
  return d;
};

// Helper function to get week end (Sunday) for a given date
export const getWeekEnd = (date: Date): Date => {
  // Get the week start first, then add 6 days to get to Sunday
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return weekEnd;
};
