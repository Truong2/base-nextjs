import type { Meta, StoryObj } from "@storybook/react";
import { CardTitle } from "./CardTitle";

const meta: Meta<typeof CardTitle> = {
  title: "UI/Title",
  component: CardTitle,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    showUnderline: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => <CardTitle title="Welcome to Our Platform" />,
};

export const WithUnderline: Story = {
  render: () => <CardTitle title="About Us" showUnderline={true} />,
};

export const LongTitle: Story = {
  render: () => (
    <CardTitle title="This is a very long title that demonstrates how the component handles extended text content" />
  ),
};

export const ShortTitle: Story = {
  render: () => <CardTitle title="Hi" />,
};

export const MultipleTitles: Story = {
  render: () => (
    <div className="space-y-8">
      <CardTitle title="Section One" showUnderline={true} />
      <CardTitle title="Section Two" />
      <CardTitle title="Section Three" showUnderline={true} />
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <CardTitle
        title="Primary Title"
        className="text-blue-600"
        showUnderline={true}
      />
      <CardTitle title="Secondary Title" className="text-green-600" />
      <CardTitle
        title="Accent Title"
        className="text-purple-600"
        showUnderline={true}
      />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm">
      <CardTitle title="Card Title" showUnderline={true} />
      <p className="mt-4 text-gray-600">
        This is some content that goes below the title in a card layout.
      </p>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <CardTitle
        title="Large Title"
        className="text-4xl"
        showUnderline={true}
      />
      <CardTitle title="Medium Title" className="text-2xl" />
      <CardTitle title="Small Title" className="text-lg" showUnderline={true} />
    </div>
  ),
};
