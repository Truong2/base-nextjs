import type { Meta, StoryObj } from "@storybook/react";
import { InputSwitch } from "~/components/ui/Input/InputSwitch";
import { Input } from "./Input";
import { TextArea } from "./InputTextArea";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    placeholder: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "default",
    placeholder: "Enter text...",
    type: "text",
  },
};

export const Email: Story = {
  args: {
    name: "email",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const Password: Story = {
  args: {
    name: "password",
    placeholder: "Enter your password",
    type: "password",
  },
};

export const Number: Story = {
  args: {
    name: "number",
    placeholder: "Enter a number",
    type: "number",
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    name: "withValue",
    placeholder: "Enter text...",
    defaultValue: "Pre-filled value",
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input name="text" placeholder="Text input" type="text" />
      <Input name="email" placeholder="Email input" type="email" />
      <Input name="password" placeholder="Password input" type="password" />
      <Input name="number" placeholder="Number input" type="number" />
      <Input name="tel" placeholder="Telephone input" type="tel" />
      <Input name="url" placeholder="URL input" type="url" />
      <Input name="disabled" placeholder="Disabled input" disabled />
      <InputSwitch label="Input Switch" />
      <TextArea placeholder="Text area input" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <label htmlFor="labeled-input" className="text-sm font-medium">
        Label
      </label>
      <Input id="labeled-input" name="labeled" placeholder="Input with label" />
    </div>
  ),
};
