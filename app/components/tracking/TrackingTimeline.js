import React from "react";
import StatusIndicator from "./StatusIndicator";

const TrackingTimeline = ({ milestones }) => {
  return (
    <div>
      {milestones.map((milestone, index) => (
        <div key={index} className="flex items-center mb-4">
          <StatusIndicator
            status={milestone.completed ? "completed" : milestone.label}
          />
          <span className="ml-2">{milestone.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
