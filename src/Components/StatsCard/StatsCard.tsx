import "./StatsCard.css";

import { type JSX } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
}

function StatsCard({ title, value }: StatsCardProps): JSX.Element {
  return (
    <div className="stats-card">
      <div className="stats-card-content">
        <p className="stats-card-title">{title}</p>
        <p className="stats-card-value">{value}</p>
      </div>
    </div>
  );
}

export default StatsCard;
