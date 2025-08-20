export interface UserInfo {
  gender: 'male' | 'female';
  measurementSystem: 'metric' | 'imperial';
  age?: number;
  weight?: number;
  height?: number;
  activityFactor: 1.0 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9;
  caloriesAdjustment: number;
}

const BMR_CALCULATION_FORMULA: Record<
  UserInfo['gender'],
  (weight: number, height: number, age: number) => number
> = {
  male: (weight: number, height: number, age: number) =>
    10 * weight + 6.25 * height - 5 * age + 5,
  female: (weight: number, height: number, age: number) =>
    10 * weight + 6.25 * height - 5 * age - 161,
};

export function calculateBMR(userInfo: UserInfo): number {
  if (!userInfo.weight || !userInfo.height || !userInfo.age) return 0;

  const formula = BMR_CALCULATION_FORMULA[userInfo.gender];
  return Math.round(formula(userInfo.weight, userInfo.height, userInfo.age));
}

export function calculateMaintenanceCalories(
  bmr: number,
  activityFactor: number
): number {
  if (bmr === 0) return 0;

  return Math.round(bmr * activityFactor);
}

export function calculateCalories(
  maintenanceCalories: number,
  caloriesAdjustment: number
): {
  muscleGains: number;
  loseFat: number;
} {
  const muscleGains = maintenanceCalories + caloriesAdjustment;
  const loseFat = maintenanceCalories - caloriesAdjustment;

  return {
    muscleGains,
    loseFat,
  };
}
