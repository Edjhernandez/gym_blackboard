import { doc, updateDoc } from "firebase/firestore";
import { db } from "./../firebaseConfig";

export const updateFavoriteField = async (
  id: string,
  newFieldValue: boolean
) => {
  const routineRef = doc(db, "routines", id);

  try {
    await updateDoc(routineRef, {
      isFavorite: newFieldValue,
    });
  } catch (error) {
    console.error(error);
  }
};
