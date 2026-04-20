import type { Meta, StoryObj } from "@storybook/react";
import { SortableCardExample } from "./SortableCardExample";

const meta: Meta<typeof SortableCardExample> = {
  title: "UI/Card/Sortable",
  component: SortableCardExample,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["grid", "list"],
    },
    columns: {
      control: { type: "number", min: 1, max: 6 },
    },
    gap: {
      control: { type: "number", min: 8, max: 32, step: 4 },
    },
    dragHandle: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample card data
const sampleCards: any[] = [
  {
    id: "1",
    icon: "🏃‍♂️",
    title: "Steps",
    rank: "Rank A",
    rankVariant: "orange",
    data: [
      { label: "Step count", value: "8,500", unit: "steps" },
      { label: "Distance", value: "6.2", unit: "km" },
    ],
  },
  {
    id: "2",
    icon: "🔥",
    title: "Floors",
    rank: "Rank B",
    rankVariant: "red",
    data: [
      { label: "Climbed", value: "15", unit: "floors" },
      { label: "Descended", value: "12", unit: "floors" },
    ],
  },
  {
    id: "3",
    icon: "⏱️",
    title: "Intensity Minutes",
    rank: "Rank C",
    rankVariant: "purple",
    data: [
      { label: "Moderate", value: "180", unit: "min" },
      { label: "Vigorous", value: "45", unit: "min" },
    ],
  },
  {
    id: "4",
    icon: "💧",
    title: "Hydration",
    rank: "Rank A",
    rankVariant: "orange",
    data: [
      { label: "Water", value: "2.5", unit: "L" },
      { label: "Goal", value: "2.0", unit: "L" },
    ],
  },
  {
    id: "5",
    icon: "😴",
    title: "Sleep",
    rank: "Rank B",
    rankVariant: "red",
    data: [
      { label: "Hours", value: "7.5", unit: "hrs" },
      { label: "Quality", value: "85", unit: "%" },
    ],
  },
  {
    id: "6",
    icon: "❤️",
    title: "Heart Rate",
    rank: "Rank A",
    rankVariant: "orange",
    data: [
      { label: "Resting", value: "62", unit: "bpm" },
      { label: "Max", value: "185", unit: "bpm" },
    ],
  },
];

export const ListLayout: Story = {
  args: {
    cards: sampleCards.slice(0, 4),
    layout: "list",
    columns: 1,
    gap: 16,
    dragHandle: true,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">List Layout</h2>
        <p className="text-gray-600">
          Vertical list layout with drag and drop reordering.
        </p>
      </div>
      {/* <SortableCardContainer {...args} /> */}
      <SortableCardExample />
    </div>
  ),
};
