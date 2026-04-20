"use client";

import { format } from "date-fns";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import {
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  Label,
} from "recharts";

const defaultBarColor = "#0081FE";
const highlightBarColor = "#FF7F50";

interface StressDataPoint {
  timestamp: number;
  value: number;
  curve?: number;
}

interface HistogramWithCurveChartProps {
  data: StressDataPoint[];
  labelTooltip: string;
  height?: number;
}

const HistogramWithCurveChart: FC<HistogramWithCurveChartProps> = ({
  data,
  labelTooltip,
  height = 182,
}) => {
  const t = useTranslations();

  const xAxisTickFormatter = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "HH:mm");
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart
        data={data}
        barCategoryGap={0}
        className="no-chart-outline"
        margin={{ top: 10, right: 20, left: -15, bottom: 0 }}
      >
        <XAxis
          dataKey="timestamp"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={xAxisTickFormatter}
          tickCount={6}
          axisLine={false}
          tickLine={false}
          tick={{ dy: 5 }}
          className="subtitle-10"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ dx: -15, dy: -4 }}
          className="subtitle-10"
        />
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(200, 200, 200, 0.2)" }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              let time = "";
              if (typeof label === "number") {
                time = format(new Date(label * 1000), "HH:mm");
              }
              const stressValue = payload[0].value;

              return (
                <div className="flex flex-col rounded-lg bg-background-tooltip p-2 shadow-md">
                  <p className="subtitle-10 text-title-neutral-900">{time}</p>
                  <p className="content-10 text-content-neutral-700">
                    {labelTooltip}:{" "}
                    <span style={{ color: payload[0].payload.fill }}>
                      {stressValue}
                    </span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />

        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.value > 25 ? highlightBarColor : defaultBarColor}
            />
          ))}
        </Bar>

        <Line
          type="monotone"
          dataKey="curve"
          stroke="#E604C6"
          strokeWidth={3}
          dot={false}
          strokeDasharray="10 5"
        />

        {isEmpty(data) && (
          <Label
            value={t("common.no_data")}
            position="center"
            className="content-12 text-content-neutral-700"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default HistogramWithCurveChart;
