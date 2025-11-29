import { Block } from "@/types/types";

export function calculateTotalExercises(blocks: Block[]): number {
  return blocks.reduce((acc, block) => {
    const exercisesInBlock = block.exercises.length;
    return acc + exercisesInBlock;
  }, 0);
}
