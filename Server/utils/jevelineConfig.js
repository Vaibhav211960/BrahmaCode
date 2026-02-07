export const throwingTechniqueConfig = {
  elbowAtThrow: {
    correctValue: "high",
    evaluate: (value) =>
      value?.toLowerCase() === "high" ? "Correct" : "Incorrect",
  },

  bodyRotation: {
    correctValue: "smooth",
    evaluate: (value) =>
      value?.toLowerCase() === "smooth" ? "Correct" : "Incorrect",
  },

  throwCount: {
    maxAllowed: 20,
    evaluate: (value) =>
      Number(value) < 20 ? "Correct" : "Incorrect",
  },

  armAfterThrow: {
    correctValue: "relaxed",
    evaluate: (value) =>
      value?.toLowerCase() === "relaxed" ? "Correct" : "Incorrect",
  },

  shoulderReaction: {
    correctValue: "normal",
    evaluate: (value) =>
      value?.toLowerCase() === "normal" ? "Correct" : "Incorrect",
  },
};
