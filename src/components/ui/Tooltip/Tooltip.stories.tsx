import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    delayDuration: {
      control: { type: "number", min: 0, max: 1000, step: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover over me</TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip with helpful information.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger />
        <TooltipContent>
          <p>This tooltip uses the default info icon.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            Click for info
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip has a custom button trigger.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger>Help</TooltipTrigger>
          <TooltipContent>
            <p>Get help with this feature.</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>Settings</TooltipTrigger>
          <TooltipContent>
            <p>Configure your preferences.</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>Info</TooltipTrigger>
          <TooltipContent>
            <p>Learn more about this section.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const LongContent: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Long Tooltip</TooltipTrigger>
        <TooltipContent>
          <p>
            This is a tooltip with longer content that demonstrates how the
            component handles extended text. It includes multiple sentences to
            show the wrapping behavior and maximum width constraints.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip delayDuration={0}>
          <TooltipTrigger>Instant</TooltipTrigger>
          <TooltipContent>
            <p>Shows immediately on hover.</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={500}>
          <TooltipTrigger>Delayed</TooltipTrigger>
          <TooltipContent>
            <p>Shows after 500ms delay.</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={1000}>
          <TooltipTrigger>Slow</TooltipTrigger>
          <TooltipContent>
            <p>Shows after 1 second delay.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const FormField: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Tooltip>
              <TooltipTrigger />
              <TooltipContent>
                <p>We'll use this email to send you important updates.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="flex items-center space-x-2">
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Tooltip>
              <TooltipTrigger />
              <TooltipContent>
                <p>Password must be at least 8 characters long.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <span className="cursor-help text-blue-600 underline hover:text-blue-800">
              Blue Tooltip
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-blue-600">
            <p>Custom blue styling</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <span className="cursor-help text-green-600 underline hover:text-green-800">
              Green Tooltip
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-green-600">
            <p>Custom green styling</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <span className="cursor-help text-purple-600 underline hover:text-purple-800">
              Purple Tooltip
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-purple-600">
            <p>Custom purple styling</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
