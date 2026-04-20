import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => <Label>Email</Label>,
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          placeholder="Enter your message"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <input
        id="terms"
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <Label htmlFor="terms">I agree to the terms and conditions</Label>
    </div>
  ),
};

export const WithRadio: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          id="option1"
          name="options"
          type="radio"
          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="option2"
          name="options"
          type="radio"
          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="option3"
          name="options"
          type="radio"
          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="required" className="font-semibold text-red-600">
          Required Field *
        </Label>
        <input
          id="required"
          type="text"
          required
          className="w-full rounded-md border border-red-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="optional" className="italic text-gray-500">
          Optional Field
        </Label>
        <input
          id="optional"
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="success" className="font-medium text-green-600">
          Success Field
        </Label>
        <input
          id="success"
          type="text"
          className="w-full rounded-md border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled" className="opacity-50">
        Disabled Field
      </Label>
      <input
        id="disabled"
        type="text"
        disabled
        placeholder="This field is disabled"
        className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
      />
    </div>
  ),
};
