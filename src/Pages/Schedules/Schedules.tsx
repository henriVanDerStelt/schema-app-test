import "./Schedules.css";
import { type JSX, useEffect, useState } from "react";
// import SchedulesNavbar from "./SchedulesNavbar/SchedulesNavbar";
import ProgramView from "./ProgramView/ProgramView";
import { fetchProgram } from "../../Services/schemasService";
import { addWeek, deleteWeek } from "../../Services/schemasWeeksService";

function Schedules(): JSX.Element {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleUpdateProgram = (updatedProgram: any) => {
    setProgram(updatedProgram);
  };

  useEffect(() => {
    const loadProgram = async () => {
      try {
        const data = await fetchProgram();
        setProgram(data[0]);
      } catch (error) {
        console.error("Error loading program:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgram();
  }, []);

  const handleAddWeek = async () => {
    if (!program) return;
    try {
      const newWeekNumber = (program.schemas_weeks?.length ?? 0) + 1;
      const newWeek = await addWeek(program.id, newWeekNumber);

      setProgram((prev: any) => ({
        ...prev,
        schemas_weeks: [...(prev.schemas_weeks ?? []), newWeek[0]],
      }));
    } catch (error) {
      console.error("Error adding week:", error);
    }
  };

  const handleDeleteWeek = async (weekId: number) => {
    try {
      await deleteWeek(weekId);
      setProgram((prev: any) => ({
        ...prev,
        schemas_weeks: prev.schemas_weeks.filter(
          (week: any) => week.id !== weekId
        ),
      }));
    } catch (error) {
      console.error("Error deleting week:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!program) return <div>No program found</div>;

  return (
    <>
      {/* <SchedulesNavbar /> */}
      <div className="schedules-page">
        <h2>{program.name}</h2>
        <button className="add-week-button" onClick={handleAddWeek}>
          Add Week
        </button>
        <ProgramView
          program={program}
          onDeleteWeek={handleDeleteWeek}
          onUpdateProgram={handleUpdateProgram}
        />
      </div>
    </>
  );
}

export default Schedules;
