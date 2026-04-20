import { format, parseISO } from "date-fns";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";
import type { ActiveDotProps } from "recharts/types/util/types";

export interface LineChartData {
  name: string;
  calendarDate: string;
  [key: string]: string | number;
}

export interface LineSeries {
  dataKey: string;
  highlightColor?: string;
  name?: string;
  label?: string;
  stroke: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  showDots?: boolean;
  dotRadius?: number;
  activeDotRadius?: number;
  type?: CurveType;
}
export interface StressLineChartProps {
  data?: LineChartData[];
  height?: number;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  lines?: LineSeries[];
  xAxisKey?: string;
  yAxisDomain?: [number, number | string];
  total?: number;
  unitTotal?: string;
}

const StressLineChart: React.FC<StressLineChartProps> = ({
  data,
  height = 140,
  showGrid = true,
  showLegend = true,
  lines = [
    { dataKey: "newActive", stroke: "#1e6fc3" },
    { dataKey: "allActive", stroke: "#fe0000" },
  ],
  xAxisKey = "name",
  yAxisDomain = [0, 100],
  total,
  unitTotal,
}) => {
  const t = useTranslations();
  const isDataEmpty = !data || data.length === 0;
  const chartData = useMemo(() => {
    if (!isDataEmpty) return data;

    const defaultXAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return defaultXAxis.map(name => ({
      name,
      calendarDate: "",
    }));
  }, [data, isDataEmpty]);

  const highestValue = useMemo(() => {
    if (!data || data.length === 0 || lines.length === 0) return -Infinity;

    let maxVal = -Infinity;
    data.forEach(item => {
      lines.forEach(line => {
        const val = item[line.dataKey];
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
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
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
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload as LineChartData;

                return (
                  <div className="flex flex-col rounded-lg bg-background-tooltip p-2 shadow-md">
                    <p className="subtitle-10 text-title-neutral-900">
                      {dataPoint.calendarDate &&
                        format(parseISO(dataPoint.calendarDate), "yyyy/MM/dd")}
                    </p>
                    <p className="content-10 flex gap-1 text-content-neutral-700">
                      <span>{t("dashboard.health.stress_level_tooltip")}:</span>
                      <span>{dataPoint?.value?.toLocaleString()}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          {lines?.map((line, index) => (
            <Line
              key={`${line.dataKey}-${index}`}
              type={line?.type ?? "monotone"}
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || 1}
              strokeDasharray={line.strokeDasharray}
              dot={
                line.showDots !== false
                  ? props => {
                      const { key, ...restProps } = props;
                      return (
                        <CustomizedDot
                          key={key}
                          {...restProps}
                          fill={line.stroke}
                          r={line.dotRadius || 4}
                          strokeWidth={2}
                          highestValue={highestValue}
                          highlightColor={line.highlightColor}
                        />
                      );
                    }
                  : false
              }
              activeDot={props => {
                const { key, ...restProps } = props;
                return (
                  <CustomizedDot
                    key={key}
                    {...restProps}
                    r={line.activeDotRadius || 5}
                    highestValue={highestValue}
                    highlightColor={line.highlightColor}
                  />
                );
              }}
              name={line.label ?? line.name}
            />
          ))}

          {isEmpty(data) && (
            <Label
              value={t("common.no_data")}
              position={"center"}
              className="content-12 text-content-neutral-700"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      {showLegend && (
        <div className="mt-2 flex h-[45px] items-center justify-evenly">
          {lines.map((line, index) => (
            <div key={index} className="flex flex-col items-center space-x-2">
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: line.stroke }}
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

  const isHighest = highestValue && value === highestValue && highestValue > 0;

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

export default StressLineChart;
