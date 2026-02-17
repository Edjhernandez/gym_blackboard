import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { User } from "../types/types";
import { db } from "./../firebaseConfig";

const storage = getStorage();

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("Can't find user with ID:", userId);
      return null;
    }

    const userData = userSnap.data();
    let finalPhotoURL = userData.photoURL;

    if (finalPhotoURL && finalPhotoURL.startsWith("gs://")) {
      try {
        const fileRef = ref(storage, finalPhotoURL);
        finalPhotoURL = await getDownloadURL(fileRef);
      } catch (storageError) {
        console.error("Error to get storage URL:", storageError);
      }
    }

    return {
      name: userData.name,
      id: userSnap.id,
      photoURL: finalPhotoURL,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};
