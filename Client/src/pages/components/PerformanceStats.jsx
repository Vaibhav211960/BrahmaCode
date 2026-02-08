import React from "react";
import { TrendingUp, ChevronRight } from "lucide-react";

const PerformanceStats = ({ data }) => {
  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <ChevronRight className="w-4 h-4 text-emerald-500 rotate-90" />
    ) : (
      <ChevronRight className="w-4 h-4 text-red-500 -rotate-90" />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" /> Recent Performance
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="text-sm text-gray-700">{item.metric}</div>
              <div className="text-lg font-bold text-gray-900">{item.value}</div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${item.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
              >
                {item.improvement}
              </span>
              {getTrendIcon(item.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceStats;