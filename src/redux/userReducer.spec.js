import userReducer, { AVERAGE, IMPERIAL, KATCH_MCARDLE, MALE, MODERATE, SEDENTARY } from './userReducer';
import * as dataStorage from '../data/localStorage';
import moment from 'moment';

describe('User Reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer.reducer(undefined, {})).toEqual({
            activityFactor: SEDENTARY,
            age: 0,
            bodyFatPercentage: 0,
            email: '',
            exercises: [],
            fatLossPerWeek: 1,
            gender: MALE,
            goalDate: moment(new Date()).format('YYYY-MM-DD'),
            height: 0,
            idealBodyFatPercentage: 0,
            idealWeight: 0,
            lowestCalorieIntake: 1200,
            name: '',
            percentLossPerWeek: 1,
            preferredCalculator: AVERAGE,
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            unitOfMeasure: IMPERIAL,
            weight: 0
        });
    });

    it('should update the user profile', () => {
        const spy = jest.spyOn(dataStorage, 'saveData');
        const updatedProfile = userReducer.reducer({}, {
            type: 'updateUserProfile',
            payload: {
                key: 'weight',
                value: 200
            }
        });
        expect(spy).toHaveBeenCalledWith({
            weight: 200
        });
        expect(updatedProfile).toEqual({weight: 200});
    });

    it('should not parse the date', () => {
        const spy = jest.spyOn(dataStorage, 'saveData');
        const date = new Date();
        date.setDate(date.getDate() + 90);
        const updatedProfile = userReducer.reducer({}, {
            type: 'updateUserProfile',
            payload: {
                key: 'goalDate',
                value: moment(date).format('MM-DD-YYYY')
            }
        });
        expect(spy).toHaveBeenCalledWith({
            goalDate: moment(date).format('MM-DD-YYYY')
        });
        expect(updatedProfile).toEqual({goalDate: moment(date).format('MM-DD-YYYY')});
    });
});
