export const yoloConfig = {
  ankleDorsiflexion: (v) =>
    v >= 10 ? "Good" : v >= 6 ? "Average" : "Poor",

  singleLegBalance: (v) =>
    v >= 30 ? "Excellent" : v >= 20 ? "Good" : "Poor",

  verticalJump: (v) =>
    v >= 50 ? "Excellent" : v >= 40 ? "Good" : v >= 30 ? "Average" : "Poor",

  broadJump: (v) =>
    v >= 2.4 ? "Excellent" : v >= 2.0 ? "Good" : v >= 1.6 ? "Average" : "Poor",

  sprintTime20m: (v) =>
    v <= 3.2 ? "Fast" : v <= 3.6 ? "Average" : "Slow",

  sprintTime30m: (v) =>
    v <= 4.3 ? "Fast" : v <= 4.8 ? "Average" : "Slow",

  agilityTtest: (v) =>
    v <= 10.5 ? "Excellent" : v <= 11.5 ? "Good" : "Poor",

  beepTest: (v) =>
    v >= 10 ? "Excellent" : v >= 8 ? "Good" : v >= 6 ? "Average" : "Poor",

  wallSit: (v) =>
    v >= 120 ? "Excellent" : v >= 90 ? "Good" : v >= 60 ? "Average" : "Poor",

  cooperTest: (v) =>
    v >= 2800 ? "Excellent" : v >= 2400 ? "Good" : v >= 2000 ? "Average" : "Poor",
};
