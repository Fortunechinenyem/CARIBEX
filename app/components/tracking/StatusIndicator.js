import React from "react";

const StatusIndicator = ({ status }) => {
  const getStatusColor = (status) => {
    if (!status) return "bg-gray-500";
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "active":
        return "bg-green-500";
      case "sold":
        return "bg-blue-500";
      case "completed":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}
      title={status || "Unknown"}
    ></div>
  );
};

export default StatusIndicator;
