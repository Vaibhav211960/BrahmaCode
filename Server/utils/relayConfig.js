export const accelerationExchangeConfig = {
  accelerationDistance: {
    correctValue: 20,
    evaluate: (value) =>
      Number(value) === 20 ? "Correct" : "Incorrect",
  },

  batonExchange: {
    maxAllowed: 5,
    evaluate: (value) =>
      Number(value) < 5 ? "Correct" : "Incorrect",
  },

  armAngle: {
    correctValue: "natural backward",
    evaluate: (value) =>
      value?.toLowerCase() === "natural backward"
        ? "Correct"
        : "Incorrect",
  },

  verbalCueTiming: {
    correctValue: "early",
    evaluate: (value) =>
      value?.toLowerCase() === "early"
        ? "Correct"
        : "Incorrect",
  },

  legMuscleTightness: {
    correctValue: "mild",
    evaluate: (value) =>
      value?.toLowerCase() === "mild"
        ? "Correct"
        : "Incorrect",
  },
};
