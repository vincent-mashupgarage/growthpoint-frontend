# GrowthPoint Frontend

A modern, production-ready Next.js application built with TypeScript, Radix UI, Zustand, and Tailwind CSS.

## Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router for server-side rendering, routing, and optimizations
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with enhanced IDE support

### UI & Styling

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-dropdown-menu` - Dropdown menus
  - `@radix-ui/react-select` - Select inputs
  - `@radix-ui/react-tabs` - Tab components
  - `@radix-ui/react-tooltip` - Tooltips
  - `@radix-ui/react-slot` - Component composition
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[clsx](https://github.com/lukeed/clsx)** + **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class name utilities

### State Management

- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management (~1kb)
  - Simple API with minimal boilerplate
  - Excellent TypeScript support
  - Middleware support (persist, devtools, etc.)

### Code Quality

- **[ESLint](https://eslint.org/)** - Code linting with Next.js config
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)** - Maximum type safety

## Project Structure

```
growthpoint-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Radix UI wrapper components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── dropdown-menu.tsx
│   │   └── shared/            # Shared application components
│   │       └── counter-demo.tsx
│   ├── stores/                # Zustand state stores
│   │   ├── counter-store.ts   # Example: Counter store
│   │   └── user-store.ts      # Example: User store with persistence
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # cn() class merger utility
│   ├── types/                 # TypeScript type definitions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── .prettierrc               # Prettier configuration
├── .prettierignore           # Prettier ignore patterns
├── eslint.config.mjs         # ESLint configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

### Development

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

The page auto-updates as you edit files. Start by modifying `src/app/page.tsx`.

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn lint:fix     # Run ESLint with auto-fix
yarn format       # Format code with Prettier
yarn format:check # Check code formatting
```

## Key Features & Patterns

### 1. Type-Safe State Management (Zustand)

**Why Zustand:**

- Minimal boilerplate compared to Redux
- No context providers needed
- Excellent TypeScript support
- Small bundle size (~1kb)
- Can be used outside React components

**Example:**

```typescript
// stores/counter-store.ts
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// In component
import { useCounterStore } from '@/stores/counter-store';

function MyComponent() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return <button onClick={increment}>Count: {count}</button>;
}
```

### 2. Accessible UI Components (Radix UI)

**Why Radix UI:**

- Fully accessible (ARIA, keyboard navigation, focus management)
- Unstyled - complete design control
- Composable with excellent TypeScript support
- Production-ready primitives

**Example:**

```typescript
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <h2>Dialog Title</h2>
    <p>Dialog content here</p>
  </DialogContent>
</Dialog>
```

### 3. Utility-First Styling (Tailwind CSS)

**Benefits:**

- Rapid development with utility classes
- Consistent design system
- Responsive design built-in
- Automatic purging of unused CSS

**Class Merging Utility:**

```typescript
import { cn } from '@/lib/utils';

// Properly merges Tailwind classes, handling conflicts
<div className={cn("px-2 py-1", condition && "bg-blue-500", "px-4")}>
  // Result: "py-1 bg-blue-500 px-4" (px-4 overrides px-2)
</div>
```

### 4. Next.js App Router

**Benefits:**

- React Server Components by default
- Improved performance with streaming
- Better SEO with server-side rendering
- File-based routing
- Built-in optimization (images, fonts, scripts)

## Component Documentation

### UI Components

All UI components are located in `src/components/ui/` and are built on Radix UI primitives:

- **Button** - Flexible button with variants (default, destructive, outline, ghost)
- **Dialog** - Modal dialogs with animations and accessibility
- **Dropdown Menu** - Context menus with keyboard navigation

Each component includes:

- Full TypeScript types
- Accessibility features (ARIA, keyboard nav)
- Tailwind CSS styling
- Comprehensive documentation in code comments

### Example Components

- **CounterDemo** (`src/components/shared/counter-demo.tsx`) - Demonstrates integration of Zustand + Radix UI + Tailwind

## State Management Patterns

### Basic Store

```typescript
// Simple store with actions
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Store with Persistence

```typescript
// Persists to localStorage automatically
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "user-storage" }
  )
);
```

## Best Practices

1. **TypeScript**: Always define interfaces for props and state
2. **Components**: Keep components small and focused
3. **State**: Use Zustand selectors to prevent unnecessary re-renders
4. **Styling**: Use Tailwind utilities, extract repeated patterns to components
5. **Accessibility**: Always use Radix UI for interactive components
6. **Code Quality**: Run `yarn lint:fix` and `yarn format` before committing

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your app will be deployed with each push to main

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Self-hosted with Docker

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## License

MIT
