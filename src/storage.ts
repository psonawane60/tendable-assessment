export const saveScore = (score: number) => {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
};

export const getScores = (): number[] => {
  return JSON.parse(localStorage.getItem("scores") || "[]");
};
