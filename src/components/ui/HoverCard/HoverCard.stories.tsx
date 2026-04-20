import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-blue-600 underline hover:text-blue-800">
          Hover over me
        </button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">@username</h4>
          <p className="text-sm">
            This is a hover card that appears when you hover over the trigger
            element.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithImage: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-blue-600 underline hover:text-blue-800">
          User Profile
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 font-bold text-white">
            JD
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">John Doe</h4>
            <p className="text-muted-foreground text-sm">
              john.doe@example.com
            </p>
            <div className="flex items-center pt-2">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground text-xs">Online</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-blue-600 underline hover:text-blue-800">
          Product Details
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-gray-500">Product Image</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Premium Widget</h4>
            <p className="text-muted-foreground text-sm">
              High-quality widget with advanced features
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-green-600">
                $99.99
              </span>
              <span className="text-muted-foreground text-xs">In Stock</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="flex gap-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="text-blue-600 underline hover:text-blue-800">
            Start Aligned
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <p className="text-sm">This card is start aligned</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="text-blue-600 underline hover:text-blue-800">
            Center Aligned
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="center">
          <p className="text-sm">This card is center aligned</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="text-blue-600 underline hover:text-blue-800">
            End Aligned
          </button>
        </HoverCardTrigger>
        <HoverCardContent align="end">
          <p className="text-sm">This card is end aligned</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-blue-600 underline hover:text-blue-800">
          Rich Content
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium">Project Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: "75%" }}
              />
            </div>
          </div>
          <div className="border-t pt-2">
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>Due Date</span>
              <span>Dec 31, 2024</span>
            </div>
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>Team Members</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          Custom Styled
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-purple-900">
            Custom Styled Card
          </h4>
          <p className="text-sm text-purple-700">
            This hover card has custom styling with gradients and colors.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
