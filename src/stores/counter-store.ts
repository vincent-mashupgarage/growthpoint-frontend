import { create } from "zustand";

/**
 * Counter Store State Interface
 * Defines the shape of the counter store state and actions
 */
interface CounterState {
  // State
  count: number;

  // Actions
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

/**
 * Counter Store
 *
 * A simple example store demonstrating Zustand state management patterns.
 *
 * Benefits of using Zustand:
 * - Minimal boilerplate compared to Redux
 * - No context providers needed
 * - Excellent TypeScript support
 * - Small bundle size (~1kb)
 * - Can be used outside React components
 *
 * Usage:
 * ```tsx
 * import { useCounterStore } from '@/stores/counter-store';
 *
 * function MyComponent() {
 *   const count = useCounterStore((state) => state.count);
 *   const increment = useCounterStore((state) => state.increment);
 *
 *   return <button onClick={increment}>Count: {count}</button>;
 * }
 * ```
 */
export const useCounterStore = create<CounterState>((set) => ({
  // Initial state
  count: 0,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (count: number) => set({ count }),
}));
