import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./index";

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<any>;

const sampleItems = [
  {
    id: 1,
    title: "Slide 1",
    content: "This is the first slide content",
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Slide 2",
    content: "This is the second slide content",
    color: "bg-green-100",
  },
  {
    id: 3,
    title: "Slide 3",
    content: "This is the third slide content",
    color: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Slide 4",
    content: "This is the fourth slide content",
    color: "bg-red-100",
  },
  {
    id: 5,
    title: "Slide 5",
    content: "This is the fifth slide content",
    color: "bg-purple-100",
  },
];

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Carousel>
        <CarouselContent>
          {sampleItems.map(item => (
            <CarouselItem key={item.id}>
              <div className={`rounded-lg p-6 ${item.color}`}>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Carousel orientation="vertical" className="w-full max-w-xs">
        <CarouselContent>
          {sampleItems.map(item => (
            <CarouselItem key={item.id}>
              <div className={`rounded-lg p-6 ${item.color}`}>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const WithoutNavigation: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Carousel>
        <CarouselContent>
          {sampleItems.map(item => (
            <CarouselItem key={item.id}>
              <div className={`rounded-lg p-6 ${item.color}`}>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
};

export const CustomNavigation: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Carousel>
        <CarouselContent>
          {sampleItems.map(item => (
            <CarouselItem key={item.id}>
              <div className={`rounded-lg p-6 ${item.color}`}>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="primary" />
        <CarouselNext variant="primary" />
      </Carousel>
    </div>
  ),
};

export const ImageCarousel: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map(index => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="overflow-hidden rounded-lg">
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-2xl font-bold text-white">
                    Image {index}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleSlides: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sampleItems.map(item => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 pl-2 md:basis-1/3 md:pl-4 lg:basis-1/4"
            >
              <div className={`rounded-lg p-6 ${item.color}`}>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
