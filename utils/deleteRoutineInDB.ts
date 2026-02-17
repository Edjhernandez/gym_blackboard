import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./../firebaseConfig";

export const deleteRoutineById = async (routineId: string): Promise<void> => {
  try {
    const routineRef = doc(db, "routines", routineId);
    await deleteDoc(routineRef);
  } catch (error) {
    console.error("Error al eliminar la rutina:", error);
    throw error;
  }
};
