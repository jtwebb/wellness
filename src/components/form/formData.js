import {
    AVERAGE,
    CUNNINGHAM,
    EXTREMELY_ACTIVE,
    FEMALE,
    HARRIS_BENEDICT,
    IMPERIAL,
    KATCH_MCARDLE,
    LIGHT,
    MALE,
    METRIC,
    MIFFLIN_ST_JEOR,
    MODERATE,
    NO_ACTIVITY,
    SEDENTARY,
    VERY_ACTIVE
} from '../../redux/userReducer';

export const getForm = (unit) => {
    return [
        {
            groupId: 'current',
            groupName: 'Current Information',
            fields: [
                {
                    display: 'Email Address',
                    key: 'email',
                    type: 'email'
                },
                {
                    display: 'Name',
                    key: 'name',
                    type: 'text'
                },
                {
                    display: 'Age',
                    key: 'age',
                    type: 'number',
                    step: 1
                },
                {
                    display: `Height (${unit === IMPERIAL ? 'in' : 'cm'})`,
                    key: 'height',
                    type: 'number',
                    step: 1
                },
                {
                    display: `Weight (${unit === IMPERIAL ? 'lbs' : 'kg'})`,
                    key: 'weight',
                    type: 'number',
                    step: .01
                },
                {
                    display: 'Body Fat Percentage (if known)',
                    key: 'bodyFatPercentage',
                    type: 'number',
                    step: .01
                },
                {
                    display: 'Gender',
                    key: 'gender',
                    type: 'select',
                    options: [
                        {value: MALE, display: 'Male'},
                        {value: FEMALE, display: 'Female'}
                    ]
                },
                {
                    display: 'Unit of Measure',
                    key: 'unitOfMeasure',
                    type: 'select',
                    options: [
                        {value: IMPERIAL, display: 'Imperial'},
                        {value: METRIC, display: 'Metric'}
                    ]
                },
                {
                    display: 'Activity Factor',
                    key: 'activityFactor',
                    type: 'select',
                    options: [
                        {value: NO_ACTIVITY, display: 'None'},
                        {value: SEDENTARY, display: 'Sedentary'},
                        {value: LIGHT, display: 'Lightly Active'},
                        {value: MODERATE, display: 'Moderately Active'},
                        {value: VERY_ACTIVE, display: 'Very Active'},
                        {value: EXTREMELY_ACTIVE, display: 'Extremely Active'}
                    ]
                }
            ]
        },
        {
            groupId: 'goal',
            groupName: 'Goal Information',
            fields: [
                {
                    display: `Ideal Weight (${unit === IMPERIAL ? 'lbs' : 'kg'})`,
                    key: 'idealWeight',
                    type: 'number',
                    step: .01
                },
                {
                    display: 'Ideal Body Fat Percentage',
                    key: 'idealBodyFatPercentage',
                    type: 'number',
                    step: .01
                },
                {
                    display: `${unit === IMPERIAL ? 'Pounds' : 'Kilograms'} Loss Per Week`,
                    key: 'fatLossPerWeek',
                    type: 'number',
                    step: .01
                },
                {
                    display: 'Lowest Calories Per Day',
                    key: 'lowestCalorieIntake',
                    type: 'number',
                    step: 1
                },
                {
                    display: 'Body Weight Percentage Lose Per Week',
                    key: 'percentLossPerWeek',
                    type: 'number',
                    step: .01
                },
                {
                    display: 'Start Date',
                    key: 'startDate',
                    type: 'date'
                },
                {
                    display: 'Goal Date',
                    key: 'goalDate',
                    type: 'date'
                },
                {
                    display: 'Preferred BMR Calculator',
                    key: 'preferredCalculator',
                    type: 'select',
                    options: [
                        {value: AVERAGE, display: 'Averages'},
                        {value: HARRIS_BENEDICT, display: 'Revised Harris Benedict Equation'},
                        {value: MIFFLIN_ST_JEOR, display: 'Mifflin-St Jeor Equation'},
                        {value: KATCH_MCARDLE, display: 'Katch-McArdle'},
                        {value: CUNNINGHAM, display: 'Cunningham'}
                    ]
                }
            ]
        }
    ];
};
