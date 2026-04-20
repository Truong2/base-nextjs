# Storybook Setup for Next.js 15 + React 19

This project has been configured with Storybook 8.0.0 to showcase UI components with full compatibility for React 19 and Next.js 15.

## 🚀 Quick Start

### Running Storybook

```bash
# Start Storybook development server
yarn storybook

# Build Storybook for production
yarn build-storybook
```

Storybook will be available at `http://localhost:6006`

## 📁 Configuration Files

### `.storybook/main.ts`

- Main Storybook configuration
- Configured for Next.js 15 compatibility
- Includes webpack configuration for .mp4 file support
- Uses TypeScript configuration

### `.storybook/preview.ts`

- Global preview configuration
- Imports global CSS styles
- Configures controls and backgrounds
- Sets up default parameters

### `.storybook/manager.ts`

- Storybook UI customization
- Light theme configuration
- Sidebar settings

## 🎨 Available UI Components

The following components have been documented with comprehensive stories:

### 1. Button (`src/components/ui/Button/`)

- **Variants**: Primary, CTA, Outline, Outline White
- **Sizes**: Small, Normal, Large
- **States**: Default, Disabled, With Icons
- **Stories**: All variants showcase, interactive controls

### 2. Input (`src/components/ui/Input/`)

- **Types**: Text, Email, Password, Number, Tel, URL
- **States**: Default, Disabled, With Value
- **Features**: Placeholder support, validation states
- **Stories**: All input types, with labels, form examples

### 3. Checkbox (`src/components/ui/Checkbox/`)

- **States**: Unchecked, Checked, Disabled, Error
- **Features**: With labels, multiple checkboxes
- **Stories**: Individual states, grouped examples

### 4. Select (`src/components/ui/Select/`)

- **Features**: Single select, grouped options, default values
- **Variants**: Standard trigger, button trigger
- **Stories**: Basic usage, with groups, disabled state

### 5. ProgressBar (`src/components/ui/ProgressBar/`)

- **Features**: Customizable progress values (0-100%)
- **Variants**: With prefix/suffix, custom colors
- **Stories**: Different progress states, animated example

### 6. Tabs (`src/components/ui/Tabs/`)

- **Features**: Single/multiple selection, swipe support
- **Content**: Rich content examples, default values
- **Stories**: Basic tabs, with rich content, responsive design

### 7. Accordion (`src/components/ui/Accordion/`)

- **Types**: Single, Multiple selection
- **Features**: Collapsible, default values
- **Stories**: FAQ examples, different configurations

## 🛠️ Development

### Adding New Component Stories

1. Create a new story file: `ComponentName.stories.tsx`
2. Follow the pattern:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Define your component props here
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  render: () => <ComponentName />,
};

export const WithProps: Story = {
  render: () => <ComponentName prop="value" />,
};
```

### Best Practices

1. **Use `tags: ["autodocs"]`** for automatic documentation generation
2. **Include `layout: "centered"`** for better component presentation
3. **Add comprehensive `argTypes`** for interactive controls
4. **Create multiple stories** to showcase different states and variants
5. **Use descriptive story names** that explain the component's purpose

### Component Organization

- All UI components are in `src/components/ui/`
- Each component has its own directory
- Story files are co-located with components
- Stories follow the naming convention: `ComponentName.stories.tsx`

## 🔧 Technical Details

### Dependencies

- **Storybook**: 8.0.0
- **React**: 19.1.0
- **Next.js**: 15.4.4
- **TypeScript**: 5.1.6

### Webpack Configuration

- Custom webpack configuration for .mp4 file support
- Compatible with Next.js 15 webpack setup
- Optimized for development and production builds

### Styling

- Tailwind CSS integration
- Global styles imported in preview
- Responsive design support
- Dark/light theme backgrounds

## 📚 Storybook Features

### Interactive Controls

- Real-time prop manipulation
- Type-safe controls
- Custom control types (color picker, range slider)

### Documentation

- Automatic documentation generation
- Component prop tables
- Usage examples
- Accessibility information

### Testing

- Storybook Testing Library integration
- Component interaction testing
- Visual regression testing support

## 🚀 Deployment

### Chromatic Integration

```bash
# Deploy to Chromatic for visual testing
yarn chromatic
```

### Static Build

```bash
# Build static files
yarn build-storybook

# Serve static build
npx serve storybook-static
```

## 🎯 Next Steps

1. **Add more component stories** for remaining UI components
2. **Implement visual regression testing** with Chromatic
3. **Add accessibility testing** with Storybook accessibility addon
4. **Create component documentation** with MDX files
5. **Set up CI/CD** for automatic Storybook deployment

## 📖 Resources

- [Storybook Documentation](https://storybook.js.org/)
- [Next.js Storybook Integration](https://storybook.js.org/docs/frameworks/nextjs)
- [React 19 Compatibility](https://react.dev/)
- [TypeScript with Storybook](https://storybook.js.org/docs/typescript/introduction)
