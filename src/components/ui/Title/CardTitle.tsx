import { cn } from "~/utils/utils";

interface CardTitleProps {
  title?: string;
  className?: string;
  showUnderline?: boolean;
}

export const CardTitle = ({
  title,
  className,
  showUnderline,
}: CardTitleProps) => {
  return (
    <div className={cn("px-2 @container", className)}>
      <div
        className="font-albra text-secondary text-[28px] leading-tight"
        style={{ whiteSpace: "nowrap", display: "inline-block" }}
      >
        {title}
      </div>
      {showUnderline && (
        <div
          className={cn("bg-orange mt-6 hidden h-[2px] w-[50px] @2xl:block")}
        ></div>
      )}
    </div>
  );
};
