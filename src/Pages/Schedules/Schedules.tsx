import "./Schedules.css";
import { type JSX } from "react";
import SchedulesNavbar from "./SchedulesNavbar/SchedulesNavbar";
import ProgramView from "./ProgramView/ProgramView";

function Schedules(): JSX.Element {
  return (
    <>
      <SchedulesNavbar />
      <div className="schedules-page">
        <h2>Program view</h2>
        <ProgramView />
      </div>
    </>
  );
}

export default Schedules;
