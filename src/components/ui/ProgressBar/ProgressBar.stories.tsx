import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./ProgressBar";
import React, { useEffect, useState } from "react";

const meta: Meta<typeof Progress> = {
  title: "UI/ProgressBar",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    bg: {
      control: { type: "color" },
    },
    indicatorBg: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const WithPrefix: Story = {
  args: {
    value: 75,
    _prefix: <span>Progress</span>,
  },
};

export const WithSuffix: Story = {
  args: {
    value: 60,
    suffix: <span>60%</span>,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    value: 85,
    _prefix: <span>Loading</span>,
    suffix: <span>85%</span>,
  },
};

export const CustomColors: Story = {
  args: {
    value: 40,
    bg: "#e5e7eb",
    indicatorBg: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
  },
};

export const DifferentValues: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div>
        <div className="mb-2 text-sm font-medium">25% Complete</div>
        <Progress value={25} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">50% Complete</div>
        <Progress value={50} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">75% Complete</div>
        <Progress value={75} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium">100% Complete</div>
        <Progress value={100} />
      </div>
    </div>
  ),
};

const AnimatedProgressComponent = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-80">
      <div className="mb-2 text-sm font-medium">
        Animated Progress: {progress}%
      </div>
      <Progress value={progress} />
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedProgressComponent />,
};
