import { User } from "@/types/types";
import { create } from "zustand";

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

const useUserStore = create<UserStore>()((set) => ({
  user: initialUser,

  resetUser: () => set({ user: initialUser }),

  setUser: (user) =>
    set({
      user: {
        id: user.id,
        name: user.name,
        photoURL: user.photoURL,
      },
    }),
}));

export default useUserStore;
