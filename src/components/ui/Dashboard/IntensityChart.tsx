"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceArea,
  Tooltip,
  Label,
} from "recharts";
import { memo, useMemo, type FC } from "react";
import { AxisDomainType } from "recharts/types/util/types";
import { addDays, addHours, format, parseISO, startOfDay } from "date-fns";
import { useTranslations } from "next-intl";
import { isEmpty, isNil } from "lodash";

const CustomXAxisTick = (props: any) => {
  const { x, y, payload, tickFormatter } = props;

  const formattedTick = tickFormatter
    ? tickFormatter(payload.value)
    : payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={-8} r={4} fill="#7E8387" />

      <text
        x={0}
        y={0}
        dy={20}
        textAnchor="middle"
        fill="#7E8387"
        fontSize={10}
      >
        {formattedTick}
      </text>
    </g>
  );
};

export interface LineConfig {
  dataKey: string;
  name: string;
  color: string;
  isDashed?: boolean;
}

export interface ChartDataPoint {
  [key: string]: number | string;
}

interface IntensityChartProps {
  data: ChartDataPoint[];
  size?: number;
  xAxisDataKey?: string;
  xAxisType?: AxisDomainType;
  total?: number;
  textTotal?: string;
  showLegend?: boolean;
  lines?: LineConfig[];
}

const IntensityChart: FC<IntensityChartProps> = ({
  data,
  size = 120,
  xAxisDataKey = "timestamp",
  xAxisType = "number",
  total,
  textTotal,
  showLegend = false,
  lines = [],
}) => {
  const t = useTranslations();

  const xAxisTickFormatter = (value: any): string => {
    if (xAxisType === "category") {
      return value.toString();
    }

    if (typeof value === "number") {
      if (value === xAxisDomain[1]) {
        return "24:00";
      }
      return format(new Date(value * 1000), "HH:mm");
    }

    return value.toString();
  };

  const { xAxisDomain, xAxisTicks } = useMemo(() => {
    if (
      isEmpty(data) ||
      xAxisDataKey !== "timestamp" ||
      isNil(data[0]?.[xAxisDataKey])
    ) {
      return { xAxisDomain: ["dataMin", "dataMax"], xAxisTicks: undefined };
    }

    const dayOfData = startOfDay(
      new Date((data[0]?.[xAxisDataKey] as number) * 1000)
    );
    const domainStart = dayOfData.getTime() / 1000;
    const domainEnd = addDays(dayOfData, 1).getTime() / 1000;

    const ticks: any = [];
    for (let i = 0; i <= 24; i += 1) {
      ticks.push(addHours(dayOfData, i).getTime() / 1000);
    }

    if (ticks[ticks.length - 1] < domainEnd) {
      ticks.push(domainEnd);
    }

    return { xAxisDomain: [domainStart, domainEnd], xAxisTicks: ticks };
  }, [data, xAxisDataKey]);

  return (
    <div className="w-full flex-1 bg-white">
      <ResponsiveContainer width="100%" height={size}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 15, left: -25, bottom: 0 }}
          className="no-chart-outline"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey={xAxisDataKey}
            type={xAxisType}
            axisLine={false}
            tickLine={false}
            tick={
              xAxisType === "number" ? (
                <CustomXAxisTick tickFormatter={xAxisTickFormatter} />
              ) : (
                { dy: 5, fill: "#7E8387", fontSize: 10, fontWeight: "bold" }
              )
            }
            domain={xAxisDomain}
            ticks={xAxisTicks}
            tickFormatter={xAxisTickFormatter}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              dx: -5,
              dy: -4,
              fill: "#37383C",
              fontSize: 10,
              fontWeight: "bold",
            }}
          />
          <ReferenceArea x1="SU" x2="MO" fill="#F3F4F6" ifOverflow="visible" />

          <Line
            key="value"
            type="monotone"
            dataKey="value"
            stroke="#3976E5"
            strokeWidth={3}
            dot={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload;

                let title = "";
                if (typeof label === "number") {
                  title =
                    label === xAxisDomain[1]
                      ? "24:00"
                      : format(new Date(label * 1000), "HH:mm");
                } else {
                  title = dataPoint.calendarDate
                    ? format(parseISO(dataPoint.calendarDate), "yyyy/MM/dd")
                    : "";
                }
                const stressValue = payload[0].value;

                return (
                  <div className="flex flex-col rounded-lg bg-background-tooltip p-2 shadow-md">
                    <p className="subtitle-10 text-title-neutral-900">
                      {title}
                    </p>
                    <p className="content-10 text-content-neutral-700">
                      <span style={{ color: payload[0].payload.fill }}>
                        {stressValue} {t("common.unit_minutes")}
                      </span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />

          {isEmpty(data) && (
            <Label
              value={t("common.no_data")}
              position="center"
              className="content-12 text-content-neutral-700"
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {!isNil(total) && (
        <div className="mt-2 flex flex-col items-center">
          <p className="content-10 text-content-neutral-700">
            {textTotal ?? t("dashboard.health.intensity_minutes")}
          </p>
          <div className="flex items-center gap-1">
            <span className="subtitle-20 text-title-neutral-900">
              {Number(total).toLocaleString()}
            </span>
            <span className="content-12 text-content-neutral-700">
              {t("common.unit_minutes")}
            </span>
          </div>
        </div>
      )}

      {showLegend && (
        <div className="mt-2 flex h-9 w-full items-center justify-center rounded-xl border">
          <div className="flex-shrink-1 flex items-center justify-center gap-2 p-1 text-sm">
            {lines.map((line, index) => {
              const isDashed = !!line.isDashed;
              return (
                <div
                  key={`item-${index}`}
                  className="flex items-center space-x-2"
                >
                  <span className="subtitle-12 text-title-neutral-900">
                    {line.name}
                  </span>
                  {isDashed ? (
                    <DashedLineIcon color={line.color} />
                  ) : (
                    <SolidLineIcon color={line.color} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SolidLineIcon = ({ color }: { color?: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 8H4.79865C5.2538 8 5.65153 7.69264 5.76632 7.2522L6.41902 4.7478C6.53381 4.30736 6.93154 4 7.3867 4H12"
      stroke={color}
      strokeWidth="2"
    />
  </svg>
);

const DashedLineIcon = ({ color }: { color?: string }) => (
  <svg
    width="24"
    height="12"
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 6H22"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
  </svg>
);

export default memo(IntensityChart);
