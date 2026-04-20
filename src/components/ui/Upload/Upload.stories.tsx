import type { Meta, StoryObj } from "@storybook/react";
import { Upload } from "./Upload";

const meta: Meta<typeof Upload> = {
  title: "UI/Upload",
  component: Upload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Upload component with drag and drop support, multiple list types, and Ant Design-like API.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    listType: {
      control: "select",
      options: ["text", "picture", "picture-card"],
      description: "Type of upload list",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    accept: {
      control: "text",
      description: "File types to accept",
    },
    maxCount: {
      control: "number",
      description: "Maximum number of files",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    disabled: {
      control: "boolean",
      description: "Disable upload functionality",
    },
    showUploadList: {
      control: "boolean",
      description: "Show upload list",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic upload
export const Basic: Story = {
  args: {
    listType: "text",
    multiple: false,
    accept: "*/*",
    maxSize: 10 * 1024 * 1024, // 10MB
    customRequest: ({
      file: _file,
      onProgress,
      onSuccess,
      onError: _onError,
    }: {
      file: File;
      onProgress?: (percent: number) => void;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    }) => {
      // Simulate upload progress
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        onProgress?.(percent);

        if (percent >= 100) {
          clearInterval(interval);
          onSuccess?.({ url: "https://example.com/file" });
        }
      }, 200);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Basic upload with text list type.",
      },
    },
  },
};

// Picture card list type
export const PictureCard: Story = {
  args: {
    listType: "picture-card",
    multiple: true,
    accept: "image/*",
    maxSize: 5 * 1024 * 1024,
    maxCount: 8,
    customRequest: ({
      file: _file,
      onProgress,
      onSuccess,
      onError: _onError,
    }: {
      file: File;
      onProgress?: (percent: number) => void;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    }) => {
      // Simulate upload progress
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        onProgress?.(percent);

        if (percent >= 100) {
          clearInterval(interval);
          onSuccess?.({ url: "https://example.com/file" });
        }
      }, 200);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Upload with picture card layout, perfect for image galleries.",
      },
    },
  },
};

// With custom request
export const CustomRequest: Story = {
  args: {
    listType: "text",
    multiple: true,
    accept: "*/*",
    maxSize: 10 * 1024 * 1024,
    customRequest: ({
      file: _file,
      onProgress,
      onSuccess,
      onError: _onError,
    }: {
      file: File;
      onProgress?: (percent: number) => void;
      onSuccess?: (response: any) => void;
      onError?: (error: any) => void;
    }) => {
      // Simulate upload progress
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        onProgress?.(percent);

        if (percent >= 100) {
          clearInterval(interval);
          onSuccess?.({ url: "https://example.com/file" });
        }
      }, 200);
    },
  },
  parameters: {
    docs: {
      description: {
        story: "Upload with custom request function for handling upload logic.",
      },
    },
  },
};
