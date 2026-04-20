import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    collapsible: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It was
          developed by Facebook and is used to create interactive UIs with
          declarative code.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Next.js?</AccordionTrigger>
        <AccordionContent>
          Next.js is a React framework that provides features like server-side
          rendering, static site generation, and more to help you build
          production-ready applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a superset of JavaScript that adds static typing to the
          language. It helps catch errors during development and provides better
          tooling support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It was
          developed by Facebook and is used to create interactive UIs with
          declarative code.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Next.js?</AccordionTrigger>
        <AccordionContent>
          Next.js is a React framework that provides features like server-side
          rendering, static site generation, and more to help you build
          production-ready applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a superset of JavaScript that adds static typing to the
          language. It helps catch errors during development and provides better
          tooling support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Accordion
      type="single"
      defaultValue="item-2"
      collapsible
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It was
          developed by Facebook and is used to create interactive UIs with
          declarative code.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Next.js?</AccordionTrigger>
        <AccordionContent>
          Next.js is a React framework that provides features like server-side
          rendering, static site generation, and more to help you build
          production-ready applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a superset of JavaScript that adds static typing to the
          language. It helps catch errors during development and provides better
          tooling support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          How do I get started with this project?
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>To get started with this project:</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Clone the repository</li>
              <li>
                Install dependencies with{" "}
                <code className="rounded bg-gray-100 px-1">yarn install</code>
              </li>
              <li>
                Run the development server with{" "}
                <code className="rounded bg-gray-100 px-1">yarn dev</code>
              </li>
              <li>
                Open your browser to{" "}
                <code className="rounded bg-gray-100 px-1">
                  http://localhost:3000
                </code>
              </li>
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What technologies are used?</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>This project uses the following technologies:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Next.js 15 - React framework</li>
              <li>React 19 - UI library</li>
              <li>TypeScript - Type safety</li>
              <li>Tailwind CSS - Styling</li>
              <li>Radix UI - Accessible components</li>
              <li>Storybook - Component documentation</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          How do I contribute to this project?
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>To contribute to this project:</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Fork the repository</li>
              <li>Create a feature branch</li>
              <li>Make your changes</li>
              <li>Run tests and linting</li>
              <li>Submit a pull request</li>
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
