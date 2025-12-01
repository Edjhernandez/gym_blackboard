import { Routine } from "@/types/types";
import { useCallback } from "react";

export const useCategorySelector = (
  setCategoryInStore: (category: Routine["category"]) => void,
  setCategoryLocalState: (category: Routine["category"]) => void
): ((category: Routine["category"]) => void) => {
  const handleCategoryChange = useCallback(
    (category: Routine["category"]) => {
      setCategoryInStore(category);

      setCategoryLocalState(category);
    },
    [setCategoryInStore, setCategoryLocalState]
  );

  return handleCategoryChange;
};
