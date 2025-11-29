export const formatRoutineDetails = (
  t: (key: string, options?: { [key: string]: any }) => string,
  exercisesAmount: number,
  durationMinutes: number
) =>
  `${t("home.exercises_amount", { count: exercisesAmount })} , ${t("home.duration_minutes", { count: durationMinutes })}`;
