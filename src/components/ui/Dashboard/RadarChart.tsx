import { Property } from "csstype";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface RadarData {
  subject: string;
  value?: number | null;
  fullMark: number;
}

interface DashboardRadarProps {
  data: RadarData[];
  color?: string;
  height?: number;
  lastUpdated?: string;
}
export const DashboardRadar: React.FC<DashboardRadarProps> = ({
  data,
  color = "#FF7F50",
  height = 430,
  lastUpdated,
}) => {
  const t = useTranslations();

  const { chartData, noData } = useMemo(() => {
    const isDataEmpty = !data || data.every(o => !o.value);

    if (isDataEmpty) {
      const placeholderData = ["1", "2", "3", "4", "5", "6", "7", "8"].map(
        subject => ({
          subject,
          actualValue: 0,
          chartValue: 0,
          fullMark: 5,
        })
      );
      return { chartData: placeholderData, noData: true };
    }

    const processedData = data.map(item => ({
      subject: item.subject,
      fullMark: item.fullMark,
      actualValue: item.value,
      chartValue: item.value ?? 0,
    }));

    return { chartData: processedData, noData: false };
  }, [data]);

  return (
    <div className="relative p-2">
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart
          data={chartData}
          className="no-chart-outline"
          margin={{ left: 30, right: 30 }}
        >
          <PolarGrid stroke="#e2e8f0" radialLines={false} />
          <PolarAngleAxis
            dataKey="subject"
            tick={
              !noData
                ? props => {
                    const {
                      x = 0,
                      y = 0,
                      cx = 0,
                      cy = 0,
                      payload,
                      offset = 5,
                    } = props;
                    const numericOffset = Number(offset);

                    const vectorX = Number(x) - Number(cx);
                    const vectorY = Number(y) - Number(cy);

                    const distance =
                      Math.sqrt(vectorX * vectorX + vectorY * vectorY) || 1;
                    const normalizedX = vectorX / distance;
                    const normalizedY = vectorY / distance;

                    const newX = Number(x) + normalizedX * numericOffset;
                    const newY = Number(y) + normalizedY * numericOffset;

                    let textAnchor = "middle";
                    if (x > cx) {
                      textAnchor = "start";
                    } else if (x < cx) {
                      textAnchor = "end";
                    }

                    const MAX_WIDTH = 50;

                    return (
                      <foreignObject
                        x={
                          textAnchor === "start"
                            ? newX
                            : textAnchor === "end"
                              ? newX - MAX_WIDTH
                              : newX - MAX_WIDTH / 2
                        }
                        y={newY - 8}
                        width={MAX_WIDTH}
                        height={50}
                        className="text-center"
                      >
                        <div
                          style={{
                            textAlign: textAnchor as Property.TextAlign,
                            color: "#37383C",
                            fontSize: "10px",
                            fontWeight: 700,
                            wordWrap: "break-word",
                            lineHeight: 1.2,
                          }}
                        >
                          {payload.value}
                        </div>
                      </foreignObject>
                    );
                  }
                : false
            }
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            // dx={-20}
            // dy={5}
            tick={
              !noData
                ? { fontSize: 10, fill: "#7E8387", dy: 5, dx: -15 }
                : false
            }
            tickCount={6}
            tickFormatter={value => value.toString()}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="chartValue"
            stroke={color}
            fill={color}
            fillOpacity={0.16}
            strokeWidth={2}
            strokeDasharray="5 5"
          />

          {!noData && (
            <Tooltip
              content={props => {
                const { active, payload, label } = props;
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload;
                  const displayValue = dataPoint.actualValue ?? "-";
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
                      <span className="font-medium text-gray-800">
                        {label}:{" "}
                      </span>
                      <span className="font-bold">{displayValue}</span>
                    </div>
                  );
                }
              }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
      {noData && (
        <div className="content-12 pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-content-neutral-700">
          <div className="h-2 w-2 rounded-full bg-[#FF7F50]"></div>
          <span className="absolute mt-8">{t("common.no_data")}</span>
        </div>
      )}

      {lastUpdated && (
        <div className="mt-2 text-xs text-gray-400">
          Last updated at {lastUpdated}
        </div>
      )}
    </div>
  );
};
