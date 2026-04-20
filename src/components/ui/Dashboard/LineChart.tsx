/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ActiveDotProps } from "recharts/types/util/types";

// Interface phổ biến cho line chart data
export interface LineChartData {
  name: string;
  [key: string]: string | number; // Cho phép nhiều series với tên tùy ý
}

// Interface cho line series configuration
export interface LineSeries {
  key: string;
  name: string;
  color: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  showDots?: boolean;
  dotRadius?: number;
  activeDotRadius?: number;
}

interface DashboardLineChartProps {
  data: LineChartData[];
  lines: LineSeries[];
  title?: string;
  height?: number;
  xAxisKey?: string;
  yAxisDomain?: [number, number | string];
  showGrid?: boolean;
  gridColor?: string;
  showLegend?: boolean;
  total?: number;
  unitTotal?: string;
  showTotalInTooltip?: boolean;
}

export const DashboardLineChart: React.FC<DashboardLineChartProps> = ({
  data,
  lines,
  title = "Line Chart",
  height = 140,
  xAxisKey = "name",
  yAxisDomain = [0, "dataMax + 50"],
  showGrid = true,
  gridColor = "#cccc",
  showLegend = true,
  showTotalInTooltip = false,
  total,
  unitTotal,
}) => {
  const t = useTranslations();

  const highestValue = useMemo(() => {
    if (!data || data.length === 0 || lines.length === 0) return -Infinity;

    let maxVal = -Infinity;
    data.forEach(item => {
      lines.forEach(line => {
        const val = item[line.key];
        if (typeof val === "number" && val > maxVal) {
          maxVal = val;
        }
      });
    });
    return maxVal;
  }, [data, lines]);

  return (
    <div className="flex w-full flex-1 flex-col">
      <ResponsiveContainer
        width="100%"
        height={height}
        className="no-chart-outline"
      >
        <RechartsLineChart
          data={data}
          margin={{ top: 0, right: 15, left: -15, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke={gridColor}
            />
          )}

          <XAxis
            dataKey={xAxisKey}
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
            tick={{
              dx: -15,
              dy: -4,
              fill: "#37383C",
              fontSize: 10,
              fontWeight: "bold",
            }}
            domain={yAxisDomain}
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

          {lines.map((lineSeries, index) => (
            <Line
              key={`${lineSeries.key}-${index}`}
              // type="basis"
              dataKey={lineSeries.key}
              stroke={lineSeries.color}
              strokeWidth={lineSeries.strokeWidth || 1}
              strokeDasharray={lineSeries.strokeDasharray}
              dot={
                lineSeries.showDots !== false
                  ? props => {
                      const { key, ...restProps } = props;
                      return (
                        <CustomizedDot
                          key={key}
                          {...restProps}
                          fill={lineSeries.color}
                          r={lineSeries.dotRadius || 4}
                          highestValue={highestValue}
                          highlightColor="#E31C5B"
                        />
                      );
                    }
                  : false
              }
              activeDot={props => {
                const { key, ...restProps } = props;
                return (
                  <CustomizedDot
                    key={props.key}
                    {...restProps}
                    r={lineSeries.activeDotRadius || 5}
                    highestValue={highestValue}
                    highlightColor="#E31C5B"
                  />
                );
              }}
              name={lineSeries.name}
            />
          ))}

          {isEmpty(data) && (
            <Label
              value={t("common.no_data")}
              position="center"
              className="content-12 text-content-neutral-700"
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>

      {/* Custom legend */}
      {showLegend && (
        <div className="mt-2 flex h-[45px] items-center justify-evenly">
          {lines.map((line, index) => (
            <div key={index} className="flex flex-col items-center space-x-2">
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: line.color }}
              />
              <span className="content-10 text-content-neutral-800">
                {line.name}
              </span>
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

interface CustomDotProps extends ActiveDotProps {
  highestValue?: number;
  highlightColor?: string;
}

const CustomizedDot: React.FC<CustomDotProps> = ({
  cx,
  cy,
  stroke,
  fill,
  r,
  value,
  highestValue,
  highlightColor = "#E31C5B",
}) => {
  if (cx === undefined || cy === undefined) return null;

  const isHighest = value === highestValue;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      stroke={isHighest ? highlightColor : stroke}
      fill={isHighest ? highlightColor : fill}
      strokeWidth={2}
    />
  );
};

export default DashboardLineChart;
