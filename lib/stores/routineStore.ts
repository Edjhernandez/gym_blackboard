import { Block, Exercise, Routine } from "@/types/types";
import { create } from "zustand";

type RoutineStore = {
  routine: Routine;
  resetRoutine: () => void;
  setName: (name: string) => void;
  setWarmup: (warmup: Exercise[]) => void;
  setEmptyBlock: (block: Block) => void;
  updateBlockById: (blockId: string, listOfExercises: Exercise[]) => void;
  updateBlockArray: (blocks: Block[]) => void;
  setCategory: (category: "functional" | "bodybuilding") => void;
  setExercisesAmount: (amount: number) => void;
  setDurationMinutes: (duration: number) => void;
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

  setEmptyBlock: (block: Block) =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, blocks: [...state.routine.blocks, block] }, // Add a new block to the blocks array
    })),

  updateBlockById: (id: string, listOfExercises: Exercise[]) =>
    set((state) => {
      const updatedBlocks = state.routine.blocks.map((block) => {
        if (block.id === id) {
          return {
            ...block,
            exercises: listOfExercises,
          };
        }

        return block;
      });

      return {
        ...state,
        routine: {
          ...state.routine,
          blocks: updatedBlocks,
        },
      };
    }),

  updateBlockArray: (blocks: Block[]) =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, blocks }, // Replace blocks array with new array
    })),
  setCategory: (category: "functional" | "bodybuilding") =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, category },
    })),
  setExercisesAmount: (amount: number) =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, exercisesAmount: amount },
    })),
  setDurationMinutes: (duration: number) =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, durationMinutes: duration },
    })),
}));

export default useRoutineStore;
