export const getTimerValue = (difficulty: string | null): number => {
  switch (difficulty) {
    case "hard":
      return 30;
    case "medium":
      return 60;
    default:
      return 90;
  }
}

