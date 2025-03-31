import { openDB } from "idb";

const DB_NAME = "workoutDB";
const EXERCISE_STORE = "exercises";
const WORKOUT_STORE = "workouts";

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(EXERCISE_STORE)) {
        db.createObjectStore(EXERCISE_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(WORKOUT_STORE)) {
        db.createObjectStore(WORKOUT_STORE, { keyPath: "date" });
      }
    },
  });
};

export const clearDatabase = async () => {
  const db = await openDB(DB_NAME, 2);

  await db.clear(EXERCISE_STORE); 
  await db.clear(WORKOUT_STORE);  

  console.log("All data cleared from IndexedDB stores!");
};

/* Exercise CRUD */
export const addExerciseToWorkout = async (date, newExercise) => {
  const db = await initDB();
  const id = crypto.randomUUID();

  const exerciseWithId = { ...newExercise, id, workoutDate: date };

  // Adding the new exercise with its unique UUID
  await db.put(EXERCISE_STORE, exerciseWithId);

  // Update the workout to incluse the new exercise UUID
  const workout = await db.get(WORKOUT_STORE, date);
  const updatedWorkout = workout
    ? { ...workout, exercises: [...workout.exercises, id] }
    : { date, exercises: [id] };

  await db.put(WORKOUT_STORE, updatedWorkout);
};

export const deleteExerciseFromWorkout = async (date, exerciseId) => {
  const db = await initDB();

  // Delete the exercise from the "exercises" store
  await db.delete(EXERCISE_STORE, exerciseId);

  // Get the workout and remove the exercise ID from its list
  const workout = await db.get(WORKOUT_STORE, date);
  if (!workout) {
    console.error("Workout not found.");
    return;
  }

  const updatedWorkout = {
    ...workout,
    exercises: workout.exercises.filter(id => id !== exerciseId),
  };

  await db.put(WORKOUT_STORE, updatedWorkout);
};

export const getExercisesByWorkoutDate = async (date) => {
  const db = await initDB();
  const workout = await db.get(WORKOUT_STORE, date);

  if (!workout) return [];

  // Busca todos os exercícios correspondentes aos IDs do workout
  // Search for the exercises (among all) of that especific workout
  const exercises = await Promise.all(
    workout.exercises.map((id) => db.get(EXERCISE_STORE, id))
  );

  return exercises.filter(Boolean); // Removes null values
};

export const updateExercise = async (id, newColumn) => {
  const db = await initDB();

  const exercise = await db.get(EXERCISE_STORE, id);

  if (!exercise) {
    console.error("Exercise not found in IndexedDB");
    return;
  } else {
    const updatedExercise = { ...exercise, status: newColumn }
    await db.put(EXERCISE_STORE, updatedExercise);
    console.log('Updated exercise column:', updatedExercise.status);
  }

};

/* Workout CRUD */
// add a workout
export const addWorkout = async (workout) => {
  const db = await initDB();

  if (!workout?.date || !workout?.exercises) {
    console.error("Invalid workout object: missing date or exercises");
    return;
  }

  await db.put(WORKOUT_STORE, workout);
  console.log("Workout added:", workout);
};

// Get workouts by date
export const getWorkoutByDate = async (date) => {
  const db = await initDB();
  return await db.get(WORKOUT_STORE, date);
};

// Get all workouts (optional)
export const getAllWorkouts = async () => {
  const db = await initDB();
  return await db.getAll(WORKOUT_STORE);
};

// Delete a workout
export const deleteWorkout = async (date) => {
  const db = await initDB();
  await db.delete(WORKOUT_STORE, date);
};

// Update Workout
export const updateWorkout = async (updatedWorkout) => {
  const db = await initDB();

  if (!updatedWorkout?.date) {
    console.error("Invalid workout object: missing date");
    return;
  }

  const existingWorkout = await db.get(WORKOUT_STORE, updatedWorkout.date);

  if (existingWorkout) {
    const newWorkout = {
      ...existingWorkout,
      ...updatedWorkout,
    };

    await db.put(WORKOUT_STORE, newWorkout);
    console.log("Updated Workout:", newWorkout);
  } else {
    console.error("No workout found in this date.");
  }
};
