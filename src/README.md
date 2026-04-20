# Frontend Next.js Project

## 📋 Tổng quan dự án

Đây là một dự án website hiện đại được xây dựng với **Next.js 15**, **TypeScript**, và **Tailwind CSS**. Dự án hỗ trợ đa ngôn ngữ (i18n) với next-intl và được thiết kế với kiến trúc component-based modular.

## 🏗️ Kiến trúc dự án

### Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router
│   └── (website)/         # Route group cho website
│       └── [lang]/        # Dynamic route cho ngôn ngữ
│           ├── layout.tsx  # Layout chính với i18n
│           ├── page.tsx    # Trang chủ
│           ├── about/      # Trang About
│           └── [...rest]/  # Catch-all route
├── assets/                # Tài nguyên tĩnh
│   ├── fonts/            # Font files
│   ├── images/           # Hình ảnh
│   └── svg/              # SVG icons
├── components/           # React components
│   ├── layout/          # Layout components (Header, Footer)
│   ├── modules/         # Page-specific components
│   ├── providers/       # Context providers
│   └── ui/              # Reusable UI components
├── constants/           # Constants và configurations
├── i18n/               # Internationalization utilities
├── lib/                # External library configurations
├── services/           # API services và HTTP client
├── styles/             # Global CSS styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🚀 Công nghệ sử dụng

### Core Technologies

- **Next.js 15** - React framework với App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - UI library

### UI & Styling

- **Radix UI** - Accessible UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variants

### Internationalization

- **next-intl** - Internationalization cho Next.js
- Hỗ trợ: English (en), Japanese (ja)

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Storybook** - Component documentation
- **Husky** - Git hooks
- **Sentry** - Error monitoring

### State Management & Data

- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🌐 Internationalization (i18n)

### Cấu hình ngôn ngữ

```typescript
// src/navigation.ts
export const LANGUAGE = {
  EN: "en",
  JA: "ja",
} as const;
```

### Sử dụng translation

```typescript
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations();

  return <h1>{t("homepage.hero.title")}</h1>;
}
```

### Thêm ngôn ngữ mới

1. Thêm vào `src/navigation.ts`
2. Tạo file translation trong `messages/[lang].json`
3. Cập nhật `languageLabels`

## 🎨 UI Components

### Design System

Dự án sử dụng custom design system với Tailwind CSS:

```typescript
// Custom colors trong tailwind.config.ts
colors: {
  navy: { DEFAULT: "#288EA2", "500": "#1D748D" },
  orange: { DEFAULT: "#FBAF66", "500": "#F19D45" },
  primary: { dark: "#258DA2", light: "#7DCFD6" },
  secondary: { DEFAULT: "#194440", light: "#476966" },
}
```

### Component Variants

```typescript
// Button component với variants
<Button variant="primary" size="large">
  Get Started
</Button>

<Button variant="outline" size="normal">
  Learn More
</Button>
```

## 🔧 Environment Variables

### Server-side

```env
NODE_ENV=development|test|production
```

### Client-side

```env
NEXT_PUBLIC_ENV=development|staging|production
NEXT_PUBLIC_API_ENDPOINT=https://api.example.com
```

## 📦 Scripts

### Development

```bash
yarn dev          # Chạy development server
yarn build        # Build production
yarn start        # Chạy production server
```

### Code Quality

```bash
yarn lint         # Lint và fix code
yarn lint:check   # Chỉ check lint
yarn format       # Format code với Prettier
```

### Storybook

```bash
yarn storybook    # Chạy Storybook
yarn build-storybook  # Build Storybook
```

## 🛠️ Cách sử dụng

### 1. Cài đặt dependencies

```bash
yarn install
```

### 2. Cấu hình environment

Tạo file `.env.local`:

```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3001/api
```

### 3. Chạy development server

```bash
yarn dev
```

### 4. Truy cập website

- English: `http://localhost:3000/en`
- Japanese: `http://localhost:3000/ja`

## 📁 Tạo component mới

### 1. UI Component

```typescript
// src/components/ui/MyComponent/MyComponent.tsx
import { cn } from "~/utils/utils";

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  );
}
```

### 2. Module Component

```typescript
// src/components/modules/MyModule/index.tsx
"use client";

import { useTranslations } from "next-intl";

export function MyModuleClient() {
  const t = useTranslations();

  return (
    <section className="py-20">
      <h1>{t("mymodule.title")}</h1>
    </section>
  );
}
```

### 3. Page Component

```typescript
// src/app/(website)/[lang]/mypage/page.tsx
import { setRequestLocale } from "next-intl/server";
import { MyModuleClient } from "~/components/modules/MyModule";

export default async function MyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <MyModuleClient />;
}
```

## 🔄 State Management

### TanStack Query

```typescript
// src/services/api.ts
import { useQuery } from "@tanstack/react-query";

export function useUserData(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
}
```

### React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

## 🎯 Best Practices

### 1. Type Safety

- Sử dụng TypeScript cho tất cả components
- Định nghĩa interfaces cho props
- Sử dụng Zod cho validation

### 2. Performance

- Sử dụng Next.js Image component
- Implement proper loading states
- Optimize bundle size với dynamic imports

### 3. Accessibility

- Sử dụng Radix UI primitives
- Implement proper ARIA labels
- Test với screen readers

### 4. Internationalization

- Tất cả text phải sử dụng translation keys
- Không hardcode strings
- Test với các ngôn ngữ khác nhau

## 🚨 Error Handling

### Sentry Integration

Dự án đã tích hợp Sentry cho error monitoring:

```typescript
// Tự động capture errors
import * as Sentry from "@sentry/nextjs";

// Manual error reporting
Sentry.captureException(error);
```

## 📊 Monitoring & Analytics

### Performance Monitoring

- Sentry performance monitoring
- Next.js built-in analytics
- Custom performance metrics

## 🔐 Security

### Environment Variables

- Server-side variables không exposed ra client
- Client-side variables prefix với `NEXT_PUBLIC_`
- Validation với Zod schema

### API Security

- CORS configuration
- Rate limiting
- Input validation với Zod

## 🧪 Testing

### Component Testing

```bash
# Chạy Storybook để test components
yarn storybook
```

### E2E Testing

```bash
# Setup Playwright hoặc Cypress
# (cần thêm vào project)
```

## 📈 Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically

### Docker

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

## 🤝 Contributing

### Code Style

- Sử dụng ESLint và Prettier
- Follow TypeScript best practices
- Write meaningful commit messages

### Git Workflow

1. Create feature branch
2. Make changes
3. Run linting và formatting
4. Create pull request
5. Code review
6. Merge

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

## 🆘 Support

Nếu có vấn đề hoặc câu hỏi:

1. Kiểm tra documentation
2. Tìm trong existing issues
3. Tạo new issue với detailed description
4. Contact development team
