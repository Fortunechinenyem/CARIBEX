import React from "react";
import StatusIndicator from "./StatusIndicator";

const TrackingTimeline = ({ milestones = [] }) => {
  if (!Array.isArray(milestones) || milestones.length === 0) {
    return <p className="text-gray-600">No milestones available.</p>;
  }
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
