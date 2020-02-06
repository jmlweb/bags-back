function validateBagsCount(value: number): boolean {
  return value >= 0 && value <= 5;
}

export default validateBagsCount;
