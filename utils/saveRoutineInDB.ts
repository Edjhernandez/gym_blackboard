// En tu componente o un servicio de datos
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./../firebaseConfig";
import { Routine } from "./../types/types";

export const saveNewRoutine = async (routine: Routine) => {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("Usuario no autenticado. No se puede guardar la rutina.");
    }

    const newRoutine: Omit<Routine, "id"> = {
      ...routine,
      userId: currentUser.uid,
      createdAt: serverTimestamp() as Timestamp,
    };

    await addDoc(collection(db, "routines"), newRoutine);
  } catch (error) {
    console.error("Error al guardar la rutina:", error);
    throw error;
  }
};
