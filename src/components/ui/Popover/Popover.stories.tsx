import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          Click me
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
          Open Settings
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-muted-foreground text-sm">
              Configure your preferences here.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="width" className="text-sm font-medium">
              Width
            </label>
            <input
              id="width"
              defaultValue="100%"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="height" className="text-sm font-medium">
              Height
            </label>
            <input
              id="height"
              defaultValue="25px"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="sync"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="sync" className="text-sm">
              Sync settings
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 transition-colors hover:bg-gray-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
            JD
          </div>
          <span className="text-sm font-medium">John Doe</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 font-bold text-white">
              JD
            </div>
            <div>
              <h4 className="font-medium">John Doe</h4>
              <p className="text-muted-foreground text-sm">
                john.doe@example.com
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100">
              Settings
            </button>
            <button className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100">
              Help
            </button>
            <hr />
            <button className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-red-50">
              Sign out
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const NotificationCenter: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          Notifications
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Notifications</h4>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Mark all as read
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-3 rounded p-2 hover:bg-gray-50">
              <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">New message received</p>
                <p className="text-muted-foreground text-xs">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 rounded p-2 hover:bg-gray-50">
              <div className="mt-2 h-2 w-2 rounded-full bg-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-muted-foreground text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 rounded p-2 hover:bg-gray-50">
              <div className="mt-2 h-2 w-2 rounded-full bg-yellow-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">System update available</p>
                <p className="text-muted-foreground text-xs">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const ColorPicker: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="h-12 w-12 rounded-lg border-2 border-white bg-blue-500 shadow-lg transition-transform hover:scale-105"></button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <h4 className="font-medium">Choose a color</h4>
          <div className="grid grid-cols-6 gap-2">
            {[
              "bg-red-500",
              "bg-orange-500",
              "bg-yellow-500",
              "bg-green-500",
              "bg-blue-500",
              "bg-purple-500",
              "bg-pink-500",
              "bg-gray-500",
              "bg-red-600",
              "bg-orange-600",
              "bg-yellow-600",
              "bg-green-600",
            ].map((color, index) => (
              <button
                key={index}
                className={`h-8 w-8 ${color} rounded-lg border-2 border-white shadow-sm transition-transform hover:scale-110`}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition-all hover:from-purple-600 hover:to-pink-600">
          Custom Styled
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="space-y-2">
          <h4 className="font-medium text-purple-900">Custom Styled Popover</h4>
          <p className="text-sm text-purple-700">
            This popover has custom styling with gradients and colors.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
