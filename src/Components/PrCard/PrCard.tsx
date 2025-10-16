import "./PrCard.css";
import { type JSX } from "react";

interface Props {
  exerciseName: string;
  weightLifted: number;
  date: string;
  calculatedOneRepMax: number;
}

function PrCard({
  exerciseName,
  weightLifted,
  date,
  calculatedOneRepMax,
}: Props): JSX.Element {
  return (
    <div className="pr-card">
      <h3>{exerciseName}</h3>
      <p>Weight Lifted: {weightLifted}</p>
      <p>kg</p>
      <p>Date: {new Date(date).toLocaleDateString()}</p>
      <p>Calculated 1RM: {calculatedOneRepMax.toFixed(2)}</p>
      <p>kg</p>
    </div>
  );
}

export default PrCard;
