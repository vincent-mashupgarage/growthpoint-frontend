"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCounterStore } from "@/stores/counter-store";

/**
 * Counter Demo Component
 *
 * This component demonstrates the integration of:
 * 1. Zustand for state management
 * 2. Radix UI components (Button, Dialog, Dropdown Menu)
 * 3. Tailwind CSS for styling
 *
 * What this component shows:
 * - How to use Zustand hooks to access global state
 * - How to compose Radix UI components together
 * - How state persists across different UI components
 * - Proper TypeScript typing throughout
 *
 * Benefits of this architecture:
 * - State is global and accessible anywhere in the app
 * - UI components are fully accessible and keyboard-navigable
 * - Type-safe with TypeScript autocomplete
 * - Minimal boilerplate code
 * - Easy to test and maintain
 *
 * Usage:
 * Simply import and use this component in any page:
 * ```tsx
 * import CounterDemo from '@/components/shared/counter-demo';
 *
 * export default function Page() {
 *   return <CounterDemo />;
 * }
 * ```
 */
export default function CounterDemo() {
  // Access state and actions from Zustand store
  // Note: We're using selector functions for optimal re-renders
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);
  const setCount = useCounterStore((state) => state.setCount);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">Counter Demo</h1>
        <p className="text-gray-600">
          Demonstrating Zustand + Radix UI + Tailwind CSS
        </p>
      </div>

      {/* Counter Display */}
      <div className="rounded-lg border-4 border-blue-600 bg-blue-50 p-8">
        <p className="text-center text-6xl font-bold text-blue-600">{count}</p>
      </div>

      {/* Basic Counter Controls */}
      <div className="flex gap-4">
        <Button onClick={decrement} variant="outline" size="lg">
          Decrement
        </Button>
        <Button onClick={reset} variant="ghost" size="lg">
          Reset
        </Button>
        <Button onClick={increment} size="lg">
          Increment
        </Button>
      </div>

      {/* Dialog Example */}
      <div className="mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog Example</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Counter Value</DialogTitle>
              <DialogDescription>
                Choose a preset value for the counter. The state will update
                globally across all components.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <Button onClick={() => setCount(10)} variant="outline">
                  Set to 10
                </Button>
                <Button onClick={() => setCount(50)} variant="outline">
                  Set to 50
                </Button>
                <Button onClick={() => setCount(100)} variant="outline">
                  Set to 100
                </Button>
              </div>
            </div>
            <DialogFooter>
              <p className="text-sm text-gray-600">Current count: {count}</p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dropdown Menu Example */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCount(0)}>
              Reset to 0
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCount(count * 2)}>
              Double the value
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCount(Math.floor(count / 2))}>
              Halve the value
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setCount(Math.abs(count))}>
              Make positive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCount(-Math.abs(count))}>
              Make negative
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Info Section */}
      <div className="mt-8 max-w-2xl rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-semibold">Implementation Details</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <strong>State Management:</strong> Zustand store with TypeScript
            interfaces
          </li>
          <li>
            <strong>UI Components:</strong> Radix UI primitives (Dialog,
            Dropdown, Button)
          </li>
          <li>
            <strong>Styling:</strong> Tailwind CSS utility classes
          </li>
          <li>
            <strong>Type Safety:</strong> Full TypeScript coverage with
            autocomplete
          </li>
          <li>
            <strong>Accessibility:</strong> Keyboard navigation, ARIA
            attributes, focus management
          </li>
        </ul>
      </div>
    </div>
  );
}
