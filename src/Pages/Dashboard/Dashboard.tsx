import "./Dashboard.css";

import { type JSX } from "react";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseAuth } from "../../supabaseClient";
import { supabase } from "../../supabaseClient";

function Dashboard(): JSX.Element {
  const { user } = useUser();
  const { getSupabaseClient } = useSupabaseAuth();

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

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>
        Hi, {user?.firstName} {user?.lastName}! Welcome to your dashboard!
      </p>
      <h4>These are your current PR's</h4>
      <div className="prs-container">
        <div className="pr-card">
          <h3>squat</h3>
          <p>No lifts</p>
        </div>
        <div className="pr-card">
          <h3>Bench press</h3>
          <p>142.5 kg</p>
        </div>
        <div className="pr-card">
          <h3>deadlift</h3>
          <p>No lifts</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
