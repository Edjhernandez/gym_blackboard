import { Routine } from "@/types/types";

export function estimateRoutineDuration(routine: Routine): number {
  const minutesPerSeries = routine.category === "functional" ? 1 : 0.5;
  const minutesPerRest = routine.category === "functional" ? 0.3 : 2;
  let totalSeries = 0;
  routine.blocks.forEach((block) => {
    block.exercises.forEach((exercise) => {
      totalSeries += exercise.sets || 0;
    });
  });
  const variableTimeMinutes = totalSeries * (minutesPerSeries + minutesPerRest);

  const totalDuration = 15 + variableTimeMinutes; // 15 minutes base time for warmup and its rest

  return Math.round(totalDuration);
}
