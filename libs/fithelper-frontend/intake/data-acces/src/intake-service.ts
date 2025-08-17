export interface UserInfo {
  gender: 'male' | 'female';
  measurementSystem: 'metric' | 'imperial';
  age: string;
  weight: string;
  height: string;
  activityFactor: number;
  caloriesAdjustment: number;
}

export interface CalorieResults {
  bmr: number;
  muscleGains: number;
  loseFat: number;
}

const MIFFLIN_ST_JEOR_MALE = {
  BASE: 88.362,
  WEIGHT_COEFFICIENT: 13.397,
  HEIGHT_COEFFICIENT: 4.799,
  AGE_COEFFICIENT: 5.677,
};

const MIFFLIN_ST_JEOR_FEMALE = {
  BASE: 447.593,
  WEIGHT_COEFFICIENT: 9.247,
  HEIGHT_COEFFICIENT: 3.098,
  AGE_COEFFICIENT: 4.33,
};

export function calculateBMR(userInfo: UserInfo): number {
  if (!userInfo.age || !userInfo.weight || !userInfo.height) return 0;

  const age = parseInt(userInfo.age);
  const weight = parseFloat(userInfo.weight);
  const height = parseFloat(userInfo.height);

  if (userInfo.gender === 'male') {
    const { BASE, WEIGHT_COEFFICIENT, HEIGHT_COEFFICIENT, AGE_COEFFICIENT } =
      MIFFLIN_ST_JEOR_MALE;
    return Math.round(
      (BASE +
        WEIGHT_COEFFICIENT * weight +
        HEIGHT_COEFFICIENT * height -
        AGE_COEFFICIENT * age) *
        userInfo.activityFactor
    );
  } else if (userInfo.gender === 'female') {
    const { BASE, WEIGHT_COEFFICIENT, HEIGHT_COEFFICIENT, AGE_COEFFICIENT } =
      MIFFLIN_ST_JEOR_FEMALE;
    return Math.round(
      (BASE +
        WEIGHT_COEFFICIENT * weight +
        HEIGHT_COEFFICIENT * height -
        AGE_COEFFICIENT * age) *
        userInfo.activityFactor
    );
  }
  return 0;
}

export function calculateCalories(userInfo: UserInfo): CalorieResults {
  const bmr = calculateBMR(userInfo);
  const muscleGains = bmr + userInfo.caloriesAdjustment;
  const loseFat = bmr - userInfo.caloriesAdjustment;

  return {
    bmr,
    muscleGains,
    loseFat,
  };
}
