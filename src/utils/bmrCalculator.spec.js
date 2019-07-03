import {
    harrisBenedict,
    mifflinStJeor,
    katchMcardle,
    cunningham,
    average,
    getAll,
    addActivityFactors
} from './bmrCalculators';
import {
    AVERAGE,
    CUNNINGHAM, EXTREMELY_ACTIVE,
    FEMALE,
    HARRIS_BENEDICT,
    IMPERIAL,
    KATCH_MCARDLE, LIGHT,
    MALE,
    METRIC,
    MIFFLIN_ST_JEOR, MODERATE, NO_ACTIVITY,
    SEDENTARY, VERY_ACTIVE
} from '../redux/userReducer';

let user;

beforeEach(() => {
    user = {
        weight: 200,
        height: 70,
        age: 25,
        unitOfMeasure: IMPERIAL,
        gender: MALE
    };
});

describe('BMR Calculator', () => {
    it('should calculate the Revised Harris Benedict equation with imperial units', () => {
        const weight = 200;
        const height = 70;
        const age = 25;
        const expectedForMale = addActivityFactors(2015.08);
        const expectedForFemale = addActivityFactors(1729.06);
        expect(harrisBenedict(IMPERIAL, weight, height, age, MALE)).toEqual(expectedForMale);
        expect(harrisBenedict(IMPERIAL, weight, height, age, FEMALE)).toEqual(expectedForFemale);
    });

    it('should calculate the Revised Harris Benedict equation with metric units', () => {
        const weight = 69;
        const height = 167;
        const age = 25;
        const expectedForMale = addActivityFactors(1672.26);
        const expectedForFemale = addActivityFactors(1494.75);
        expect(harrisBenedict(METRIC, weight, height, age, MALE)).toEqual(expectedForMale);
        expect(harrisBenedict(METRIC, weight, height, age, FEMALE)).toEqual(expectedForFemale);
    });

    it('should calculate the Mifflin-St Jeor equation with imperial units', () => {
        const weight = 200;
        const height = 70;
        const age = 25;
        const expectedForMale = addActivityFactors(1899.54);
        const expectedForFemale = addActivityFactors(1733.54);
        expect(mifflinStJeor(IMPERIAL, weight, height, age, MALE)).toEqual(expectedForMale);
        expect(mifflinStJeor(IMPERIAL, weight, height, age, FEMALE)).toEqual(expectedForFemale);
    });

    it('should calculate the Mifflin-St Jeor equation with metric units', () => {
        const weight = 69;
        const height = 167;
        const age = 25;
        const expectedForMale = addActivityFactors(1615.06);
        const expectedForFemale = addActivityFactors(1449.06);
        expect(mifflinStJeor(METRIC, weight, height, age, MALE)).toEqual(expectedForMale);
        expect(mifflinStJeor(METRIC, weight, height, age, FEMALE)).toEqual(expectedForFemale);
    });

    it('should calculate the Katch-McArdle equation with imperial units', () => {
        const weight = 200;
        const bodyFatPercentage = 20;
        const expected = addActivityFactors(1937.64);
        expect(katchMcardle(IMPERIAL, weight, bodyFatPercentage)).toEqual(expected);
    });

    it('should calculate the Katch-McArdle equation with metric units', () => {
        const weight = 69;
        const bodyFatPercentage = 15;
        const expected = addActivityFactors(1636.84);
        expect(katchMcardle(METRIC, weight, bodyFatPercentage)).toEqual(expected);
    });

    it('should calculate the Cunningham equation with imperial units', () => {
        const weight = 200;
        const bodyFatPercentage = 20;
        const expected = addActivityFactors(2096.67);
        expect(cunningham(IMPERIAL, weight, bodyFatPercentage)).toEqual(expected);
    });

    it('should calculate the Cunningham equation with metric units', () => {
        const weight = 69;
        const bodyFatPercentage = 15;
        const expected = addActivityFactors(1790.3);
        expect(cunningham(METRIC, weight, bodyFatPercentage)).toEqual(expected);
    });

    it('should calculate the average of all equations', () => {
        const total = 2015.08 + 1899.54 + 1937.64 + 2096.67;
        const expected = addActivityFactors(1987.23);
        expect(average(total, 4)).toEqual(expected);
    });

    it('should get all equations possible without body fat percentage', () => {
        const twoResults = getAll(user);
        expect(Object.keys(twoResults)).toHaveLength(3);
        expect(twoResults[HARRIS_BENEDICT].base.value).toBe(2015.08);
        expect(twoResults[MIFFLIN_ST_JEOR].base.value).toBe(1899.54);
        expect(twoResults[AVERAGE].base.value).toBe(1957.31);
    });

    it('should get all equations possible with body fat percentage', () => {
        user.bodyFatPercentage = 20;
        const twoResults = getAll(user);
        expect(Object.keys(twoResults)).toHaveLength(5);
        expect(twoResults[HARRIS_BENEDICT].base.value).toBe(2015.08);
        expect(twoResults[MIFFLIN_ST_JEOR].base.value).toBe(1899.54);
        expect(twoResults[KATCH_MCARDLE].base.value).toBe(1937.64);
        expect(twoResults[CUNNINGHAM].base.value).toBe(2096.67);
        expect(twoResults[AVERAGE].base.value).toBe(1937.95);
    });

    it('should add activity factors', () => {
        const base = 2000;
        const expected = {
            base: {display: 'Base BMR', value: base},
            [NO_ACTIVITY]: {display: 'None', value: base},
            [SEDENTARY]: {display: 'Sedentary', value: 2400},
            [LIGHT]: {display: 'Lightly Active', value: 2750},
            [MODERATE]: {display: 'Moderately Active', value: 3100},
            [VERY_ACTIVE]: {display: 'Very Active', value: 3450},
            [EXTREMELY_ACTIVE]: {display: 'Extremely Active', value: 3800}
        };
        expect(addActivityFactors(base)).toEqual(expected);
    });
});
