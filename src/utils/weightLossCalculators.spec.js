import { poundsPerWeek, byGoalDate, byPercentage, caloriesToBurn, getCaloriesForFatLoss } from './weightLossCalculators';
import { IMPERIAL, KATCH_MCARDLE, MALE, METRIC, MODERATE } from '../redux/userReducer';

let user;

beforeEach(() => {
    user = {
        weight: 200,
        height: 70,
        age: 25,
        unitOfMeasure: IMPERIAL,
        gender: MALE,
        bodyFatPercentage: 20,
        lowestCalorieIntake: 1500,
        preferredCalculator: KATCH_MCARDLE,
        activityFactor: MODERATE,
        idealWeight: 185
    };
});

describe('Weight Loss Calculators', () => {
    it('should calculate weekly estimates by mass loss', () => {
        expect(poundsPerWeek(user)).toBeFalsy();

        user.fatLossPerWeek = 2;
        const results = poundsPerWeek(user);
        expect(results.weeks).toHaveLength(8);
        expect(results.dailyCalorieDeficit).toBe(1000);
        expect(results.weeks[0].caloriesToBurn).toBe(-478.98);
        expect(results.weeks[0].weightAtEndOfWeek).toBe(198);
    });

    it('should calculate weekly estimates by goal date', () => {
        expect(byGoalDate(user)).toBeFalsy();

        const date = new Date();
        date.setDate(date.getDate() + 90);
        user.goalDate = date;
        const results = byGoalDate(user);
        expect(results.weeks).toHaveLength(13);
        expect(results.dailyCalorieDeficit).toBe(583.33);
        expect(results.weeks[0].caloriesToBurn).toBe(-905.81);
        expect(results.weeks[0].weightAtEndOfWeek).toBe(198.83);
    });

    it('should calculate weekly estimates by body weight percentage', () => {
        expect(byPercentage(user)).toBeFalsy();

        user.percentLossPerWeek = 1;
        const results = byPercentage(user);
        expect(results.weeks).toHaveLength(8);
        expect(results.weeks[0].caloriesToBurn).toBe(-478.98);
        expect(results.weeks[0].weightAtEndOfWeek).toBe(198);
        expect(results.weeks[0].weightLost).toBe(2);
    });

    it('should determine calories needed to burn daily after adjusting for food intake', () => {
        expect(caloriesToBurn(user, 2)).toEqual({bmr: 3003.342, calories: -503.34});
        expect(caloriesToBurn(user, 3.25)).toEqual({bmr: 3003.342, calories: 121.66});
        user.lowestCalorieIntake = 2500;
        expect(caloriesToBurn(user, 2)).toEqual({bmr: 3003.342, calories: 496.66});
    });

    it('should get calories needed based on unit of measure', () => {
        expect(getCaloriesForFatLoss(2, IMPERIAL)).toBe(7000);
        expect(getCaloriesForFatLoss(1, METRIC)).toBe(7700);
    });
});
