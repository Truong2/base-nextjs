"use client";
import { useTranslations } from "next-intl";
import React, { useId } from "react";

export interface WaterBallProps {
  percentage?: number | null;
  size?: number;
  waveColors?: [string, string];
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  title?: string;
}

export const WaterBall: React.FC<WaterBallProps> = ({
  percentage,
  size = 120,
  waveColors = ["#00A2E0", "#00a2e033"],
  backgroundColor = "#FFFFFF",
  borderColor = "#3976e533",
  textColor = "#FFFFFF",
  title,
}) => {
  const t = useTranslations();
  const id = useId();
  const radius = size / 2;
  const strokeWidth = 2;
  const innerRadius = radius - strokeWidth;
  const padding = 2;

  const currentPercentage = percentage ?? 0;
  const waveYPosition = innerRadius * 2 * (1 - currentPercentage / 100);

  const wavePath = () => {
    const width = size * 2;
    const height = 8;
    const waveLength = size;

    let path = `M 0 ${height}`;
    for (let i = 0; i < width; i++) {
      const y = height * Math.sin((i / waveLength) * 2 * Math.PI);
      path += ` L ${i} ${y}`;
    }
    path += ` L ${width} ${size}`;
    path += ` L 0 ${size} Z`;
    return path;
  };

  const renderContent = () => {
    if (percentage === null || percentage === undefined) {
      return (
        <div className="content-12 text-content-neutral-700">
          {t("common.no_data")}
        </div>
      );
    }

    return (
      <div
        className="title-18 text-white"
        style={{
          textShadow: `
            -1px -1px 0 rgba(0, 0, 0, 0.25),
            1px -1px 0 rgba(0, 0, 0, 0.25),
            -1px  1px 0 rgba(0, 0, 0, 0.25),
            1px  1px 0 rgba(0, 0, 0, 0.25)
          `,
        }}
      >
        {percentage.toFixed(0)}
      </div>
    );
  };

  return (
    <div className="relative m-1" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{
          filter: `drop-shadow(0 0 15px ${borderColor}40)`,
        }}
      >
        <style>
          {`
            .wave-group {
              transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .wave {
              animation: wave-animation 2s linear infinite;
            }
            @keyframes wave-animation {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-${size}px);
              }
            }
          `}
        </style>

        <defs>
          <linearGradient
            id={`waveGradient-${id}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={waveColors[0]} />
            <stop offset="100%" stopColor={waveColors[1]} />
          </linearGradient>

          <clipPath id={`circleClip-${id}`}>
            <circle cx={radius} cy={radius} r={innerRadius - padding} />
          </clipPath>
        </defs>

        <circle
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill={backgroundColor}
          stroke={borderColor}
          strokeWidth={strokeWidth}
        />

        <g clipPath={`url(#circleClip-${id})`}>
          <g
            className="wave-group"
            style={{
              transform: `translateY(${waveYPosition}px)`,
            }}
          >
            <path
              className="wave"
              d={wavePath()}
              fill={`url(#waveGradient-${id})`}
              fillOpacity={0.8}
            />
            <path
              className="wave"
              d={wavePath()}
              fill={`url(#waveGradient-${id})`}
              fillOpacity={0.4}
              style={{ animationDelay: "-1s", animationDuration: "2.2s" }}
            />
          </g>
        </g>
      </svg>

      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ color: textColor }}
      >
        {renderContent()}
      </div>

      {title && (
        <div className="content-10 text-center text-content-neutral-700">
          {title}
        </div>
      )}
    </div>
  );
};
