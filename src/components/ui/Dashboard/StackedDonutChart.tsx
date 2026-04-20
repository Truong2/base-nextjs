import { useTranslations } from "next-intl";
import React, {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "~/utils/utils";

export interface ChartLayer {
  name?: string;
  value: number;
  colors?: [string, string];
}

type TooltipState = {
  visible: boolean;
  payload: ChartLayer | null;
  x: number;
  y: number;
};

const DEFAULT_LAYER_COLORS: [string, string] = ["#0088FE", "#00C49F"];

interface StackedDonutChartProps {
  layers: ChartLayer[];
  size?: number;
  backgroundColors?: [string, string];
  customCenterText?: ReactNode;
  showTooltip?: boolean;
  showLegend?: boolean;
  showSummary?: boolean;
  className?: string;
}

const MIN_VISIBLE_VALUE_PERCENTAGE = 0.06;

const StackedDonutChart: React.FC<StackedDonutChartProps> = ({
  layers,
  size = 120,
  backgroundColors = ["#EEEEEE", "#EEEEEE"],
  customCenterText,
  showTooltip = false,
  showLegend = false,
  showSummary = false,
  className,
}) => {
  const t = useTranslations();
  const chartId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [tooltipState, setTooltipState] = useState<TooltipState>({
    visible: false,
    payload: null,
    x: 0,
    y: 0,
  });

  const { chartTotal, sortedLayers, originalTotal } = useMemo(() => {
    let runningTotal = 0;
    const cumulativeLayers = layers.map(layer => {
      if (layer.value === 0) return { ...layer, value: 0 };
      runningTotal += layer.value;
      return { ...layer, value: runningTotal };
    });
    const finalTotal = runningTotal;

    const layersWithOriginalIndex = cumulativeLayers.map((layer, index) => ({
      ...layer,
      originalIndex: index,
    }));
    const sorted = layersWithOriginalIndex.sort((a, b) => b.value - a.value);

    const originalSum = layers.reduce((acc, layer) => acc + layer.value, 0);

    return {
      chartTotal: finalTotal,
      sortedLayers: sorted,
      originalTotal: originalSum,
    };
  }, [layers]);

  const handleMouseEnter = useCallback(
    (layerData: ChartLayer, event: React.MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      setTooltipState({
        visible: true,
        payload: layerData,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTooltipState(prev => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (isOutside) {
        handleMouseLeave();
      }
    };

    if (tooltipState.visible) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tooltipState.visible, handleMouseLeave]);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        ref={containerRef}
        className={cn("relative m-1 rounded-full bg-[#FAFAFA]", className)}
        style={{ width: size, height: size }}
        onMouseLeave={handleMouseLeave}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="no-chart-outline"
        >
          <PieChart>
            <defs>
              {layers.map((layer, index) => {
                const layerColors = layer.colors ?? DEFAULT_LAYER_COLORS;
                return (
                  <linearGradient
                    key={`layerGradient-${chartId}-${index}`}
                    id={`layerGradient-${chartId}-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={layerColors[0]} />
                    <stop offset="100%" stopColor={layerColors[1]} />
                  </linearGradient>
                );
              })}
              <linearGradient
                id={`backgroundGradient-${chartId}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={backgroundColors[0]} />
                <stop offset="100%" stopColor={backgroundColors[1]} />
              </linearGradient>
            </defs>

            <Pie
              data={[{ value: 1 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="72%"
              outerRadius="100%"
              isAnimationActive={false}
              stroke="none"
              fill={`url(#backgroundGradient-${chartId})`}
            />

            {sortedLayers.map(layer => {
              const minRenderValue = chartTotal * MIN_VISIBLE_VALUE_PERCENTAGE;
              let renderValue = layer.value;
              let remainderValue = chartTotal - layer.value;

              if (layer.value > 0 && layer.value < minRenderValue) {
                renderValue = minRenderValue;
                remainderValue = chartTotal - renderValue;
              }

              const pieData = [
                { name: layer.name, value: renderValue },
                { name: "Remain", value: remainderValue },
              ];

              const originalLayer = layers[layer.originalIndex] as ChartLayer;

              return (
                <Pie
                  key={layer.name || `layer-${layer.originalIndex}`}
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="72%"
                  outerRadius="100%"
                  cornerRadius={15}
                >
                  <Cell
                    style={{ outline: "none" }}
                    fill={`url(#layerGradient-${chartId}-${layer.originalIndex})`}
                    stroke="none"
                    onMouseEnter={(event: React.MouseEvent) => {
                      handleMouseEnter(originalLayer, event);
                    }}
                  />
                  <Cell fill="transparent" stroke="none" pointerEvents="none" />
                </Pie>
              );
            })}
          </PieChart>
        </ResponsiveContainer>

        {chartTotal === 0 ? (
          <div className="content-12 absolute inset-0 flex flex-col items-center justify-center text-content-neutral-700">
            {t("common.no_data")}
          </div>
        ) : (
          <>
            {customCenterText && (
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                {customCenterText}
              </div>
            )}
          </>
        )}

        {showTooltip && (
          <CustomTooltip
            visible={tooltipState.visible}
            x={tooltipState.x}
            y={tooltipState.y}
            payload={tooltipState.payload}
            total={originalTotal}
          />
        )}
      </div>
      {showLegend && chartTotal > 0 && (
        <div className="mt-2 flex w-full flex-wrap items-center justify-evenly gap-y-4">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="flex w-1/2 flex-col items-center space-x-1"
            >
              <div
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: layer.colors?.[0] }}
              />
              <span className="content-10 text-content-neutral-800">
                {layer?.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {showSummary && chartTotal > 0 && (
        <div className="mt-2 flex w-full flex-wrap items-center justify-evenly gap-y-3 rounded-xl border p-4">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="flex w-1/4 flex-col items-center justify-center"
            >
              <p className="title-16 text-title-neutral-800">
                {layer.value ?? "-"}
                {t("common.unit_days")}
              </p>
              <div className="flex items-center space-x-1">
                <div
                  className="h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: layer.colors?.[0] }}
                />
                <span className="content-10 text-content-neutral-800">
                  {layer?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface CustomTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  payload: ChartLayer | null;
  total: number;
}

const CustomTooltip: FC<CustomTooltipProps> = ({
  visible,
  x,
  y,
  payload,
  total,
}) => {
  const t = useTranslations();
  if (!visible || !payload || total === 0) {
    return null;
  }

  const percentage = ((payload.value / total) * 100).toFixed(1);

  return (
    <div
      className="flex w-max flex-col rounded-lg bg-background-tooltip p-2 shadow-md"
      style={{
        position: "absolute",
        top: y + 15,
        left: x + 15,
        transition: "opacity 0.2s, transform 0.1s ease-out",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        zIndex: 999,
      }}
    >
      <p className="subtitle-10 text-title-neutral-900">{payload.name}</p>
      <p className="content-10 text-content-neutral-700">
        {payload.value} {t("common.unit_days")}
      </p>
      <p className="content-10 text-content-neutral-700">{percentage} %</p>
    </div>
  );
};

export default memo(StackedDonutChart);
