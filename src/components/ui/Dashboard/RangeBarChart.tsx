import { format, parseISO } from "date-fns";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useId, useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Label,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { localizedNumber } from "~/utils/number";

const CustomSymbol = (props: any) => {
  const { cx, cy, fill, payload, dataKey, r } = props;

  const value = payload[dataKey];

  if (value === null) {
    return <></>;
  }

  return (
    <circle
      cx={Math.round(cx)}
      cy={Math.round(cy)}
      r={r}
      fill={fill}
      stroke="#fff"
      strokeWidth={1}
    />
  );
};

export interface RangeBarData {
  name: string;
  dailyHigh: number;
  dailyLow: number;
  calendarDate: string;
}

export interface GradientColors {
  start: string;
  end: string;
}

interface RangeBarChartProps {
  data: RangeBarData[];
  summary?: {
    highest: number;
    lowest: number;
  };
  height?: number;
  colors?: {
    high?: GradientColors | string;
    low?: GradientColors | string;
    range?: GradientColors | string;
  };
  barSize?: number;
  showLegend?: boolean;
  showSummary?: boolean;
}

export const RangeBarChart: React.FC<RangeBarChartProps> = ({
  data,
  height = 140,
  summary,
  colors = {
    high: "#027AEE",
    low: "#7E8387",
    range: { start: "#0081FE", end: "#7E8387" },
  },
  barSize = 6,
  showLegend = false,
  showSummary = true,
}) => {
  const chartId = useId();
  const t = useTranslations();
  const isDataEmpty = isEmpty(data);

  const chartData = useMemo(() => {
    if (!isDataEmpty) {
      return data.map(item => {
        const isZeroValue =
          (item.dailyHigh ?? 0) === 0 && (item.dailyLow ?? 0) === 0;

        return {
          ...item,
          dailyHigh: isZeroValue ? null : item.dailyHigh,
          dailyLow: isZeroValue ? null : item.dailyLow,

          dailyLowBase: item.dailyLow,
          dailyRangeHeight: item.dailyHigh - item.dailyLow,
        };
      });
    }

    const defaultWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return defaultWeekDays.map(day => ({
      name: day,
      dailyHigh: 0,
      dailyLow: 0,
      calendarDate: "",
      dailyLowBase: 0,
      dailyRangeHeight: 0,
    }));
  }, [data, isDataEmpty]);

  const yAxisFormatter = (value: number) => {
    if (value === 0) return "0";
    return localizedNumber(value, "en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    });
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={chartData}
          className="no-chart-outline"
          margin={{ top: 10, right: 14, left: -22, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              dy: 4,
              fill: "#7E8387",
              fontSize: 10,
              fontWeight: "bold",
            }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{
              dx: -4,
              dy: -4,
              fill: "#37383C",
              fontSize: 10,
              fontWeight: "bold",
            }}
            tickFormatter={yAxisFormatter}
          />
          {isDataEmpty ? (
            <Label
              value={t("common.no_data")}
              position="center"
              className="content-12 text-content-neutral-700"
            />
          ) : (
            <>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0]?.payload;
                    if (!dataPoint) return null;

                    return (
                      <div className="flex flex-col rounded-lg bg-background-tooltip p-2 shadow-md">
                        <p className="subtitle-10 text-title-neutral-900">
                          {dataPoint.calendarDate &&
                            format(
                              parseISO(dataPoint.calendarDate),
                              "yyyy/MM/dd"
                            )}
                        </p>
                        <p className="content-10 flex text-content-neutral-700">
                          <span>{t("dashboard.health.highest")}:</span>
                          <span className="ml-1">{dataPoint.dailyHigh}</span>
                        </p>
                        <p className="content-10 flex text-content-neutral-700">
                          <span>{t("dashboard.health.lowest")}:</span>
                          <span className="ml-1">{dataPoint.dailyLow}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <defs>
                {/* Range Bar Gradient */}
                {typeof colors.range !== "string" && colors.range && (
                  <linearGradient
                    id={`rangeGradient-${chartId}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={colors.range.start} />
                    <stop offset="100%" stopColor={colors.range.end} />
                  </linearGradient>
                )}
                {/* High Point Gradient */}
                {typeof colors.high !== "string" && colors.high && (
                  <linearGradient
                    id={`highGradient-${chartId}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={colors.high.start} />
                    <stop offset="100%" stopColor={colors.high.end} />
                  </linearGradient>
                )}
                {/* Low Point Gradient */}
                {typeof colors.low !== "string" && colors.low && (
                  <linearGradient
                    id={`lowGradient-${chartId}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={colors.low.start} />
                    <stop offset="100%" stopColor={colors.low.end} />
                  </linearGradient>
                )}
              </defs>

              <Bar
                dataKey="dailyLowBase"
                stackId="range" // Stack with the visible range bar
                fill="transparent" // Make it invisible
                isAnimationActive={false} // Disable animation for this base bar
                barSize={barSize}
              />

              <Bar
                dataKey="dailyRangeHeight"
                stackId="range"
                fill={
                  typeof colors.range === "string"
                    ? colors.range
                    : `url(#rangeGradient-${chartId})`
                }
                barSize={barSize}
              />

              {/* Daily High points (blue circles) */}
              <Scatter
                dataKey="dailyHigh"
                fill={
                  typeof colors.high === "string"
                    ? colors.high
                    : `url(#highGradient-${chartId})`
                }
                name={t("dashboard.health.daily_high")}
                shape={(props: any) => (
                  <CustomSymbol
                    {...props}
                    r={barSize / 2}
                    dataKey="dailyHigh"
                  />
                )}
              />

              {/* Daily Low points (black circles) */}
              <Scatter
                dataKey="dailyLow"
                fill={
                  typeof colors.low === "string"
                    ? colors.low
                    : `url(#lowGradient-${chartId})`
                }
                name={t("dashboard.health.daily_low")}
                shape={(props: any) => (
                  <CustomSymbol {...props} r={barSize / 2} dataKey="dailyLow" />
                )}
              />
            </>
          )}
        </ComposedChart>
      </ResponsiveContainer>

      {showLegend && (
        <div className="mt-2 flex h-9 w-full items-center justify-evenly rounded-xl border">
          <div className="flex items-center space-x-1">
            <div className="size-2 rounded-[2px] bg-[#027AEE]"></div>
            <span className="content-10 text-content-neutral-800">
              {t("dashboard.health.daily_high")}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="size-2 rounded-[2px] bg-[#7E8387]"></div>
            <span className="content-10 text-content-neutral-800">
              {t("dashboard.health.daily_low")}
            </span>
          </div>
        </div>
      )}

      {showSummary && !isDataEmpty && (
        <div className="mt-2 flex h-[45px] items-center justify-evenly">
          <div className="flex flex-col items-center space-x-1">
            <span className="content-10 text-content-neutral-700">
              {t("dashboard.health.daily_high")}
            </span>
            <p className="subtitle-20">{summary?.highest}</p>
          </div>
          <div className="flex flex-col items-center space-x-1">
            <span className="content-10 text-content-neutral-700">
              {t("dashboard.health.daily_low")}
            </span>
            <p className="subtitle-20">{summary?.lowest}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RangeBarChart;
