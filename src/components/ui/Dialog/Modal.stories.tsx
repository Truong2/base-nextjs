import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Modal from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    width: { control: "number" },
    destroyOnClose: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BasicModalComponent = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        {...args}
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p>This is a basic modal with some content.</p>
        <p>You can put any content here.</p>
      </Modal>
    </div>
  );
};

export const Basic: Story = {
  args: {
    open: false,
    title: "Basic Modal",
    width: 520,
    destroyOnClose: false,
  },
  render: BasicModalComponent,
};

const WithFormComponent = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create User</Button>
      <Modal
        {...args}
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Create</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <option>User</option>
              <option>Admin</option>
              <option>Manager</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const WithForm: Story = {
  args: {
    open: false,
    title: "Create User",
    width: 600,
    destroyOnClose: true,
  },
  render: WithFormComponent,
};

const LargeModalComponent = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
      <Modal
        {...args}
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="space-y-4">
          <p>This is a large modal with more content.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export const LargeModal: Story = {
  args: {
    open: false,
    title: "Large Modal",
    width: 800,
    destroyOnClose: false,
  },
  render: LargeModalComponent,
};

const NoFooterComponent = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onCancel={() => setOpen(false)}>
        <p>This modal has no footer buttons.</p>
        <p>You can only close it using the X button or clicking outside.</p>
      </Modal>
    </div>
  );
};

export const NoFooter: Story = {
  args: {
    open: false,
    title: "Modal without Footer",
    width: 520,
    destroyOnClose: false,
  },
  render: NoFooterComponent,
};
