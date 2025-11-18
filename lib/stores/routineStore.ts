import { Routine } from "@/types/types";
import { create } from "zustand";

type RoutineStore = {
  routine: Routine;
  setName: (name: string) => void;
};

const initialRoutine: Routine = {
  id: "",
  name: "",
  details: "",
  durationMinutes: 0,
  category: "functional",
  warmup: [],
  blocks: [],
};

const useRoutineStore = create<RoutineStore>()((set) => ({
  routine: initialRoutine,
  setName: (name: string) =>
    set((state) => ({ ...state, routine: { ...state.routine, name } })),
}));

export default useRoutineStore;
