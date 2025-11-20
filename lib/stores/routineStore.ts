import { Block, Exercise, Routine } from "@/types/types";
import { create } from "zustand";

type RoutineStore = {
  routine: Routine;
  resetRoutine: () => void;
  setName: (name: string) => void;
  setWarmup: (warmup: Exercise[]) => void;
  setBlocks: (block: Block) => void;
};

const initialRoutine: Routine = {
  id: "",
  name: "",
  exercisesAmount: 0,
  durationMinutes: 0,
  isFavorite: false,
  category: "functional",
  warmup: [],
  blocks: [],
};

const useRoutineStore = create<RoutineStore>()((set) => ({
  routine: initialRoutine,
  resetRoutine: () =>
    set(() => ({
      routine: initialRoutine, // routine back to initial state
    })),
  setName: (name: string) =>
    set((state) => ({ ...state, routine: { ...state.routine, name } })),
  setWarmup: (warmup: Exercise[]) =>
    set((state) => ({ ...state, routine: { ...state.routine, warmup } })),
  setBlocks: (block: Block) =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, blocks: [...state.routine.blocks, block] },
    })),
}));

export default useRoutineStore;
