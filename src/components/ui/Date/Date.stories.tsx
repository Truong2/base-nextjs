import type { Meta, StoryObj } from "@storybook/react";
import { Date } from "./Date";

const meta: Meta<typeof Date> = {
  title: "UI/Date",
  component: Date,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
    },
    format: {
      control: { type: "text" },
    },
    defaultValue: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => <Date value="2024-01-15" />,
};

export const WithFormat: Story = {
  render: () => (
    <div className="space-y-2">
      <Date value="2024-01-15" format="dd/MM/yyyy" />
      <Date value="2024-01-15" format="MMM dd, yyyy" />
      <Date value="2024-01-15" format="EEEE, MMMM dd, yyyy" />
    </div>
  ),
};

export const DifferentDates: Story = {
  render: () => (
    <div className="space-y-2">
      <Date value="2024-01-15" format="dd/MM/yyyy" />
      <Date value="2024-06-20" format="dd/MM/yyyy" />
      <Date value="2024-12-31" format="dd/MM/yyyy" />
      <Date value="2023-02-14" format="dd/MM/yyyy" />
    </div>
  ),
};

export const WithCustomDefaultValue: Story = {
  render: () => (
    <div className="space-y-2">
      <Date value={null} defaultValue="No date available" />
      <Date value="" defaultValue="Date not set" />
      <Date value={undefined} defaultValue="--" />
    </div>
  ),
};

export const DifferentFormats: Story = {
  render: () => (
    <div className="space-y-2">
      <div>
        <strong>Short format:</strong>{" "}
        <Date value="2024-01-15" format="dd/MM/yy" />
      </div>
      <div>
        <strong>Long format:</strong>{" "}
        <Date value="2024-01-15" format="EEEE, MMMM dd, yyyy" />
      </div>
      <div>
        <strong>Month and year:</strong>{" "}
        <Date value="2024-01-15" format="MMMM yyyy" />
      </div>
      <div>
        <strong>ISO format:</strong>{" "}
        <Date value="2024-01-15" format="yyyy-MM-dd" />
      </div>
      <div>
        <strong>US format:</strong>{" "}
        <Date value="2024-01-15" format="MM/dd/yyyy" />
      </div>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-2">
      <Date
        value="2024-01-15"
        format="dd/MM/yyyy"
        className="font-semibold text-blue-600"
      />
      <Date
        value="2024-01-15"
        format="EEEE, MMMM dd, yyyy"
        className="italic text-gray-500"
      />
      <Date
        value="2024-01-15"
        format="MMM dd, yyyy"
        className="font-medium text-green-700"
      />
    </div>
  ),
};

export const InvalidDates: Story = {
  render: () => (
    <div className="space-y-2">
      <Date value="invalid-date" defaultValue="Invalid date" />
      <Date value="2024-13-45" defaultValue="Invalid date" />
      <Date value="not-a-date" defaultValue="Invalid date" />
    </div>
  ),
};
