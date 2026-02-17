import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Block, Exercise, Routine } from "../types/types";
import { db } from "./../firebaseConfig";

const storage = getStorage();

export const getRoutineById = async (
  routineId: string,
): Promise<Routine | null> => {
  try {
    const routineRef = doc(db, "routines", routineId);
    const routineSnap = await getDoc(routineRef);

    if (routineSnap.exists()) {
      const data = routineSnap.data();
      const blocks = data.blocks || [];

      const updatedBlocks = await Promise.all(
        blocks.map(async (block: Block) => {
          if (!block.exercises) return block;

          const updatedExercises = await Promise.all(
            block.exercises.map(async (exercise: Exercise) => {
              if (exercise.videoURL && exercise.videoURL.startsWith("gs://")) {
                try {
                  const videoRef = ref(storage, exercise.videoURL);
                  const publicUrl = await getDownloadURL(videoRef);
                  return { ...exercise, videoURL: publicUrl };
                } catch (vError) {
                  console.error(
                    `Error descargando video para ${exercise.name}:`,
                    vError,
                  );
                  return exercise;
                }
              }
              return exercise;
            }),
          );

          return { ...block, exercises: updatedExercises };
        }),
      );

      return {
        ...data,
        id: routineSnap.id,
        blocks: updatedBlocks,
      } as Routine;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting routine:", error);
    throw error;
  }
};
