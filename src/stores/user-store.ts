import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * User Interface
 * Represents a user object in the application
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * User Store State Interface
 * Defines the shape of the user store state and actions
 */
interface UserState {
  // State
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

/**
 * User Store with Persistence
 *
 * Demonstrates advanced Zustand patterns:
 * - Persist middleware for localStorage persistence
 * - Complex state management
 * - TypeScript typing for state and actions
 *
 * Benefits of the persist middleware:
 * - Automatically saves state to localStorage
 * - Rehydrates state on page reload
 * - Configurable storage (localStorage, sessionStorage, etc.)
 * - Selective state persistence
 *
 * Usage:
 * ```tsx
 * import { useUserStore } from '@/stores/user-store';
 *
 * function Profile() {
 *   const { user, isAuthenticated, logout } = useUserStore();
 *
 *   if (!isAuthenticated) return <Login />;
 *   return <div>Welcome, {user?.name}!</div>;
 * }
 * ```
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,

      // Actions
      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: "user-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Storage type
      // Optional: Only persist specific fields
      // partialize: (state) => ({ user: state.user }),
    }
  )
);
