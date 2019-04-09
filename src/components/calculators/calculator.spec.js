import React from 'react';
import { shallow } from 'enzyme';
import CalculatorComponent from './calculator';
import { IMPERIAL, METRIC } from '../../redux/userReducer';

let props;

beforeEach(() => {
    props = {
        unitOfMeasure: METRIC,
        calculatorResults: {
            averageBmr: 1990,
            dailyCalorieDeficit: 759,
            weightPerWeek: 2.76,
            weeks: [{
                caloriesToBurn: 500,
                weightAtEndOfWeek: 198,
                weightLost: 2
            }]
        }
    };
});

describe('Calculator', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<CalculatorComponent {...props}/>);
        expect(wrapper.find('.calculator-results')).toHaveLength(1);
        expect(wrapper.find('.no-data-error')).toHaveLength(0);
    });

    it('should render error message', () => {
        props.calculatorResults = undefined;
        const wrapper = shallow(<CalculatorComponent {...props}/>);
        expect(wrapper.find('.calculator-results')).toHaveLength(0);
        expect(wrapper.find('.no-data-error')).toHaveLength(1);
    });

    it('renders without crashing using imperial calculations', () => {
        props.unitOfMeasure = IMPERIAL;
        const wrapper = shallow(<CalculatorComponent {...props}/>);
        expect(wrapper.find('.calculator-results')).toHaveLength(1);
        expect(wrapper.find('.no-data-error')).toHaveLength(0);
    });
});
