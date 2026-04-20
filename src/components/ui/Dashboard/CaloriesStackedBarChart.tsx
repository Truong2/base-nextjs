import { format, parseISO } from "date-fns";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  //   Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { localizedNumber } from "~/utils/number";

export interface CaloriesStackedBarData {
  name: string;
  calendarDate: string;
  [key: string]: string | number;
}

interface CaloriesStackedBarChartProps {
  data: CaloriesStackedBarData[];
  keys: string[];
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showLegendDetail?: boolean;
}

export const CaloriesStackedBarChart: React.FC<
  CaloriesStackedBarChartProps
> = ({
  data,
  keys,
  colors = ["#3b82f6", "#ef4444"],
  height = 140,
  showGrid = true,
  showLegend = true,
  showLegendDetail = false,
}) => {
  const t = useTranslations();
  const isDataEmpty = isEmpty(data);

  const chartData = useMemo(() => {
    if (!isDataEmpty) {
      return data;
    }

    const defaultWeekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return defaultWeekDays.map(day => {
      const placeholderItem: CaloriesStackedBarData = {
        name: day,
        calendarDate: "",
      };
      keys.forEach(key => {
        placeholderItem[key] = 0;
      });
      return placeholderItem;
    });
  }, [data, isDataEmpty, keys]);

  const defaultYAxisDomain = [0, 1000];
  const defaultYAxisTicks = [0, 250, 500, 750, 1000];

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
          margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
          className="no-chart-outline"
          barCategoryGap={8}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
          )}
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

          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload as CaloriesStackedBarData;
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value || 0),
                  0
                );

                return (
                  <div className="flex flex-col rounded-lg bg-background-tooltip p-2 shadow-md">
                    <p className="subtitle-10 text-title-neutral-900">
                      {dataPoint.calendarDate &&
                        format(parseISO(dataPoint.calendarDate), "yyyy/MM/dd")}
                    </p>
                    <p className="content-10 text-content-neutral-700">
                      <span className="mr-1">{t("common.total")}: </span>
                      <span>{total.toLocaleString()}</span>
                    </p>
                    <>
                      {payload.map(entry => (
                        <div
                          key={`item-${entry.dataKey}`}
                          className="content-10 flex items-center gap-1 text-content-neutral-700"
                        >
                          <span>{entry.name}: </span>
                          <span>{Number(entry.value).toLocaleString()}</span>
                        </div>
                      ))}
                    </>
                  </div>
                );
              }

              return null;
            }}
          />

          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[index % colors.length]}
            />
          ))}

          {isDataEmpty && (
            <Label
              value={t("common.no_data")}
              dx={-30}
              className="content-12 text-content-neutral-700"
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      {showLegend && !isDataEmpty && (
        <div className="mt-2 flex h-[45px] items-center justify-evenly">
          {keys.map((key, index) => (
            <div key={key} className="flex flex-col items-center space-x-2">
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="content-10 text-content-neutral-800">{key}</span>
            </div>
          ))}
        </div>
      )}

      {showLegendDetail && (
        <div className="flex justify-around rounded-lg border border-neutral-200 px-4 py-2">
          {keys.map((key, index) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="content-10 text-content-neutral-800">{key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
