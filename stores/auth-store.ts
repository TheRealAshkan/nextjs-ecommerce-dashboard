import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login - in production connect to API
        if (email === "admin@example.com" && password === "admin123") {
          const user: User = {
            id: "1",
            name: "اشکان مهدی زاده",
            email: "admin@example.com",
            role: "admin",
            status: "active",
            createdAt: "2024-01-15",
            lastLogin: new Date().toISOString().split("T")[0],
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: "auth-storage",
    }
  )
);
