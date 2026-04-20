import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
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
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          Open Sheet
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              Username
            </label>
            <input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <SheetFooter>
          <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            Save changes
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
          Open Left Sheet
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Navigate through the application.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100">
              Dashboard
            </button>
            <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100">
              Profile
            </button>
            <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100">
              Settings
            </button>
            <button className="w-full rounded px-4 py-2 text-left hover:bg-gray-100">
              Help
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600">
          Open Top Sheet
        </button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Access frequently used actions.</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <button className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">📧</div>
            <div className="text-sm font-medium">New Email</div>
          </button>
          <button className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">📁</div>
            <div className="text-sm font-medium">New File</div>
          </button>
          <button className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">👤</div>
            <div className="text-sm font-medium">New Contact</div>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600">
          Open Bottom Sheet
        </button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share</SheetTitle>
          <SheetDescription>Share this content with others.</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <button className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">📱</div>
            <div className="text-xs">SMS</div>
          </button>
          <button className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">📧</div>
            <div className="text-xs">Email</div>
          </button>
          <button className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">📋</div>
            <div className="text-xs">Copy Link</div>
          </button>
          <button className="flex flex-col items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
            <div className="mb-2 text-2xl">📤</div>
            <div className="text-xs">More</div>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600">
          Create New Project
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Project</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new project.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project Name
            </label>
            <input
              id="project-name"
              placeholder="Enter project name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter project description"
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>
        <SheetFooter>
          <button className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300">
            Cancel
          </button>
          <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            Create Project
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition-all hover:from-purple-600 hover:to-pink-600">
          Custom Styled Sheet
        </button>
      </SheetTrigger>
      <SheetContent className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <SheetHeader>
          <SheetTitle className="text-purple-900">
            Custom Styled Sheet
          </SheetTitle>
          <SheetDescription className="text-purple-700">
            This sheet has custom styling with gradients and colors.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-purple-200 bg-white p-4">
            <h4 className="mb-2 font-medium text-purple-900">Feature 1</h4>
            <p className="text-sm text-purple-700">
              This is a custom styled content area.
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-white p-4">
            <h4 className="mb-2 font-medium text-purple-900">Feature 2</h4>
            <p className="text-sm text-purple-700">
              Another custom styled content area.
            </p>
          </div>
        </div>
        <SheetFooter>
          <button className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition-all hover:from-purple-600 hover:to-pink-600">
            Save
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
