import { User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User;
  resetUser: () => void;
  setUser: (user: User) => void;
};

const initialUser: User = {
  id: "",
  name: "",
  photoURL: "",
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      resetUser: () => set({ user: initialUser }),

      setUser: (user: User) => set({ user }),
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
