"use client";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

interface Segment {
  name: string;
  color: string;
  value: number;
}

interface MultiColorProgressBarProps {
  segments: Segment[];
  totalValue?: number;
  height?: string;
  rounded?: string;
  showLegend?: boolean;
}

const MultiColorProgressBar: React.FC<MultiColorProgressBarProps> = ({
  segments,
  totalValue,
  height = "h-[6px]",
  rounded = "rounded-[8px]",
  showLegend = true,
}) => {
  const t = useTranslations();

  const calculatedTotal = useMemo(() => {
    if (totalValue !== undefined) {
      return totalValue;
    }
    return segments.reduce((acc, segment) => acc + segment.value, 0);
  }, [segments, totalValue]);

  if (calculatedTotal === 0 || segments.length === 0) {
    return (
      <div className="flex min-h-10 items-center">
        <div
          className={`w-full ${height} ${rounded} flex items-center justify-center bg-gray-200`}
        >
          <span className="content-12 text-content-neutral-700">
            {t("common.no_data")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`w-full ${height} ${rounded} mb-3 flex gap-1 overflow-hidden`}
        role="progressbar"
        aria-valuenow={calculatedTotal}
        aria-valuemin={0}
        aria-valuemax={calculatedTotal}
      >
        {segments.map((segment, index) => {
          const widthPercentage = (segment.value / calculatedTotal) * 100;

          return (
            <div
              key={index}
              className={`${height} ${rounded}`}
              style={{
                width: `${widthPercentage}%`,
                background: `${segment.color}`,
              }}
              title={`${segment.value} (${widthPercentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {showLegend && (
        <div className="flex items-center justify-between rounded-md border border-line-neutral-400 px-[10px] py-1">
          {segments?.map((segment, index) => (
            <div key={index} className="flex items-center gap-[2px]">
              <div
                className="size-2 rounded-sm"
                style={{ background: `${segment.color}` }}
              ></div>
              <span className="content-10 text-content-neutral-800">
                {segment?.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiColorProgressBar;
