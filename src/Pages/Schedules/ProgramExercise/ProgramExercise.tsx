import "./ProgramExercise.css";
import { type JSX, useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Popup from "../../../Components/Popup/Popup";
import OverflowMenu from "../../../Components/OverflowMenu/OverflowMenu";
// import { useSupabaseAuth } from "../../../supabaseClient";
import { addUserSet, updateUserSet } from "../../../Services/userSetsService";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../../supabaseClient";

interface Set {
  id: string;
  reps: number;
  weight: number;
  rpe: number;
}

interface Props {
  name: string;
  sets: Set[];
  onDeleteExercise?: () => void;
  onAddSet?: (reps: number, weight: number, rpe: number) => void;
  onDeleteSet?: (setId: number) => void;
}

function ProgramExercise({
  name,
  sets,
  onDeleteExercise,
  onAddSet,
  onDeleteSet,
}: Props): JSX.Element {
  const [open, setOpen] = useState(true);
  const [isAddSetOpen, setIsAddSetOpen] = useState(false);
  const [newReps, setNewReps] = useState<number>(10);
  const [newWeight, setNewWeight] = useState<number>(50);
  const [newRpe, setNewRpe] = useState<number>(8);
  const [showPercentage, setShowPercentage] = useState(false);
  const [showRpe, setShowRpe] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useUser();
  // const { getSupabaseClient } = useSupabaseAuth();
  const [liftedWeights, setLiftedWeights] = useState<Record<string, string>>(
    {}
  );
  // per-set save timeouts for debouncing DB writes
  const saveTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const clerkUserId = user.id;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_user_id", clerkUserId);

      if (error) console.error("Error fetching data:", error);
      else console.log("User data:", data);
    };

    fetchData();
  }, [user]);

  // Fetch existing user-set entries for the current sets so we can prefill the lifted-weight inputs
  useEffect(() => {
    const fetchLiftedWeights = async () => {
      if (!user || sets.length === 0) return;
      // const supabase = await getSupabaseClient();

      const setIds = sets.map((s) => Number(s.id));
      try {
        const { data, error } = await supabase
          .from("usersSets")
          .select("id, set_id, weight_lifted")
          .in("set_id", setIds)
          .eq("clerk_user_id", user.id);

        if (error) {
          console.error("Error fetching usersSets:", error);
          return;
        }

        if (!data) return;

        const map: Record<string, string> = {};
        data.forEach((row: any) => {
          // store by set_id (string) so we can easily index by Set.id
          map[String(row.set_id)] =
            row.weight_lifted != null ? String(row.weight_lifted) : "";
        });

        setLiftedWeights(map);
      } catch (err) {
        console.error(err);
      }
    };

    void fetchLiftedWeights();
  }, [user, sets]);

  // Handler that schedules a debounced save for the usersSets row when the user types
  const handleLiftedChange = (setId: string, rawValue: string) => {
    // update local input immediately for responsiveness
    setLiftedWeights((prev) => ({ ...prev, [setId]: rawValue }));

    // clear any existing timeout for this set
    const existing = saveTimeouts.current[setId];
    if (existing) clearTimeout(existing);

    // schedule a save in 2 seconds
    saveTimeouts.current[setId] = setTimeout(() => {
      void performSave(setId, rawValue);
      delete saveTimeouts.current[setId];
    }, 2000);
  };

  // actual save logic that runs after debounce
  const performSave = async (setId: string, rawValue: string) => {
    // accept empty string (don't store) or numeric values
    if (rawValue === "") return;
    const parsed = Number(rawValue);
    if (Number.isNaN(parsed)) return;

    if (!user) return;

    try {
      // check for existing entry for this user + set
      const { data: existing, error: selectError } = await supabase
        .from("usersSets")
        .select("*")
        .eq("clerk_user_id", user.id)
        .eq("set_id", Number(setId))
        .limit(1);

      if (selectError) {
        console.error("Error checking usersSets:", selectError);
        return;
      }

      if (existing && existing.length > 0) {
        // update existing
        const userSetId = existing[0].id;
        try {
          await updateUserSet(userSetId, parsed);
        } catch (err) {
          console.error("Failed to update user set:", err);
        }
      } else {
        // insert new
        try {
          await addUserSet(user.id, Number(setId), parsed);
        } catch (err) {
          console.error("Failed to add user set:", err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // clear any pending timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(saveTimeouts.current).forEach((t) => clearTimeout(t));
    };
  }, []);

  const toggleShowPercentage = () => {
    setShowPercentage((prev) => {
      const next = !prev;
      if (next) setShowRpe(false);
      return next;
    });
  };

  const toggleShowRpe = () => {
    setShowRpe((prev) => {
      const next = !prev;
      if (next) setShowPercentage(false);
      return next;
    });
  };

  return (
    <div className="program-view-exercise">
      {/* Header with toggle */}
      <div className="exercise-header" onClick={() => setOpen(!open)}>
        <div className="exercise-left">
          <p className="exercise-name" title={name}>
            {name}
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            <OverflowMenu
              options={[
                {
                  label: showPercentage ? "Hide percentage" : "Show percentage",
                  action: toggleShowPercentage,
                },
                {
                  label: showRpe ? "Hide RPE" : "Show RPE",
                  action: toggleShowRpe,
                },
                { divider: true },
                {
                  label: isEditMode ? "Done editing" : "Edit",
                  action: () => setIsEditMode((prev) => !prev),
                },
                { label: "Rename", action: () => console.log("rename (todo)") },
                { label: "Delete", action: () => onDeleteExercise?.() },
              ]}
            />
          </div>
        </div>

        {open ? (
          <ChevronDown size={16} className="chevron" />
        ) : (
          <ChevronRight size={16} className="chevron" />
        )}
      </div>

      {/* Only show sets if open */}
      {open && (
        <div className="program-view-sets">
          {sets.map((value) => (
            <div key={value.id} className="set-row">
              <input
                type="number"
                defaultValue={value.reps}
                className="set-input reps"
              />
              <p className="set-reps">x</p>
              <input
                type="number"
                defaultValue={value.weight}
                className="set-input"
              />
              {showPercentage ? (
                <p className="set-percentage">90%</p>
              ) : showRpe ? (
                <p className="set-rpe">@ {value.rpe}</p>
              ) : null}
              <div className="lifted-weight">
                <input
                  type="text"
                  className="set-input lifted-input"
                  value={liftedWeights[value.id] ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    void handleLiftedChange(value.id, v);
                  }}
                />
              </div>
              {isEditMode && (
                <button
                  className="delete-set-btn delete-btn"
                  onClick={() => onDeleteSet?.(Number(value.id))}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            className="add-set-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddSetOpen(true);
            }}
          >
            + Set
          </button>

          {isAddSetOpen && (
            <Popup isOpen={isAddSetOpen} onClose={() => setIsAddSetOpen(false)}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label>Reps</label>
                <input
                  type="number"
                  value={newReps}
                  onChange={(e) => setNewReps(Number(e.target.value))}
                />
                <label>Weight</label>
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                />
                <label>RPE</label>
                <input
                  type="number"
                  value={newRpe}
                  onChange={(e) => setNewRpe(Number(e.target.value))}
                />

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button onClick={() => setIsAddSetOpen(false)}>Cancel</button>
                  <button
                    onClick={() => {
                      onAddSet?.(newReps, newWeight, newRpe);
                      setIsAddSetOpen(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgramExercise;
