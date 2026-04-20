import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./Message";
import { MessageProvider, useMessage } from "./MessageProvider";

const meta: Meta<typeof Message> = {
  title: "UI/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info", "loading"],
    },
    duration: {
      control: { type: "number", min: 0, max: 10, step: 0.5 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Message Stories
export const Success: Story = {
  args: {
    type: "success",
    content: "This is a success message!",
    duration: 3,
  },
};

export const Error: Story = {
  args: {
    type: "error",
    content: "This is an error message!",
    duration: 3,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    content: "This is a warning message!",
    duration: 3,
  },
};

export const Info: Story = {
  args: {
    type: "info",
    content: "This is an info message!",
    duration: 3,
  },
};

export const Loading: Story = {
  args: {
    type: "loading",
    content: "Loading...",
    duration: 3,
  },
};

// Global Message System Demo
export const GlobalMessageSystem: Story = {
  render: () => {
    const GlobalMessageDemoComponent = () => {
      const message = useMessage();

      const handleSuccess = () => {
        message.success("Operation completed successfully!");
      };

      const handleError = () => {
        message.error("Something went wrong! Please try again.");
      };

      const handleWarning = () => {
        message.warning("Please be careful with this action.");
      };

      const handleInfo = () => {
        message.info("Here is some useful information for you.");
      };

      const handleLoading = () => {
        message.loading("Processing your request...");
      };

      const handleClearAll = () => {
        message.destroy();
      };

      return (
        <div className="space-y-6 p-6">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold">Global Message System</h1>
            <p className="text-gray-600">
              Click buttons to show messages at the top of the page. These
              messages are managed globally.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <button
              onClick={handleSuccess}
              className="rounded-lg bg-green-500 p-4 text-white transition-colors hover:bg-green-600"
            >
              <div className="text-lg font-semibold">Success</div>
              <div className="text-sm opacity-90">message.success()</div>
            </button>

            <button
              onClick={handleError}
              className="rounded-lg bg-red-500 p-4 text-white transition-colors hover:bg-red-600"
            >
              <div className="text-lg font-semibold">Error</div>
              <div className="text-sm opacity-90">message.error()</div>
            </button>

            <button
              onClick={handleWarning}
              className="rounded-lg bg-yellow-500 p-4 text-white transition-colors hover:bg-yellow-600"
            >
              <div className="text-lg font-semibold">Warning</div>
              <div className="text-sm opacity-90">message.warning()</div>
            </button>

            <button
              onClick={handleInfo}
              className="rounded-lg bg-blue-500 p-4 text-white transition-colors hover:bg-blue-600"
            >
              <div className="text-lg font-semibold">Info</div>
              <div className="text-sm opacity-90">message.info()</div>
            </button>

            <button
              onClick={handleLoading}
              className="rounded-lg bg-purple-500 p-4 text-white transition-colors hover:bg-purple-600"
            >
              <div className="text-lg font-semibold">Loading</div>
              <div className="text-sm opacity-90">message.loading()</div>
            </button>

            <button
              onClick={handleClearAll}
              className="rounded-lg bg-gray-500 p-4 text-white transition-colors hover:bg-gray-600"
            >
              <div className="text-lg font-semibold">Clear All</div>
              <div className="text-sm opacity-90">message.destroy()</div>
            </button>
          </div>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold">How to use globally:</h3>
            <div className="space-y-2 text-sm">
              <p>
                1. Wrap your app with{" "}
                <code className="rounded bg-gray-200 px-1">
                  MessageProvider
                </code>
              </p>
              <p>
                2. Use{" "}
                <code className="rounded bg-gray-200 px-1">useMessage()</code>{" "}
                hook in any component
              </p>
              <p>
                3. Call message methods:{" "}
                <code className="rounded bg-gray-200 px-1">
                  message.success()
                </code>
                ,{" "}
                <code className="rounded bg-gray-200 px-1">
                  message.error()
                </code>
                , etc.
              </p>
            </div>
          </div>
        </div>
      );
    };

    return (
      <MessageProvider>
        <GlobalMessageDemoComponent />
      </MessageProvider>
    );
  },
};
