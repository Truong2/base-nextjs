import { format, parseISO } from "date-fns";
import { isEmpty, isNil } from "lodash";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { localizedNumber } from "~/utils/number";

export interface GoalChartData {
  name: string;
  value: number; // actual value
  goal: number; // goal value
  calendarDate: string;
}

interface GoalStackedBarChartProps {
  data: GoalChartData[];
  labels: {
    achieved: string;
    remaining: string;
    exceeded: string;
  };
  colors?: {
    achieved: string;
    remaining: string;
    exceeded: string;
  };
  height?: number;
  showLegend?: boolean;
  total?: number;
  unitTotal?: string;
  showLegendDetail?: boolean;
  showTotalLegend?: boolean;
}

export const GoalStackedBarChart: React.FC<GoalStackedBarChartProps> = ({
  data,
  colors = {
    achieved: "#0281FE",
    remaining: "#ECEEF4",
    exceeded: "#0BB964",
  },
  labels,
  height = 140,
  showLegend = false,
  total,
  unitTotal,
  showTotalLegend = true,
  showLegendDetail = false,
}) => {
  const t = useTranslations();
  const isDataEmpty = isEmpty(data);
  const defaultYAxisDomain = [0, 10000];
  const defaultYAxisTicks = [0, 2500, 5000, 7500, 10000];

  const chartData = useMemo(() => {
    if (!isDataEmpty) {
      return data.map(item => {
        const goalMet = item.value >= item.goal;
        return {
          ...item,
          stepsExceeded: goalMet ? item.value : 0,
          stepsAchieved: goalMet ? 0 : item.value,
          stepsRemaining: goalMet ? 0 : Math.max(0, item.goal - item.value),
        };
      });
    }

    const defaultWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return defaultWeekDays.map(day => ({
      name: day,
      value: 0,
      goal: 0,
      calendarDate: "",
      stepsExceeded: 0,
      stepsAchieved: 0,
      stepsRemaining: 0,
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
    <div className="w-full bg-white">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          barCategoryGap={8}
          className="no-chart-outline"
          margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            type="category"
            tick={{
              dy: 5,
              fill: "#7E8387",
              fontSize: 10,
              fontWeight: "bold",
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="number"
            tick={{
              dx: -15,
              dy: -4,
              fill: "#7E8387",
              fontSize: 10,
              fontWeight: "bold",
            }}
            axisLine={false}
            tickLine={false}
            domain={isDataEmpty ? defaultYAxisDomain : undefined}
            ticks={isDataEmpty ? defaultYAxisTicks : undefined}
            tickFormatter={yAxisFormatter}
          />

          {!isDataEmpty && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload as GoalChartData;

                  return (
                    <div className="flex flex-col rounded-lg bg-background-tooltip p-2 shadow-md">
                      <p className="subtitle-10 text-title-neutral-900">
                        {dataPoint.calendarDate &&
                          format(
                            parseISO(dataPoint.calendarDate),
                            "yyyy/MM/dd"
                          )}
                      </p>
                      <div className="content-10 text-content-neutral-700">
                        <p className="flex">
                          <span>{labels.achieved}: </span>
                          <span className="ml-1">
                            {!isNil(dataPoint?.value)
                              ? dataPoint?.value?.toLocaleString()
                              : "-"}
                          </span>
                        </p>
                        <p className="flex">
                          <span>{labels.remaining}: </span>
                          <span className="ml-1">
                            {!isNil(dataPoint?.goal)
                              ? dataPoint?.goal?.toLocaleString()
                              : "-"}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          )}

          <Bar
            dataKey="stepsExceeded"
            stackId="a"
            fill={colors.exceeded}
            name={labels.exceeded}
          />
          <Bar
            dataKey="stepsAchieved"
            stackId="a"
            fill={colors.achieved}
            name={labels.achieved}
          />
          <Bar
            dataKey="stepsRemaining"
            stackId="a"
            fill={colors.remaining}
            name={labels.remaining}
          />

          {isDataEmpty && (
            <Label
              value={t("common.no_data")}
              position="center"
              className="content-12 text-content-neutral-700"
            />
          )}
        </BarChart>
      </ResponsiveContainer>
      {showLegend && (
        <div className="mt-2 flex h-[45px] items-center justify-evenly">
          {Object.entries(labels).map(([key, value], index) => (
            <div key={index} className="flex flex-col items-center space-x-2">
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{
                  backgroundColor: colors?.[key as keyof typeof colors],
                }}
              />
              <span className="content-10 text-content-neutral-800">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {showLegendDetail && (
        <div className="flex justify-around rounded-lg border border-neutral-200 px-4 py-2">
          {Object.entries(labels).map(([key, value], index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{
                  backgroundColor: colors?.[key as keyof typeof colors],
                }}
              />
              <span className="content-10 text-content-neutral-800">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {!!total && showTotalLegend && (
        <div className="mt-2 flex flex-col items-center">
          <p className="content-10 text-content-neutral-700">
            {t("common.total")}
          </p>
          <div className="flex items-center gap-1">
            <span className="subtitle-20 text-title-neutral-900">
              {Number(total).toLocaleString()}
            </span>
            {unitTotal && (
              <span className="content-12 text-content-neutral-700">
                {unitTotal}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
