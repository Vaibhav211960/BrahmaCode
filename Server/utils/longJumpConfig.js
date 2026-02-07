export const longJumpConfig = {
  takeOffFoot: {
    correctValue: "straight",
    evaluate: (value) =>
      value?.toLowerCase() === "straight" ? "Correct" : "Incorrect",
  },

  speedBeforeBoard: {
    correctValue: "controlled",
    evaluate: (value) =>
      value?.toLowerCase() === "controlled" ? "Correct" : "Incorrect",
  },

  kneeAtLanding: {
    correctValue: "bent",
    evaluate: (value) =>
      value?.toLowerCase() === "bent" ? "Correct" : "Incorrect",
  },

  balanceAfterLanding: {
    correctValue: "stable",
    evaluate: (value) =>
      value?.toLowerCase() === "stable" ? "Correct" : "Incorrect",
  },

  repeatedFouls: {
    maxAllowed: 1,
    evaluate: (value) =>
      value <= 1 ? "Correct" : "Incorrect",
  },
};
