import { Routine } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../firebaseConfig";

export const getRoutineById = async (
  routineId: string
): Promise<Routine | null> => {
  try {
    const routineRef = doc(db, "routines", routineId);
    const routineSnap = await getDoc(routineRef);

    if (routineSnap.exists()) {
      return { ...routineSnap.data(), id: routineSnap.id } as Routine;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting routine:", error);
    throw error;
  }
};
