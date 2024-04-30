export const getTimerValue = (difficulty: string | null): number => {
  switch (difficulty) {
    case "hard":
      return 30;
    case "medium":
      return 60;
    default:
      return 30;
  }
}

export const calculateScore = (currentScore: number, increment: boolean): number => {
  return increment ? currentScore + 1 : currentScore;
};