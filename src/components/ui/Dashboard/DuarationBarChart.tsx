import { format, parseISO } from "date-fns";
import { isEmpty } from "lodash";
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
import { calculateTime } from "~/utils/date";
import { cn } from "~/utils/utils";

export interface DurationBarChartData {
  name: string;
  calendarDate: string;
  [key: string]: string | number;
}

interface DurationBarChartProps {
  data: DurationBarChartData[];
  keys: string[];
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  classNameLegend?: string;
}

export const DurationBarChart: React.FC<DurationBarChartProps> = ({
  data,
  keys,
  colors = ["#3b82f6", "#ef4444"],
  height = 500,
  showLegend = true,
  classNameLegend,
}) => {
  const t = useTranslations();
  const isDataEmpty = isEmpty(data);
  const chartData = useMemo(() => {
    if (!isDataEmpty) {
      return data;
    }

    const defaultXAxisLabels = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];
    return defaultXAxisLabels.map(day => {
      const placeholderItem: DurationBarChartData = {
        name: day,
        calendarDate: "",
      };
      keys.forEach(key => {
        placeholderItem[key] = 0;
      });
      return placeholderItem;
    });
  }, [data, isDataEmpty, keys]);

  const yAxisTickFormatter = (valueInSeconds: number): string => {
    if (valueInSeconds === 0) {
      return "0";
    }
    const hours = valueInSeconds / 3600;
    return `${Math.round(hours)}H`;
  };

  const defaultYAxisDomain = [0, 8 * 3600];
  const defaultYAxisTicks = [0, 2 * 3600, 4 * 3600, 6 * 3600, 8 * 3600];

  return (
    <div className="w-full bg-white">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 15, left: -22, bottom: 0 }}
          className="no-chart-outline"
          barCategoryGap={8}
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
              dx: -2,
              dy: -4,
              fill: "#7E8387",
              fontSize: 10,
              fontWeight: "bold",
            }}
            axisLine={false}
            tickLine={false}
            domain={isDataEmpty ? defaultYAxisDomain : undefined}
            ticks={isDataEmpty ? defaultYAxisTicks : undefined}
            tickFormatter={yAxisTickFormatter}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            }}
            wrapperStyle={{ zIndex: 10 }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload as DurationBarChartData;
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value || 0),
                  0
                );

                const renderValue = () => {
                  if (total === 0) {
                    return (
                      <span>
                        <span>0</span>
                        <span className="ml-[2px]">
                          {t("common.unit_minutes")}
                        </span>
                      </span>
                    );
                  }

                  const { days, hours, minutes } = calculateTime(Number(total));
                  return (
                    <span className="flex">
                      {days > 0 && (
                        <span>
                          <span>{days}</span>
                          <span className="ml-[2px]">
                            {t("common.unit_days")}
                          </span>
                        </span>
                      )}
                      {hours > 0 && (
                        <span>
                          <span>{hours}</span>
                          <span className="ml-[2px]">
                            {t("common.unit_hours")}
                          </span>
                        </span>
                      )}
                      {minutes > 0 && (
                        <span>
                          <span>{minutes}</span>
                          <span className="ml-[2px]">
                            {t("common.unit_minutes")}
                          </span>
                        </span>
                      )}
                    </span>
                  );
                };

                return (
                  <div className="bg-background-tooltip flex flex-col rounded-lg p-2 shadow-md">
                    <p className="subtitle-10 text-title-neutral-900">
                      {dataPoint.calendarDate &&
                        format(parseISO(dataPoint.calendarDate), "yyyy/MM/dd")}
                    </p>
                    <p className="content-10 flex gap-1 text-content-neutral-700">
                      <span>{t("common.total")} :</span>
                      <span>{renderValue()}</span>
                    </p>
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

          {isEmpty(data) && (
            <Label
              value={t("common.no_data")}
              dx={-30}
              className="content-12 text-content-neutral-700"
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      {showLegend && !isDataEmpty && (
        <div
          className={cn(
            "mt-2 flex h-[45px] items-center justify-evenly",
            classNameLegend
          )}
        >
          {keys.map((key, index) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center"
            >
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
