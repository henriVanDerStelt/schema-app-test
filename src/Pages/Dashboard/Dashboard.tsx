import "./Dashboard.css";

import { type JSX, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface Workout {
  id: number;
  name: string;
  weight: number;
  reps: number;
  rpe: number;
  created_at: string;
}

function Dashboard(): JSX.Element {
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
      <div>
        <button onClick={() => (window.location.href = "/schema-app-test/")}>
          Logout
        </button>
        <h1>🏋️ My Workouts</h1>
        <h3>This is a test!</h3>
      </div>

      <div className="divider" />

      <div>
        <label>Exercise name: </label>
        <input
          className="name"
          placeholder="Exercise name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Weight: </label>
        <input
          className="weight"
          type="number"
          inputMode="decimal"
          placeholder="Weight (kg)"
          value={weight === 0 ? "" : weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <br />
        <label>Reps: </label>
        <input
          className="reps"
          type="number"
          inputMode="decimal"
          placeholder="Reps"
          value={reps === 0 ? "" : reps}
          onChange={(e) => setReps(Number(e.target.value))}
        />
        <br />
        <label>RPE: </label>
        <input
          className="rpe"
          type="number"
          inputMode="decimal"
          placeholder="RPE"
          value={rpe === 0 ? "" : rpe}
          onChange={(e) => setRpe(Number(e.target.value))}
        />
        <br />
        <button onClick={addWorkout}>Add Set</button>
      </div>

      <div className="divider" />

      <h2>Recent Sets:</h2>

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

export default Dashboard;
