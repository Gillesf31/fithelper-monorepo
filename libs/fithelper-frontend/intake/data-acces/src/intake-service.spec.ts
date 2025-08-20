import {
  calculateBMR,
  calculateCalories,
  calculateMaintenanceCalories,
  UserInfo,
} from './intake-service';

describe('Intake Service Functions', () => {
  const users: (UserInfo & {
    expectedBMR: number;
    expectedMaintenanceCalories: number;
  })[] = [
    {
      gender: 'male',
      age: 45,
      weight: 80,
      height: 170,
      expectedBMR: 1643,
      expectedMaintenanceCalories: 1643,
      measurementSystem: 'metric',
      activityFactor: 1,
      caloriesAdjustment: 250,
    },
    {
      gender: 'male',
      age: 18,
      weight: 70,
      height: 185,
      expectedBMR: 1771,
      expectedMaintenanceCalories: 1948,
      measurementSystem: 'metric',
      activityFactor: 1.1,
      caloriesAdjustment: 250,
    },
    {
      gender: 'female',
      age: 45,
      weight: 80,
      height: 170,
      expectedBMR: 1477,
      expectedMaintenanceCalories: 1920,
      measurementSystem: 'metric',
      activityFactor: 1.3,
      caloriesAdjustment: 250,
    },
    {
      gender: 'female',
      age: 18,
      weight: 70,
      height: 185,
      expectedBMR: 1605,
      expectedMaintenanceCalories: 2408,
      measurementSystem: 'metric',
      activityFactor: 1.5,
      caloriesAdjustment: 250,
    },
  ];
  describe('calculateBMR', () => {
    test.each(users)('should return the calculated BMR for %p', (user) => {
      expect(calculateBMR(user as UserInfo)).toEqual(user.expectedBMR);
    });

    describe('edge cases - early returns', () => {
      test('should return 0 when weight is missing', () => {
        const userInfo: UserInfo = {
          gender: 'male',
          age: 25,
          height: 175,
          measurementSystem: 'metric',
          activityFactor: 1.2,
          caloriesAdjustment: 250,
        };
        expect(calculateBMR(userInfo)).toBe(0);
      });

      test('should return 0 when height is missing', () => {
        const userInfo: UserInfo = {
          gender: 'male',
          age: 25,
          weight: 70,
          measurementSystem: 'metric',
          activityFactor: 1.2,
          caloriesAdjustment: 250,
        };
        expect(calculateBMR(userInfo)).toBe(0);
      });

      test('should return 0 when age is missing', () => {
        const userInfo: UserInfo = {
          gender: 'male',
          weight: 70,
          height: 175,
          measurementSystem: 'metric',
          activityFactor: 1.2,
          caloriesAdjustment: 250,
        };
        expect(calculateBMR(userInfo)).toBe(0);
      });

      test('should return 0 when weight is 0', () => {
        const userInfo: UserInfo = {
          gender: 'male',
          age: 25,
          weight: 0,
          height: 175,
          measurementSystem: 'metric',
          activityFactor: 1.2,
          caloriesAdjustment: 250,
        };
        expect(calculateBMR(userInfo)).toBe(0);
      });

      test('should return 0 when height is 0', () => {
        const userInfo: UserInfo = {
          gender: 'male',
          age: 25,
          weight: 70,
          height: 0,
          measurementSystem: 'metric',
          activityFactor: 1.2,
          caloriesAdjustment: 250,
        };
        expect(calculateBMR(userInfo)).toBe(0);
      });

      test('should return 0 when age is 0', () => {
        const userInfo: UserInfo = {
          gender: 'male',
          age: 0,
          weight: 70,
          height: 175,
          measurementSystem: 'metric',
          activityFactor: 1.2,
          caloriesAdjustment: 250,
        };
        expect(calculateBMR(userInfo)).toBe(0);
      });
    });
  });

  describe('calculateMaintenanceCalories', () => {
    test.each(users)(
      'should return the calculated maintenance calories for %p',
      (user) => {
        expect(
          calculateMaintenanceCalories(user.expectedBMR, user.activityFactor)
        ).toEqual(user.expectedMaintenanceCalories);
      }
    );

    describe('edge cases - early returns', () => {
      test('should return 0 when BMR is 0', () => {
        expect(calculateMaintenanceCalories(0, 1.2)).toBe(0);
      });
    });
  });

  describe('calculateCalories', () => {
    test.each([
      [1000, 250, { muscleGains: 1250, loseFat: 750 }],
      [1000, 0, { muscleGains: 1000, loseFat: 1000 }],
      [1000, -250, { muscleGains: 750, loseFat: 1250 }],
      [1000, 500, { muscleGains: 1500, loseFat: 500 }],
      [1000, 750, { muscleGains: 1750, loseFat: 250 }],
    ])(
      'should return the calculated calories for %p',
      (maintenanceCalories, caloriesAdjustment, expected) => {
        expect(
          calculateCalories(maintenanceCalories, caloriesAdjustment)
        ).toEqual(expected);
      }
    );
  });
});
