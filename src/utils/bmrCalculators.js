import { convertToCentimeters, convertToKilograms } from './conversion';
import {
    AVERAGE,
    CUNNINGHAM,
    EXTREMELY_ACTIVE,
    HARRIS_BENEDICT,
    IMPERIAL, KATCH_MCARDLE,
    LIGHT,
    MALE,
    MIFFLIN_ST_JEOR,
    MODERATE,
    NO_ACTIVITY,
    SEDENTARY,
    VERY_ACTIVE
} from '../redux/userReducer';

export const harrisBenedict = (unit, weight, height, age, gender) => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const adjustedHeight = unit === IMPERIAL ? convertToCentimeters(height) : height;
    let base;

    if (gender === MALE) {
        base = ((88.362 + 13.397 * adjustedWeight) + (4.799 * adjustedHeight) - (5.677 * age));
    } else {
        base = ((447.593 + 9.247 * adjustedWeight) + (3.098 * adjustedHeight) - (4.33 * age));
    }

    return addActivityFactors(+base.toFixed(2));
};

export const mifflinStJeor = (unit, weight, height, age, gender)  => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const adjustedHeight = unit === IMPERIAL ? convertToCentimeters(height) : height;
    let base;

    if (gender === MALE) {
        base = (9.99 * adjustedWeight + 6.25 * adjustedHeight - 4.92 * age + 5);
    } else {
        base = (9.99 * adjustedWeight + 6.25 * adjustedHeight - 4.92 * age - 161);
    }

    return addActivityFactors(+base.toFixed(2));
};

export const katchMcardle = (unit, weight, bodyFatPercentage) => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const lbm = adjustedWeight - (adjustedWeight * (bodyFatPercentage / 100));

    return addActivityFactors(+(370 + (21.6 * lbm)).toFixed(2));
};

export const cunningham = (unit, weight, bodyFatPercentage) => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const lbm = adjustedWeight - (adjustedWeight * (bodyFatPercentage / 100));

    return addActivityFactors(+(500 + (22 * lbm)).toFixed(2));
};

export const average = (total, calculatorsUsed) => {
    return addActivityFactors(+(total / calculatorsUsed).toFixed(2));
};

export const getAll = (user) => {
    let calculatorsUsed = 2;
    const results = {
        [HARRIS_BENEDICT]: harrisBenedict(user.unitOfMeasure, user.weight, user.height, user.age, user.gender),
        [MIFFLIN_ST_JEOR]: mifflinStJeor(user.unitOfMeasure, user.weight, user.height, user.age, user.gender)
    };
    let total = results[HARRIS_BENEDICT].base.value + results[MIFFLIN_ST_JEOR].base.value;

    if (user.bodyFatPercentage) {
        calculatorsUsed = 4;
        results[KATCH_MCARDLE] = katchMcardle(user.unitOfMeasure, user.weight, user.bodyFatPercentage);
        results[CUNNINGHAM] = cunningham(user.unitOfMeasure, user.weight, user.bodyFatPercentage);
        total += results[KATCH_MCARDLE].base.value + results[MIFFLIN_ST_JEOR].base.value;
    }

    results[AVERAGE] = average(total, calculatorsUsed);

    return results;
};

export const addActivityFactors = (base) => {
    return {
        base: {display: 'Base BMR', value: base},
        [NO_ACTIVITY]: {display: 'None', value: base},
        [SEDENTARY]: {display: 'Sedentary', value: base * 1.2},
        [LIGHT]: {display: 'Lightly Active', value: base * 1.375},
        [MODERATE]: {display: 'Moderately Active', value: base * 1.55},
        [VERY_ACTIVE]: {display: 'Very Active', value: base * 1.725},
        [EXTREMELY_ACTIVE]: {display: 'Extremely Active', value: base * 1.9}
    };
};
