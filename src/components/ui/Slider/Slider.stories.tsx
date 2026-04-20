import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "object" },
    },
    max: {
      control: { type: "number" },
    },
    min: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const WithRange: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Slider defaultValue={[20, 80]} max={100} step={1} />
    </div>
  ),
};

export const VolumeControl: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Volume</span>
        <span className="text-sm text-gray-500">75%</span>
      </div>
      <Slider defaultValue={[75]} max={100} step={1} />
    </div>
  ),
};

export const PriceRange: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Price Range</span>
        <span className="text-sm text-gray-500">$50 - $200</span>
      </div>
      <Slider defaultValue={[50, 200]} max={500} min={0} step={10} />
      <div className="flex justify-between text-xs text-gray-500">
        <span>$0</span>
        <span>$500</span>
      </div>
    </div>
  ),
};

export const RatingSlider: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Rating</span>
        <span className="text-sm text-gray-500">4.5/5</span>
      </div>
      <Slider defaultValue={[4.5]} max={5} min={0} step={0.1} />
      <div className="flex justify-between text-xs text-gray-500">
        <span>0</span>
        <span>5</span>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Disabled Slider</span>
        <span className="text-sm text-gray-500">50%</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </div>
  ),
};

export const CustomSteps: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Quality</span>
        <span className="text-sm text-gray-500">High</span>
      </div>
      <Slider defaultValue={[3]} max={4} min={1} step={1} />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Ultra</span>
      </div>
    </div>
  ),
};

export const MultipleSliders: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Brightness</span>
          <span className="text-sm text-gray-500">80%</span>
        </div>
        <Slider defaultValue={[80]} max={100} step={1} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Contrast</span>
          <span className="text-sm text-gray-500">60%</span>
        </div>
        <Slider defaultValue={[60]} max={100} step={1} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Saturation</span>
          <span className="text-sm text-gray-500">45%</span>
        </div>
        <Slider defaultValue={[45]} max={100} step={1} />
      </div>
    </div>
  ),
};
