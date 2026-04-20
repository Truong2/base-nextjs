"use client";

import { useTranslations } from "next-intl";
import React, { useId, useMemo, type ReactNode } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { localizedNumber } from "~/utils/number";

export interface ChartSegment {
  value: number;
  colors?: [string, string];
}

const DEFAULT_SEGMENT_COLORS: [string, string] = ["#3976E5", "#83AFFF"];

interface CircleProgressChartProps {
  segments: ChartSegment[];
  total: number;
  size?: number;
  backgroundColors?: [string, string];
  gapPercentage?: number;
  customTotalText?: ReactNode;
}

const MIN_VISIBLE_VALUE_PERCENTAGE = 0.06;

const CircleProgressChart: React.FC<CircleProgressChartProps> = ({
  segments,
  total,
  size = 120,
  backgroundColors = ["#EEEEEE", "#EEEEEE"],
  gapPercentage = 0,
  customTotalText,
}) => {
  const t = useTranslations();
  const chartId = useId();

  const { chartData, sumOfValues } = useMemo(() => {
    if (total === 0) {
      return {
        chartData: [{ name: "empty", value: 1, fill: "transparent" }],
        sumOfValues: 0,
      };
    }
    const data: { name: string; value: number; fill: string }[] = [];
    const gapValue = total * gapPercentage;
    const minVisibleValue = total * MIN_VISIBLE_VALUE_PERCENTAGE;
    let currentSum = 0;
    segments.forEach((segment, index) => {
      let displayValue = segment.value;
      if (displayValue > 0 && displayValue < minVisibleValue) {
        displayValue = minVisibleValue;
      }

      data.push({
        name: `segment-${index}`,
        value: displayValue,
        fill: `url(#segmentGradient-${chartId}-${index})`,
      });
      currentSum += displayValue;
      if (index < segments.length - 1) {
        data.push({
          name: `gap-${index}`,
          value: gapValue,
          fill: "transparent",
        });
        currentSum += gapValue;
      }
    });
    const remainingValue = total - currentSum;
    if (remainingValue > 0) {
      data.push({
        name: "remaining",
        value: remainingValue,
        fill: "transparent",
      });
    }
    const totalSegmentValues = segments.reduce((sum, s) => sum + s.value, 0);
    return { chartData: data, sumOfValues: totalSegmentValues };
  }, [segments, total, gapPercentage]);

  return (
    <div
      className="relative m-1 rounded-full bg-[#FAFAFA]"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer>
        <PieChart className="no-chart-outline">
          <defs>
            {segments.map((segment, index) => {
              const segmentColors = segment.colors ?? DEFAULT_SEGMENT_COLORS;

              return (
                <linearGradient
                  key={`gradient-${chartId}-${index}`}
                  id={`segmentGradient-${chartId}-${index}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={segmentColors[0]} />
                  <stop offset="100%" stopColor={segmentColors[1]} />
                </linearGradient>
              );
            })}

            <linearGradient
              id={`backgroundGradient-${chartId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={backgroundColors[0]} />
              <stop offset="100%" stopColor={backgroundColors[1]} />
            </linearGradient>
          </defs>

          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius="72%"
            outerRadius="100%"
            isAnimationActive={false}
            stroke="none"
          >
            <Cell
              style={{ outline: "none" }}
              fill={`url(#backgroundGradient-${chartId})`}
            />
          </Pie>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius="72%"
            outerRadius="100%"
            cornerRadius={15}
            stroke="none"
            paddingAngle={0}
          >
            {chartData.map((entry, index) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${index}`}
                fill={entry.fill}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        {total === 0 ? (
          <div className="content-12 text-content-neutral-700">
            {t("common.no_data")}
          </div>
        ) : (
          <>
            {customTotalText ? (
              customTotalText
            ) : (
              <>
                <span className="text-[16px] font-extrabold text-title-neutral-900">
                  {localizedNumber(sumOfValues)}
                </span>
                <span className="content-10 text-content-neutral-800">
                  {localizedNumber(total)}
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CircleProgressChart;
