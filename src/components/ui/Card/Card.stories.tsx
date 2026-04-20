import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Footprint icon for steps (light blue outline)
const FootprintIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </svg>
);

// Flame icon for floors (light blue)
const FlameIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Running person icon for intensity minutes (light blue)
const RunningIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
  </svg>
);

// Stack of cards showing all three from the image
export const FitnessCards: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Steps Card - Top */}
      <Card
        icon={<FootprintIcon />}
        title="Steps"
        rank="Rank B"
        rankVariant="orange"
        onRankClick={() => alert("Steps rank clicked!")}
        data={[
          { label: "Step count", value: "2,000", unit: "steps" },
          { label: "Distance", value: "7.3", unit: "km" },
        ]}
        onClick={() => alert("Steps card clicked!")}
      />

      {/* Floors Card - Middle */}
      <Card
        icon={<FlameIcon />}
        title="Floors"
        rank="Not achieved"
        rankVariant="red"
        onRankClick={() => alert("Floors rank clicked!")}
        data={[
          { label: "Climbed", value: "25" },
          { label: "Descended", value: "18" },
        ]}
        onClick={() => alert("Floors card clicked!")}
      />

      {/* Intensity Minutes Card - Bottom */}
      <Card
        icon={<RunningIcon />}
        title="Intensity Minutes"
        rank="Rank C"
        rankVariant="purple"
        onRankClick={() => alert("Intensity rank clicked!")}
        data={[
          { label: "Moderate", value: "236", unit: "min" },
          { label: "Vigorous", value: "90", unit: "min" },
        ]}
        onClick={() => alert("Intensity card clicked!")}
      />
    </div>
  ),
};

// Custom card example
export const CustomCard: Story = {
  render: () => (
    <Card
      icon={<div className="h-6 w-6 rounded-full bg-purple-500" />}
      title="Custom Metric"
      rank="Custom Rank"
      rankVariant="purple"
      data={[
        { label: "Value 1", value: "123", unit: "units" },
        { label: "Value 2", value: "456", unit: "items" },
      ]}
      className="bg-gradient-to-r from-purple-50 to-pink-50"
    />
  ),
};
