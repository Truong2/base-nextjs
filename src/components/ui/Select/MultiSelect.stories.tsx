import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/Select/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    searchable: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    maxSelected: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const sampleOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "gatsby", label: "Gatsby" },
  { value: "remix", label: "Remix" },
];

const manyOptions = Array.from({ length: 50 }, (_, i) => ({
  value: `option-${i}`,
  label: `Option ${i + 1}`,
}));

// Basic MultiSelect
export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select frameworks...",
  },
};

// MultiSelect with initial values
export const WithInitialValues: Story = {
  args: {
    options: sampleOptions,
    value: ["react", "vue"],
    placeholder: "Select frameworks...",
  },
};

// Disabled MultiSelect
export const Disabled: Story = {
  args: {
    options: sampleOptions,
    value: ["react"],
    placeholder: "Select frameworks...",
    disabled: true,
  },
};

// MultiSelect with max selection limit
export const WithMaxSelection: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select up to 3 frameworks...",
    maxSelected: 3,
  },
};

// MultiSelect without search
export const WithoutSearch: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select frameworks...",
    searchable: false,
  },
};

// MultiSelect without clear button
export const WithoutClear: Story = {
  args: {
    options: sampleOptions,
    value: ["react", "vue"],
    placeholder: "Select frameworks...",
    clearable: false,
  },
};

// MultiSelect with many options
export const WithManyOptions: Story = {
  args: {
    options: manyOptions,
    placeholder: "Select options...",
  },
};

// Interactive MultiSelect
export const Interactive: Story = {
  render: () => {
    const InteractiveMultiSelect = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <div className="space-y-4">
          <MultiSelect
            options={sampleOptions}
            value={selectedValues}
            onChange={setSelectedValues}
            placeholder="Select frameworks..."
          />
          <div className="text-sm text-gray-600">
            Selected:{" "}
            {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
          </div>
        </div>
      );
    };

    return <InteractiveMultiSelect />;
  },
};

// Interactive with max selection
export const InteractiveWithMax: Story = {
  render: () => {
    const InteractiveMaxMultiSelect = () => {
      const [selectedValues, setSelectedValues] = useState<string[]>([]);

      return (
        <div className="space-y-4">
          <MultiSelect
            options={sampleOptions}
            value={selectedValues}
            onChange={setSelectedValues}
            placeholder="Select up to 3 frameworks..."
            maxSelected={3}
          />
          <div className="text-sm text-gray-600">
            Selected:{" "}
            {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
            {selectedValues.length >= 3 && " (Max reached)"}
          </div>
        </div>
      );
    };

    return <InteractiveMaxMultiSelect />;
  },
};

// Multiple MultiSelects
export const MultipleExamples: Story = {
  render: () => {
    const MultipleMultiSelects = () => {
      const [selected1, setSelected1] = useState<string[]>([]);
      const [selected2, setSelected2] = useState<string[]>([]);
      const [selected3, setSelected3] = useState<string[]>([]);

      return (
        <div className="max-w-md space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Basic MultiSelect
            </label>
            <MultiSelect
              options={sampleOptions}
              value={selected1}
              onChange={setSelected1}
              placeholder="Select frameworks..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              With Max Selection (3)
            </label>
            <MultiSelect
              options={sampleOptions}
              value={selected2}
              onChange={setSelected2}
              placeholder="Select up to 3 frameworks..."
              maxSelected={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Without Search
            </label>
            <MultiSelect
              options={sampleOptions}
              value={selected3}
              onChange={setSelected3}
              placeholder="Select frameworks..."
              searchable={false}
            />
          </div>

          <div className="space-y-1 text-sm text-gray-600">
            <div>
              Basic: {selected1.length > 0 ? selected1.join(", ") : "None"}
            </div>
            <div>
              Max 3: {selected2.length > 0 ? selected2.join(", ") : "None"}
            </div>
            <div>
              No Search: {selected3.length > 0 ? selected3.join(", ") : "None"}
            </div>
          </div>
        </div>
      );
    };

    return <MultipleMultiSelects />;
  },
};

// With disabled options
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular", disabled: true },
      { value: "svelte", label: "Svelte" },
      { value: "nextjs", label: "Next.js", disabled: true },
    ],
    placeholder: "Select frameworks...",
  },
};

// Compact version
export const Compact: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select frameworks...",
    className: "w-64",
  },
};

// Large version
export const Large: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select frameworks...",
    className: "w-96",
  },
};
