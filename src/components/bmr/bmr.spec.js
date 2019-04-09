import React from 'react';
import { shallow } from 'enzyme';
import { BmrComponent } from './bmr';
import { KATCH_MCARDLE, MALE, MODERATE } from '../../redux/userReducer';

let props;

beforeEach(() => {
    props = {
        bodyFatPercentage: 20,
        weight: 200,
        idealBodyFatPercentage: 15,
        age: 25,
        height: 70,
        gender: MALE,
        activityFactor: MODERATE
    };
});

describe('BMR Page', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<BmrComponent {...props}/>);
        expect(wrapper.find('.bmr-page')).toHaveLength(1);
        expect(wrapper.find('.bmr-results')).toHaveLength(1);
    });

    it('should render without crashing while showing preferred calculator', () => {
        props.preferredCalculator = KATCH_MCARDLE;
        props.bodyFatPercentage = undefined;
        const wrapper = shallow(<BmrComponent {...props}/>);
        expect(wrapper.find('.bmr-page')).toHaveLength(1);
        expect(wrapper.find('.bmr-results')).toHaveLength(1);
    });

    it('should show no data error', () => {
        props.activityFactor = undefined;
        const wrapper = shallow(<BmrComponent {...props}/>);
        expect(wrapper.find('.no-data-error')).toHaveLength(1);
    });

    it('should change current tab', () => {
        const wrapper = shallow(<BmrComponent {...props}/>);
        const currentTab = wrapper.find('NavLink').at(1);
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        expect(wrapper.state().activeTab).toBe(0);
        currentTab.simulate('click');
        expect(spy).toHaveBeenCalled();
        expect(wrapper.state().activeTab).toBe(1);
    });

    it('should not change tab if current is clicked on', () => {
        const wrapper = shallow(<BmrComponent {...props}/>);
        const currentTab = wrapper.find('.active');
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        currentTab.simulate('click');
        expect(spy).not.toHaveBeenCalled();
    });
});
