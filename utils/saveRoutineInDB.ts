import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./../firebaseConfig";
import { Routine } from "./../types/types";
import { calculateTotalExercises } from "./amountOfExercises";
import { estimateRoutineDuration } from "./routineTime";

export const saveNewRoutine = async (routine: Routine) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User not authenticated. Cannot save routine.");
    }

    const { id, ...routineWithoutId } = routine;

    const newRoutine: Omit<Routine, "id"> = {
      ...routineWithoutId,
      userId: currentUser.uid,
      createdAt: serverTimestamp() as Timestamp,
      exercisesAmount: calculateTotalExercises(routine.blocks),
      durationMinutes: estimateRoutineDuration(routine),
    };

    await addDoc(collection(db, "routines"), newRoutine);
  } catch (error) {
    console.error("Error saving routine:", error);
    throw error;
  }
};
