import type { Meta, StoryObj } from "@storybook/react";
import Number from "./Number";

const meta: Meta<typeof Number> = {
  title: "UI/Number",
  component: Number,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number" },
    },
    locale: {
      control: { type: "select" },
      options: ["en", "ja"],
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => <Number value={1234567} />,
};

export const Currency: Story = {
  render: () => (
    <div className="space-y-2">
      <Number
        value={1234.56}
        options={{ style: "currency", currency: "USD" }}
      />
      <Number
        value={1234.56}
        options={{ style: "currency", currency: "EUR" }}
      />
      <Number
        value={1234.56}
        options={{ style: "currency", currency: "JPY" }}
      />
    </div>
  ),
};

export const Percentages: Story = {
  render: () => (
    <div className="space-y-2">
      <Number value={0.1234} options={{ style: "percent" }} />
      <Number value={0.5} options={{ style: "percent" }} />
      <Number value={1.25} options={{ style: "percent" }} />
    </div>
  ),
};

export const DifferentLocales: Story = {
  render: () => (
    <div className="space-y-2">
      <div>
        <strong>English:</strong> <Number value={1234567.89} locale="en" />
      </div>
      <div>
        <strong>Japanese:</strong> <Number value={1234567.89} locale="ja" />
      </div>
    </div>
  ),
};

export const LargeNumbers: Story = {
  render: () => (
    <div className="space-y-2">
      <Number value={1000000} />
      <Number value={1000000000} />
      <Number value={1000000000000} />
    </div>
  ),
};

export const DecimalPlaces: Story = {
  render: () => (
    <div className="space-y-2">
      <Number
        value={123.456}
        options={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
      />
      <Number
        value={123.456}
        options={{ minimumFractionDigits: 0, maximumFractionDigits: 3 }}
      />
      <Number
        value={123.456}
        options={{ minimumFractionDigits: 4, maximumFractionDigits: 4 }}
      />
    </div>
  ),
};

export const NullAndUndefined: Story = {
  render: () => (
    <div className="space-y-2">
      <div>
        <strong>Null value:</strong> <Number value={null} />
      </div>
      <div>
        <strong>Undefined value:</strong> <Number value={undefined} />
      </div>
      <div>
        <strong>Zero value:</strong> <Number value={0} />
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-2">
      <Number value={1234567} className="text-lg font-semibold text-blue-600" />
      <Number value={1234567} className="font-medium text-green-600" />
      <Number value={1234567} className="italic text-red-600" />
    </div>
  ),
};

export const ScientificNotation: Story = {
  render: () => (
    <div className="space-y-2">
      <Number value={1.23e6} />
      <Number value={1.23e-6} />
      <Number value={1.23e12} />
    </div>
  ),
};
