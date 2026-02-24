import { User } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

      setUser: (user: User) => {
        try {
          set({ user });
        } catch (error) {
          console.error("Error persistiendo el usuario:", error);
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
