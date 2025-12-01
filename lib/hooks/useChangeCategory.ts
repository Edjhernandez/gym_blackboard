import { useState } from "react";
import useRoutineStore from "../stores/routineStore";

export const useChangeCategory = () => {
  const { setCategory } = useRoutineStore();
  const [routineCategory, setRoutineCategory] = useState<
    "functional" | "bodybuilding"
  >("functional");

  setCategory(routineCategory);
  setRoutineCategory(routineCategory);
};
