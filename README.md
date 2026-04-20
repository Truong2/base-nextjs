# Base Next.js Source

Dự án frontend sử dụng [Next.js 15](https://nextjs.org/) + TypeScript + Tailwind CSS, tổ chức theo hướng module và reusable UI components.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (state management)
- TanStack Query (server state)
- Storybook 8 (UI development)

## Yêu Cầu Môi Trường

- Node.js >= 20
- Yarn `1.22.22` (theo `packageManager` trong `package.json`)

## Cài Đặt

```bash
yarn install
```

## Chạy Dự Án

```bash
yarn dev
```

Mặc định app chạy local tại: `http://localhost:3000`

## Biến Môi Trường

Project đang dùng các file:

- `.env`
- `.env.development`
- `.env.staging`
- `.env.production`

Các biến quan trọng:

- `NEXT_PUBLIC_ENV` (`development | staging | production`)
- `NEXT_PUBLIC_API_ENDPOINT` (API base URL)

## Scripts Chính

- `yarn dev`: chạy local bằng Turbopack
- `yarn build`: build production
- `yarn start`: chạy bản build
- `yarn lint`: lint và auto-fix
- `yarn lint:check`: lint không sửa
- `yarn format`: format code trong `src`
- `yarn storybook`: chạy Storybook tại cổng `6006`
- `yarn build-storybook`: build static Storybook

## Cấu Trúc Thư Mục

- `src/app`: route, layout và page theo App Router
- `src/components`: component dùng chung và theo module nghiệp vụ
- `src/services`: lớp gọi API / HTTP clients
- `src/store`: state toàn cục (Zustand)
- `src/constants`: hằng số và config dùng lại
- `src/styles`: global styles và style theo nhóm
- `src/assets`: ảnh, svg, fonts
- `src/types`: kiểu dữ liệu dùng chung
- `src/utils`: helper functions
- `tools`: script/tool nội bộ (ví dụ localization)

## Quy Ước Source

- Ưu tiên tái sử dụng component trong `src/components/ui`
- Tách logic xử lý vào hooks, hạn chế nhồi logic trong UI component
- Dùng alias `~/*` để import thay vì relative path dài
- Chạy lint/format trước khi commit

## Lưu Ý Bảo Mật

- Không commit secrets/tokens vào git (đặc biệt trong `tools/localization`)
- Nếu cần chia sẻ cấu hình, tạo file mẫu `.example` thay vì commit file thật
