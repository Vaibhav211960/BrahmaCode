import React from "react";
import { Target } from "lucide-react";
import { getStatusColor } from "../utils/statusUtils";

const TechnicalHistory = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-amber-600" /> Technical History
      </h3>
      <div className="grid gap-3">
        {data.map((test, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-sm text-gray-900">{test.test}</div>
              <div className="text-xs text-gray-600">{test.date}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">{test.score}</div>
              <div
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${getStatusColor(test.status)}`}
              >
                {test.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalHistory;