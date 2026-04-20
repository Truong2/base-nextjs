import { parseDate } from "~/utils/date";
import { cn } from "~/utils/utils";

const Date = ({
  value,
  format,
  defaultValue = "--",
  className,
}: {
  value?: string | null;
  format?: string;
  defaultValue?: string;
  className?: string;
}) => (
  <p className={cn(className)}>
    {!value?.toString() ? defaultValue : parseDate(value, format)}
  </p>
);

export { Date };
