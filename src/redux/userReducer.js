import { createSlice } from 'redux-starter-kit';
import { getData, saveData } from '../data/localStorage';
import moment from 'moment';

export const MALE = 'MALE';
export const FEMALE = 'FEMALE';

export const IMPERIAL = 'IMPERIAL';
export const METRIC = 'METRIC';

export const NO_ACTIVITY = 'NO_ACTIVITY';
export const SEDENTARY = 'SEDENTARY';
export const LIGHT = 'LIGHT';
export const MODERATE = 'MODERATE';
export const VERY_ACTIVE = 'VERY_ACTIVE';
export const EXTREMELY_ACTIVE = 'EXTREMELY_ACTIVE';

export const AVERAGE = 'AVERAGE';
export const HARRIS_BENEDICT = 'HARRIS_BENEDICT';
export const MIFFLIN_ST_JEOR = 'MIFFLIN_ST_JEOR';
export const KATCH_MCARDLE = 'KATCH_MCARDLE';
export const CUNNINGHAM = 'CUNNINGHAM';

export default createSlice({
    initialState: getData() || {
        activityFactor: SEDENTARY,
        age: 0,
        bodyFatPercentage: 0,
        email: '',
        fatLossPerWeek: 1,
        gender: MALE,
        goalDate: moment(new Date()).format('MM-DD-YYYY'),
        height: 0,
        idealBodyFatPercentage: 0,
        idealWeight: 0,
        lowestCalorieIntake: 1200,
        name: '',
        percentLossPerWeek: 1,
        preferredCalculator: AVERAGE,
        unitOfMeasure: IMPERIAL,
        weight: 0
    },
    reducers: {
        updateUserProfile(state, action) {
            const raw = isNaN(parseFloat(action.payload.value)) || action.payload.key === 'goalDate';
            const newState = {...state, [action.payload.key]: raw ? action.payload.value : parseFloat(action.payload.value)};
            saveData(newState);
            return newState;
        }
    }
});
