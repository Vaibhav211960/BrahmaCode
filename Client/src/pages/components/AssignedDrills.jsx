import React from "react";
import { Activity } from "lucide-react";

const AssignedDrills = ({ practices, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium mt-4">Loading drills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <Activity className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Assigned Drills</h3>
          <p className="text-sm text-gray-600">Tasks from your coaches</p>
        </div>
      </div>
      
      {practices && practices.length > 0 ? (
        <div className="space-y-3">
          {practices.map((practice) => (
            <DrillCard key={practice._id} practice={practice} />
          ))}
        </div>
      ) : (
        <EmptyDrillsState />
      )}
    </div>
  );
};

const DrillCard = ({ practice }) => (
  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:shadow-md transition-shadow border border-blue-100">
    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
      <Activity className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-gray-900">{practice.activityName}</p>
      <p className="text-xs text-gray-600 mt-1">
        Coach:{" "}
        <span className="font-semibold text-blue-600">
          {practice.coachId?.name || "Your Coach"}
        </span>
      </p>
      {practice.duration && (
        <p className="text-xs text-gray-500 mt-1">Duration: {practice.duration}</p>
      )}
      {practice.note && (
        <p className="text-xs text-gray-600 mt-2 italic">"{practice.note}"</p>
      )}
    </div>
    <div className="text-right flex-shrink-0">
      <p className="text-xs font-bold text-gray-400">
        {new Date(practice.createdAt).toLocaleDateString()}
      </p>
      <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
        Active
      </span>
    </div>
  </div>
);

const EmptyDrillsState = () => (
  <div className="text-center py-12">
    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
    <p className="text-gray-600 font-medium">No drills assigned yet</p>
    <p className="text-sm text-gray-500 mt-1">
      Accept a coach invitation to receive drills
    </p>
  </div>
);

export default AssignedDrills;