import { GripVertical } from "lucide-react";
import React from "react";
import { cn } from "~/utils/utils";

// Icon component for the card
interface CardIconProps {
  icon: React.ReactNode;
  className?: string;
}

const CardIcon = ({ icon, className }: CardIconProps) => (
  <div className={cn("flex items-center justify-center", className)}>
    {icon}
  </div>
);

// Rank badge component with different color variants
interface RankBadgeProps {
  rank: string;
  variant?: "orange" | "red" | "purple";
  onClick?: () => void;
  className?: string;
}

const RankBadge = ({
  rank,
  variant = "orange",
  onClick,
  className,
}: RankBadgeProps) => {
  const variantStyles = {
    orange: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    red: "bg-red-100 text-red-700 hover:bg-red-200",
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <span>{rank}</span>
      <svg
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

// Data item component
interface DataItemProps {
  label: string;
  value: string;
  unit?: string;
  className?: string;
  isRight?: boolean;
}

const DataItem = ({
  label,
  value,
  unit,
  className,
  isRight,
}: DataItemProps) => (
  <div className={cn("flex flex-col", className)}>
    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <div className={cn("mt-1", isRight && "text-right")}>
      <span className="w-full text-sm font-bold text-gray-900">{value}</span>
      {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
    </div>
  </div>
);

// Main Card component
interface CardProps {
  icon: React.ReactNode;
  title: string;
  rank?: string;
  rankVariant?: "orange" | "red" | "purple";
  onRankClick?: () => void;
  data: Array<{
    label: string;
    value: string;
    unit?: string;
  }>;
  className?: string;
  onClick?: () => void;
  isDragging?: boolean;
  dragRef?: React.Ref<HTMLDivElement>;
  dragControls?: any;
}

const Card = ({
  icon,
  title,
  rank,
  rankVariant = "orange",
  onRankClick,
  data,
  className,
  onClick,
  // New props
  isDragging = false,
  dragRef,
  dragControls,
}: CardProps) => {
  return (
    <div
      ref={dragRef}
      className={cn(
        "w-full rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200",
        onClick && "cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {isDragging && (
            <div
              className={cn(
                "flex h-6 w-6 cursor-grab items-center justify-center rounded text-gray-400 transition-colors hover:text-gray-600 active:cursor-grabbing",
                isDragging && "text-blue-500",
                className
              )}
              onPointerDown={event => dragControls.start(event)}
            >
              <GripVertical className="h-4 w-4" />
            </div>
          )}
          <CardIcon icon={icon} className="h-8 w-8 text-blue-500" />
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        </div>

        {rank && (
          <RankBadge rank={rank} variant={rankVariant} onClick={onRankClick} />
        )}
      </div>

      {/* Divider */}
      <div className="-mx-4 mb-4 border-t border-gray-200" />

      {/* Data Section */}
      <div className="flex justify-between ">
        {data.map((item, index) => (
          <DataItem
            key={index}
            label={item.label}
            value={item.value}
            unit={item.unit}
            isRight={index === data.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export { Card, CardIcon, DataItem, RankBadge };
export default Card;
