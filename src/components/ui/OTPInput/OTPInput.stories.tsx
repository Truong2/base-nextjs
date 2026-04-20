import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OTPInput } from "./OTPInput";

const meta: Meta<typeof OTPInput> = {
  title: "UI/OTPInput",
  component: OTPInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    length: {
      control: { type: "number", min: 4, max: 8 },
      description: "Number of OTP digits",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    autoFocus: {
      control: "boolean",
      description: "Whether to auto-focus the first input",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state
const OTPInputWrapper = ({ length = 6, ...props }: any) => {
  const [value, setValue] = useState("");

  return (
    <div className="p-8">
      <OTPInput value={value} onChange={setValue} length={length} {...props} />
      <div className="mt-4 text-sm text-gray-600">
        Current value: {value || "empty"}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: args => <OTPInputWrapper {...args} />,
  args: {
    length: 6,
    autoFocus: true,
  },
};

export const FourDigits: Story = {
  render: args => <OTPInputWrapper {...args} />,
  args: {
    length: 4,
    autoFocus: true,
  },
};

export const EightDigits: Story = {
  render: args => <OTPInputWrapper {...args} />,
  args: {
    length: 8,
    autoFocus: true,
  },
};

export const Disabled: Story = {
  render: args => <OTPInputWrapper {...args} />,
  args: {
    length: 6,
    disabled: true,
    autoFocus: false,
  },
};

export const WithCustomStyling: Story = {
  render: args => <OTPInputWrapper {...args} />,
  args: {
    length: 6,
    className: "gap-4",
    autoFocus: true,
  },
};

const PrefilledComponent = (args: any) => {
  const [value, setValue] = useState("123456");

  return (
    <div className="p-8">
      <OTPInput
        value={value}
        onChange={setValue}
        length={6}
        autoFocus={true}
        {...args}
      />
      <div className="mt-4 text-sm text-gray-600">Current value: {value}</div>
    </div>
  );
};

export const Prefilled: Story = {
  render: args => <PrefilledComponent {...args} />,
  args: {},
};

const InteractiveComponent = (args: any) => {
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="space-y-4 p-8">
      <div className="flex gap-2">
        <button
          onClick={() => setIsDisabled(!isDisabled)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {isDisabled ? "Enable" : "Disable"}
        </button>
        <button
          onClick={() => setValue("")}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Clear
        </button>
        <button
          onClick={() => setValue("123456")}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Fill Test
        </button>
      </div>

      <OTPInput
        value={value}
        onChange={setValue}
        length={6}
        disabled={isDisabled}
        autoFocus={true}
        {...args}
      />

      <div className="text-sm text-gray-600">
        Current value: {value || "empty"}
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: args => <InteractiveComponent {...args} />,
  args: {},
};
