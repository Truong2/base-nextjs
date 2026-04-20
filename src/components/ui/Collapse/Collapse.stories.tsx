import type { Meta, StoryObj } from "@storybook/react";
import { Collapse } from "./Collapse";

const meta: Meta<typeof Collapse> = {
  title: "UI/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: { type: "text" },
    },
    content: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Collapse
        header="What is React?"
        content="React is a JavaScript library for building user interfaces. It was developed by Facebook and is used to create interactive UIs with declarative code."
      />
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Collapse
        header="React Development Best Practices"
        content={
          <div className="space-y-4">
            <p>
              React development involves several best practices that help create
              maintainable and scalable applications:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Use functional components with hooks</li>
              <li>Keep components small and focused</li>
              <li>Use proper prop types and TypeScript</li>
              <li>Implement proper state management</li>
              <li>Write clean and readable code</li>
              <li>Use proper naming conventions</li>
              <li>Implement error boundaries</li>
              <li>Optimize performance with React.memo</li>
            </ul>
            <p>
              Following these practices ensures your React applications are
              maintainable, performant, and easy to understand.
            </p>
          </div>
        }
      />
    </div>
  ),
};

export const MultipleCollapses: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <Collapse
        header="What is Next.js?"
        content="Next.js is a React framework that provides features like server-side rendering, static site generation, and more to help you build production-ready applications."
      />
      <Collapse
        header="What is TypeScript?"
        content="TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors during development and provides better tooling support."
      />
      <Collapse
        header="What is Tailwind CSS?"
        content="Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs."
      />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Collapse
        header="Custom Styled Collapse"
        content="This collapse component has custom styling applied to demonstrate the flexibility of the component."
        className="rounded-lg shadow-lg"
      />
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Collapse
        header="Project Features"
        content={
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">
                🚀 Performance
              </h4>
              <p className="text-blue-700">
                Optimized for speed with React 19 and Next.js 15
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">
                🎨 Design System
              </h4>
              <p className="text-green-700">
                Comprehensive UI components with Storybook documentation
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <h4 className="mb-2 font-semibold text-purple-900">
                🔧 Developer Experience
              </h4>
              <p className="text-purple-700">
                TypeScript support and modern development tools
              </p>
            </div>
          </div>
        }
      />
    </div>
  ),
};
