import { convertToCentimeters, convertToKilograms } from './conversion';
import { EXTREMELY_ACTIVE, IMPERIAL, LIGHT, MALE, MODERATE, SEDENTARY, VERY_ACTIVE } from '../redux/userReducer';

export const harrisBenedict = (unit, weight, height, age, gender) => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const adjustedHeight = unit === IMPERIAL ? convertToCentimeters(height) : height;
    let base;

    if (gender === MALE) {
        base = ((88.4 + 13.4 * adjustedWeight) + (4.8 * adjustedHeight) - (5.68 * age));
    } else {
        base = ((447.6 + 9.25 * adjustedWeight) + (3.10 * adjustedHeight) - (4.33 * age));
    }

    return addActivityFactors(base);
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

    return addActivityFactors(base);
};

export const katchMcardle = (unit, weight, bodyFatPercentage) => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const lbm = adjustedWeight - (adjustedWeight * (bodyFatPercentage / 100));

    return addActivityFactors(370 + (21.6 * lbm));
};

export const cunningham = (unit, weight, bodyFatPercentage) => {
    const adjustedWeight = unit === IMPERIAL ? convertToKilograms(weight) : weight;
    const lbm = adjustedWeight - (adjustedWeight * (bodyFatPercentage / 100));

    return addActivityFactors(500 + (22 * lbm));
};

export const average = (total, calculatorsUsed) => {
    return addActivityFactors(total / calculatorsUsed);
};

const addActivityFactors = (base) => {
    return {
        base: {display: 'Base BMR', value: base},
        [SEDENTARY]: {display: 'Sedentary', value: base * 1.2},
        [LIGHT]: {display: 'Lightly Active', value: base * 1.375},
        [MODERATE]: {display: 'Moderately Active', value: base * 1.55},
        [VERY_ACTIVE]: {display: 'Very Active', value: base * 1.725},
        [EXTREMELY_ACTIVE]: {display: 'Extremely Active', value: base * 1.9},
    };
};
