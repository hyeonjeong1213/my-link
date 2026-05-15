# Gemini CLI Project Context: my-app

This project is a modern web application built with **Next.js 16** and **React 19**, utilizing the **App Router** architecture. It is configured with **TypeScript** and **Tailwind CSS 4** for styling.

## Project Overview

- **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Library:** [React 19.2.3](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Fonts:** [Geist](https://vercel.com/font) (Sans and Mono) integrated via `next/font`.
- **Linting:** [ESLint 9+](https://eslint.org/) with flat configuration (`eslint.config.mjs`).

### Directory Structure

- `app/`: Contains the application routes, layouts, and global styles.
  - `layout.tsx`: Root layout defining the HTML structure and font variables.
  - `page.tsx`: The main landing page.
  - `globals.css`: Global CSS including Tailwind CSS 4 imports and theme definitions.
- `public/`: Static assets like SVG icons and logos.
- `next.config.ts`: Next.js specific configuration.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.

## Building and Running

The following scripts are available via `npm`:

- **Development:** `npm run dev` - Starts the Next.js development server with hot reloading.
- **Build:** `npm run build` - Compiles the application for production.
- **Start:** `npm run start` - Runs the compiled production build.
- **Lint:** `npm run lint` - Executes ESLint to check for code quality and style issues.

## Development Conventions

- **App Router:** All new routes should be added as directories within the `app/` folder with a `page.tsx` file.
- **Styling:** Use Tailwind CSS utility classes. Custom theme variables are defined in `app/globals.css` using the `@theme` block.
- **TypeScript:** Strict type checking is enabled. Ensure all new components and functions are properly typed.
- **Components:** Favor React Server Components (RSC) by default. Use `'use client'` only when client-side interactivity (state, effects, event listeners) is required.
- **Icons/Images:** Use the `next/image` component for optimized image loading.
- **Linting:** Follow the rules defined in `eslint.config.mjs`, which includes `core-web-vitals` and `typescript` configurations.
