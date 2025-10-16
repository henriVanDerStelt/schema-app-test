import "./Dashboard.css";

import { type JSX, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseAuth } from "../../supabaseClient";
import { supabase } from "../../supabaseClient";
import PrCard from "../../Components/PrCard/PrCard";
import StatsCard from "../../Components/StatsCard/StatsCard";

function Dashboard(): JSX.Element {
  const { user } = useUser();
  const { getSupabaseClient } = useSupabaseAuth();
  const [totalVolume, setTotalVolume] = useState<string | number>("—");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const supabase = await getSupabaseClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_user_id", user.id);

      if (error) console.error("Error fetching data:", error);
      else console.log("User data:", data);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const syncUser = async () => {
      if (!user) return;

      const { data, error } = await supabase.from("profiles").upsert(
        {
          clerk_user_id: user.id,
          full_name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        },
        { onConflict: "clerk_user_id" }
      );

      if (error) {
        console.error("Error syncing user to Supabase:", error);
      } else {
        console.log("User synced:", data);
      }
    };

    syncUser();
  }, [user]);

  // Fetch total volume for the current user from the Supabase Edge Function
  useEffect(() => {
    const fetchTotalVolume = async () => {
      if (!user) return;
      const supabase = await getSupabaseClient();

      try {
        // call the edge function 'Total-volume-for-User' which expects a POST JSON body
        const res = await supabase.functions.invoke("Total-volume-for-User", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerk_user_id: user.id }),
        });

        if (res.error) {
          console.error("Error fetching total volume:", res.error);
          return;
        }

        const payload = res.data as any;
        // function may return { clerk_user_id, total_weight } or { clerk_user_id, total_volume }
        const total =
          payload && typeof payload === "object"
            ? payload.total_weight ?? payload.total_volume ?? null
            : null;
        if (total == null) {
          setTotalVolume("—");
        } else {
          // format number with thousand separators and append unit
          const num = Number(total);
          if (Number.isFinite(num)) {
            setTotalVolume(`${num.toLocaleString("en-US")} kg`);
          } else {
            setTotalVolume(String(total));
          }
        }
      } catch (err) {
        console.error("Failed to call sum-user-weight function:", err);
      }
    };

    void fetchTotalVolume();
  }, [user, getSupabaseClient]);

  return (
    <div className="dashboard-page">
      <div className="header-container">
        <h1>Dashboard</h1>
        <p>
          Hi, {user?.firstName} {user?.lastName}! Welcome to your dashboard!
        </p>
      </div>

      <h3 className="stats-title">Stats:</h3>
      <div className="stats-container">
        <StatsCard title="Total Workouts" value={42} />
        <div className="stats-spacer" />
        <StatsCard title="Total Sets" value={320} />
        <div className="stats-spacer" />
        <StatsCard title="Total Reps" value={1261} />
        <div className="stats-spacer" />
        <StatsCard title="Total Volume" value={totalVolume} />
      </div>

      <h3 className="prs-title">Current PR's:</h3>
      <div className="prs-container">
        <PrCard
          exerciseName="Squat"
          weightLifted={200.0}
          date="2023-09-15"
          calculatedOneRepMax={200.0}
        />
        <PrCard
          exerciseName="Bench Press"
          weightLifted={145.0}
          date="2023-08-20"
          calculatedOneRepMax={147.5}
        />
        <PrCard
          exerciseName="Deadlift"
          weightLifted={215.0}
          date="2023-10-01"
          calculatedOneRepMax={215.0}
        />
      </div>
    </div>
  );
}

export default Dashboard;
