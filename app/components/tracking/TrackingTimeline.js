import React from "react";
import PropTypes from "prop-types";

const TrackingTimeline = ({ milestones }) => {
  return (
    <div className="flex flex-col space-y-6">
      {milestones.map((milestone, index) => (
        <div key={index} className="flex items-start">
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full ${
              milestone.completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>

          {index !== milestones.length - 1 && (
            <div
              className={`w-1 h-full bg-gray-300 mx-2 ${
                milestone.completed ? "bg-green-500" : ""
              }`}
            ></div>
          )}

          <div className="ml-4">
            <h4
              className={`text-lg font-semibold ${
                milestone.completed ? "text-green-600" : "text-gray-600"
              }`}
            >
              {milestone.label}
            </h4>
            <p className="text-sm text-gray-500">{milestone.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

TrackingTimeline.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TrackingTimeline;
