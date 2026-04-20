import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React from "react";
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

export interface StackedBarData {
  name: string;
  [key: string]: string | number;
}

interface DashboardStackedBarProps {
  data: StackedBarData[];
  keys: string[];
  colors?: string[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  total?: number;
  unitTotal?: string;
  showTotalInTooltip?: boolean;
}

export const DashboardStackedBar: React.FC<DashboardStackedBarProps> = ({
  data,
  keys,
  colors = ["#0081FE", "#E31C5B"],
  height = 140,
  showGrid = true,
  showLegend = true,
  showTotalInTooltip = false,
  total,
  unitTotal,
}) => {
  const t = useTranslations();

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
          data={data}
          margin={{ top: 0, right: 15, left: -22, bottom: 0 }}
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
            axisLine={false}
            tickLine={false}
            tick={{
              dy: 5,
              fill: "#7E8387",
              fontSize: 10,
              fontWeight: "bold",
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={yAxisFormatter}
            tick={{
              dx: -2,
              dy: -4,
              fill: "#7E8387",
              fontSize: 10,
              fontWeight: "bold",
            }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const total = payload.reduce(
                  (sum, entry) => sum + (entry.value || 0),
                  0
                );

                return (
                  <div className="flex flex-col gap-1 rounded-lg border bg-white p-1 text-sm shadow-lg">
                    <p className="title-14">{label}</p>
                    {showTotalInTooltip && (
                      <p>
                        <span className="content-12 mr-2 text-content-neutral-800">
                          {t("common.total")} :
                        </span>
                        <span className="title-12">
                          {total.toLocaleString()}
                        </span>
                      </p>
                    )}
                    <>
                      {payload.map(entry => (
                        <div
                          key={`item-${entry.dataKey}`}
                          className="flex items-center gap-1"
                        >
                          <span className="content-12 text-content-neutral-800">
                            {entry.name}:
                          </span>
                          <span className="title-12">
                            {Number(entry.value).toLocaleString()}
                          </span>
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

          {isEmpty(data) && (
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

      {!!total && (
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
