import React from 'react';
import { shallow } from 'enzyme';
import { CalculatorsComponent } from './calculators';
import { IMPERIAL, METRIC } from '../../redux/userReducer';
import * as calculators from '../../utils/weightLossCalculators';

let props;

beforeEach(() => {
    props = {
        unitOfMeasure: IMPERIAL
    };
});

describe('Calculators', () => {
    it('renders without crashing with imperial units', () => {
        const wrapper = shallow(<CalculatorsComponent {...props}/>);
        expect(wrapper.find('.calculators-page')).toHaveLength(1);
    });

    it('renders without crashing with metric units', () => {
        props.unitOfMeasure = METRIC;
        const wrapper = shallow(<CalculatorsComponent {...props}/>);
        expect(wrapper.find('.calculators-page')).toHaveLength(1);
    });

    it('should change the calculator results', () => {
        const wrapper = shallow(<CalculatorsComponent {...props}/>);
        const selector = wrapper.find('.calculator-selector');
        const percentageSpy = jest.spyOn(calculators, 'byPercentage');
        const goalSpy = jest.spyOn(calculators, 'byGoalDate');
        selector.simulate('change', {target: {value: 'percentage'}});
        expect(percentageSpy).toHaveBeenCalled();
        selector.simulate('change', {target: {value: 'goalDate'}});
        expect(goalSpy).toHaveBeenCalled();
    });

    it('should not change the calculator results if the calculator is the same', () => {
        const wrapper = shallow(<CalculatorsComponent {...props}/>);
        const selector = wrapper.find('.calculator-selector');
        const poundSpy = jest.spyOn(calculators, 'poundsPerWeek');
        selector.simulate('change', {target: {value: 'pounds'}});
        expect(poundSpy).not.toHaveBeenCalled();
    });

    it('should toggle current form visibility on button click', () => {
        const wrapper = shallow(<CalculatorsComponent {...props}/>);
        const button = wrapper.find('.current-toggle');
        expect(wrapper.state().currentInformationIsOpen).toBeFalsy();
        button.simulate('click');
        expect(wrapper.state().currentInformationIsOpen).toBeTruthy();
    });

    it('should toggle goal form visibility on button click', () => {
        const wrapper = shallow(<CalculatorsComponent {...props}/>);
        const button = wrapper.find('.goal-toggle');
        expect(wrapper.state().goalInformationIsOpen).toBeTruthy();
        button.simulate('click');
        expect(wrapper.state().goalInformationIsOpen).toBeFalsy();
    });
});
