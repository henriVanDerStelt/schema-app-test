import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

interface Workout {
  id: number;
  name: string;
  weight: number;
  reps: number;
  rpe: number;
  created_at: string;
}

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [rpe, setRpe] = useState<number>(0);

  // Workouts ophalen
  useEffect(() => {
    fetchWorkouts();
  }, []);

  async function fetchWorkouts() {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .order("created_at", { ascending: false }); // nieuwste bovenaan
    if (error) console.error(error);
    else setWorkouts(data || []);
  }

  // Nieuwe workout toevoegen
  async function addWorkout() {
    const { error } = await supabase.from("workouts").insert([
      {
        name,
        weight,
        reps,
        rpe,
      },
    ]);
    if (error) console.error(error);
    else {
      setName("");
      setWeight(0);
      setReps(0);
      setRpe(0);
      fetchWorkouts();
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🏋️ My Workouts</h2>
      <p>This is a test!</p>
      <label>Exercise name: </label>
      <input
        id="name"
        placeholder="Exercise name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Weight: </label>
      <input
        id="weight"
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <label>Reps: </label>
      <input
        id="reps"
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(Number(e.target.value))}
      />
      <label>RPE: </label>
      <input
        id="rpe"
        type="number"
        placeholder="RPE"
        value={rpe}
        onChange={(e) => setRpe(Number(e.target.value))}
      />
      <button onClick={addWorkout}>Add Workout</button>

      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            <b>{w.name}</b> — {w.weight}kg × {w.reps} @ RPE {w.rpe} <br />
            <small>{new Date(w.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
