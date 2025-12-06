import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../firebaseConfig";

export const updateFavoriteField = async (
  id: string,
  newFieldValue: boolean
) => {
  // 1. Crea una referencia al documento específico de la rutina
  // 'rutinas' es el nombre de tu colección
  const routineRef = doc(db, "routines", id);

  try {
    // 2. Usa updateDoc para cambiar el campo 'esFavorita'
    await updateDoc(routineRef, {
      isFavorite: newFieldValue,
    });
  } catch (error) {
    console.error(error);
  }
};
