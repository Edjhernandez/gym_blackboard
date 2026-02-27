import { Block, Exercise, Routine } from "@/types/types";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { create } from "zustand";

type RoutineStore = {
  routine: Routine;
  resetRoutine: () => void;
  setName: (name: string) => void;
  setWarmup: (warmup: { exercises: Exercise[]; rounds: number }) => void;
  setEmptyBlock: (block: Block) => void;
  updateBlockById: (
    blockId: string,
    listOfExercises: Exercise[],
    rounds: number,
  ) => void;
  updateBlockArray: (blocks: Block[]) => void;
  setCategory: (category: "functional" | "bodybuilding") => void;
};

const initialRoutine: Routine = {
  id: "",
  name: "",
  exercisesAmount: 0,
  durationMinutes: 0,
  isFavorite: false,
  category: "functional",
  warmup: { exercises: [], rounds: 1 },
  blocks: [],
  createdAt: serverTimestamp() as Timestamp,
  userId: "",
  coachName: "",
  coachPhotoURL: "",
};

const useRoutineStore = create<RoutineStore>()((set) => ({
  routine: initialRoutine,
  resetRoutine: () =>
    set(() => ({
      routine: initialRoutine, // routine back to initial state
    })),

  setName: (name: string) =>
    set((state) => ({ ...state, routine: { ...state.routine, name } })),

  setWarmup: (warmup: { exercises: Exercise[]; rounds: number }) =>
    set((state) => ({ ...state, routine: { ...state.routine, warmup } })),

  setEmptyBlock: (block: Block) =>
    set((state) => ({
      ...state,
      routine: { ...state.routine, blocks: [...state.routine.blocks, block] }, // Add a new block to the blocks array
    })),

  updateBlockById: (id: string, listOfExercises: Exercise[], rounds: number) =>
    set((state) => {
      const updatedBlocks = state.routine.blocks.map((block) => {
        if (block.id === id) {
          return {
            ...block,
            exercises: listOfExercises,
            rounds: rounds,
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
}));

export default useRoutineStore;
