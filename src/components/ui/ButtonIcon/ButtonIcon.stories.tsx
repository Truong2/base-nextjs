import type { Meta, StoryObj } from "@storybook/react";
import { ButtonIcon } from "./ButtonIcon";

const meta: Meta<typeof ButtonIcon> = {
  title: "UI/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "cta", "outline", "outline-white"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "normal", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

const IconExample = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const IconOnly: Story = {
  render: () => (
    <ButtonIcon
      iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
      variant="primary"
    />
  ),
};

export const IconWithLabel: Story = {
  render: () => (
    <ButtonIcon
      iconOptions={{
        type: "iconWithLabel",
        iconLeft: <IconExample />,
      }}
      variant="primary"
    >
      Button with Icon
    </ButtonIcon>
  ),
};

export const IconRight: Story = {
  render: () => (
    <ButtonIcon
      iconOptions={{
        type: "iconWithLabel",
        iconRight: <IconExample />,
      }}
      variant="primary"
    >
      Button with Icon Right
    </ButtonIcon>
  ),
};

export const BothIcons: Story = {
  render: () => (
    <ButtonIcon
      iconOptions={{
        type: "iconWithLabel",
        iconLeft: <HeartIcon />,
        iconRight: <IconExample />,
      }}
      variant="primary"
    >
      Button with Both Icons
    </ButtonIcon>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <ButtonIcon
          iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
          variant="primary"
        />
        <ButtonIcon
          iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
          variant="ghost"
        />
        <ButtonIcon
          iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
          variant="outline"
        />
      </div>
      <div className="flex gap-4">
        <ButtonIcon
          iconOptions={{
            type: "iconWithLabel",
            iconLeft: <IconExample />,
          }}
          variant="primary"
        >
          Primary
        </ButtonIcon>
        <ButtonIcon
          iconOptions={{
            type: "iconWithLabel",
            iconLeft: <IconExample />,
          }}
          variant="ghost"
        >
          CTA
        </ButtonIcon>
        <ButtonIcon
          iconOptions={{
            type: "iconWithLabel",
            iconLeft: <IconExample />,
          }}
          variant="outline"
        >
          Outline
        </ButtonIcon>
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <ButtonIcon
          iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
          size="small"
        />
        <ButtonIcon
          iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
          size="normal"
        />
        <ButtonIcon
          iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
          size="large"
        />
      </div>
      <div className="flex gap-4">
        <ButtonIcon
          iconOptions={{
            type: "iconWithLabel",
            iconLeft: <IconExample />,
          }}
          size="small"
        >
          Small
        </ButtonIcon>
        <ButtonIcon
          iconOptions={{
            type: "iconWithLabel",
            iconLeft: <IconExample />,
          }}
          size="normal"
        >
          Normal
        </ButtonIcon>
        <ButtonIcon
          iconOptions={{
            type: "iconWithLabel",
            iconLeft: <IconExample />,
          }}
          size="large"
        >
          Large
        </ButtonIcon>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <ButtonIcon
        iconOptions={{ type: "iconOnly", icon: <IconExample /> }}
        disabled
      />
      <ButtonIcon
        iconOptions={{
          type: "iconWithLabel",
          iconLeft: <IconExample />,
        }}
        disabled
      >
        Disabled Button
      </ButtonIcon>
    </div>
  ),
};
