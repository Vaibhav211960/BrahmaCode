import React from "react";
import TestCard from "./TestCard";
import { getStatusColor } from "../utils/statusUtils";

const TestResults = ({
  loading,
  runningTest,
  javelineTest,
  relayTest,
  longJumpTest,
  runningWeakness,
  javelineWeakness,
  relayWeakness,
  longJumpWeakness,
}) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 font-medium mt-4">Loading test results...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TestCard
        test={runningTest}
        title="Running Test"
        subtitle="Form & technique analysis"
        icon="running"
        color="purple"
        weaknesses={runningWeakness}
      />
      
      <TestCard
        test={javelineTest}
        title="Javeline Test"
        subtitle="Throwing technique"
        icon="target"
        color="orange"
        weaknesses={javelineWeakness}
      />
      
      <TestCard
        test={relayTest}
        title="Relay Test"
        subtitle="Team synchronization"
        icon="trophy"
        color="green"
        weaknesses={relayWeakness}
      />
      
      <TestCard
        test={longJumpTest}
        title="Long Jump Test"
        subtitle="Jump technique analysis"
        icon="trendingUp"
        color="blue"
        weaknesses={longJumpWeakness}
      />
    </div>
  );
};

export default TestResults;