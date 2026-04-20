import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContentWrapper,
  TabsContent,
  SegmentedControl,
} from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  {
    value: "tab1",
    title: <>Tab 1</>,
    content: <>Tab 1 Content</>,
  },
  {
    value: "tab2",
    title: <>Tab 2</>,
    content: <>Tab 2 Content</>,
  },
  {
    value: "tab3",
    title: <>Tab 3</>,
    content: <>Tab 3 Content</>,
  },
];

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" tabs={sampleTabs}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContentWrapper>
        <TabsContent value="tab1">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tab 1 Content</h3>
            <p>This is the content for tab 1.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tab 2 Content</h3>
            <p>This is the content for tab 2.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tab 3 Content</h3>
            <p>This is the content for tab 3.</p>
          </div>
        </TabsContent>
      </TabsContentWrapper>
    </Tabs>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Tabs defaultValue="tab2" tabs={sampleTabs}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContentWrapper>
        <TabsContent value="tab1">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tab 1 Content</h3>
            <p>This is the content for tab 1.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tab 2 Content</h3>
            <p>This is the content for tab 2.</p>
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tab 3 Content</h3>
            <p>This is the content for tab 3.</p>
          </div>
        </TabsContent>
      </TabsContentWrapper>
    </Tabs>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Tabs
      defaultValue="overview"
      tabs={[
        {
          value: "overview",
          title: <>Overview</>,
          content: <>Overview Content</>,
        },
        {
          value: "features",
          title: <>Features</>,
          content: <>Features Content</>,
        },
        {
          value: "pricing",
          title: <>Pricing</>,
          content: <>Pricing Content</>,
        },
      ]}
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContentWrapper>
        <TabsContent value="overview">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Overview</h3>
            <p className="text-gray-600">
              Learn about our amazing product and its capabilities.
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Easy to use interface</li>
              <li>Powerful features</li>
              <li>24/7 support</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="features">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Feature 1</h4>
                <p className="text-sm text-gray-600">
                  Description of feature 1
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Feature 2</h4>
                <p className="text-sm text-gray-600">
                  Description of feature 2
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="pricing">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing Plans</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <h4 className="font-medium">Basic</h4>
                <p className="text-2xl font-bold">$9/month</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h4 className="font-medium">Pro</h4>
                <p className="text-2xl font-bold">$19/month</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h4 className="font-medium">Enterprise</h4>
                <p className="text-2xl font-bold">$49/month</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </TabsContentWrapper>
    </Tabs>
  ),
};

// Segmented Control Component
export const SegmentedControlStory: Story = {
  render: () => {
    const SegmentedControlDemo = () => {
      const [activeTab, setActiveTab] = useState("week");

      const items = [
        {
          value: "day",
          label: "Day",
          content: (
            <div className="rounded-lg border border-gray-200 bg-blue-50 p-4">
              <h4 className="mb-2 font-medium text-blue-900">Daily View</h4>
              <p className="text-sm text-blue-700">
                Showing detailed information for each day with hourly
                breakdowns.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold">24</div>
                  <div>Hours</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">1440</div>
                  <div>Minutes</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">86400</div>
                  <div>Seconds</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          value: "week",
          label: "Week",
          content: (
            <div className="rounded-lg border border-gray-200 bg-green-50 p-4">
              <h4 className="mb-2 font-medium text-green-900">Weekly View</h4>
              <p className="text-sm text-green-700">
                Showing aggregated data for the entire week with daily
                summaries.
              </p>
              <div className="mt-3 grid grid-cols-7 gap-1 text-xs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <div key={day} className="text-center">
                    <div className="font-semibold">{day}</div>
                    <div className="text-green-600">✓</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          value: "month",
          label: "Month",
          content: (
            <div className="rounded-lg border border-gray-200 bg-purple-50 p-4">
              <h4 className="mb-2 font-medium text-purple-900">Monthly View</h4>
              <p className="text-sm text-purple-700">
                Showing monthly overview with weekly summaries and trends.
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                {["Week 1", "Week 2", "Week 3", "Week 4"].map(week => (
                  <div key={week} className="text-center">
                    <div className="font-semibold">{week}</div>
                    <div className="text-purple-600">📊</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
      ];

      const handleChange = (value: string) => {
        setActiveTab(value);
      };

      return (
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Segmented Control with Content
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Segmented control that includes content for each tab option
            </p>
          </div>

          {/* Basic Usage with Content */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">With Content:</h4>
            <SegmentedControl
              items={items}
              activeTab={activeTab}
              onChange={handleChange}
              showContent={true}
            />
          </div>

          {/* Without Content */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Without Content:</h4>
            <SegmentedControl
              items={items}
              activeTab={activeTab}
              onChange={handleChange}
              showContent={false}
            />
          </div>

          {/* Custom Styling with Content */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Custom Styling with Content:
            </h4>
            <SegmentedControl
              items={items}
              activeTab={activeTab}
              onChange={handleChange}
              showContent={true}
              className="border-gray-300 bg-gray-50"
            />
          </div>

          {/* Different Items with Content */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Different Items with Content:
            </h4>
            <SegmentedControl
              items={[
                {
                  value: "today",
                  label: "Today",
                  content: (
                    <div className="rounded border bg-yellow-50 p-3 text-yellow-800">
                      Today's special content
                    </div>
                  ),
                },
                {
                  value: "week",
                  label: "This Week",
                  content: (
                    <div className="rounded border bg-blue-50 p-3 text-blue-800">
                      This week's content
                    </div>
                  ),
                },
                {
                  value: "month",
                  label: "This Month",
                  content: (
                    <div className="rounded border bg-green-50 p-3 text-green-800">
                      This month's content
                    </div>
                  ),
                },
                {
                  value: "quarter",
                  label: "This Quarter",
                  content: (
                    <div className="rounded border bg-purple-50 p-3 text-purple-800">
                      This quarter's content
                    </div>
                  ),
                },
              ]}
              activeTab={activeTab}
              onChange={handleChange}
              showContent={true}
            />
          </div>
        </div>
      );
    };

    return <SegmentedControlDemo />;
  },
};
