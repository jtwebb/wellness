import React from 'react';
import { shallow } from 'enzyme';
import { ActivityComponent } from './activity';
import { IMPERIAL, METRIC } from '../../redux/userReducer';

let props;

beforeEach(() => {
    props = {
        unitOfMeasure: IMPERIAL
    };
});

describe('Calculators', () => {
    it('renders without crashing with imperial units', () => {
        const wrapper = shallow(<ActivityComponent {...props}/>);
        expect(wrapper.find('.activity-page')).toHaveLength(1);
    });

    it('renders without crashing with metric units', () => {
        props.unitOfMeasure = METRIC;
        const wrapper = shallow(<ActivityComponent {...props}/>);
        expect(wrapper.find('.activity-page')).toHaveLength(1);
    });

    it('should set the category', () => {
        const wrapper = shallow(<ActivityComponent {...props}/>);
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        const input = wrapper.find('.category-input');
        const activity = {description: 'An Activity', id: '1234', category: 'Conditioning Exercise'};
        wrapper.state().activities = [activity];
        input.simulate('change', {target: {value: 'Conditioning Exercise'}});
        expect(spy).toHaveBeenCalledWith({activityCategory: 'Conditioning Exercise', activities: [activity], currentActivity: activity});
    });

    it('should set the category if it is set to all', () => {
        const wrapper = shallow(<ActivityComponent {...props}/>);
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        const input = wrapper.find('.category-input');
        const activity = {description: 'An Activity', id: '1234', category: 'Conditioning Exercise'};
        wrapper.state().activities = [activity];
        input.simulate('change', {target: {value: 'All'}});
        expect(spy).toHaveBeenCalledWith({activityCategory: 'All', activities: [activity], currentActivity: activity});
    });

    it('should set the current activity', () => {
        const wrapper = shallow(<ActivityComponent {...props}/>);
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        const input = wrapper.find('.activity-input');
        const activity = {description: 'An Activity', id: '1234', category: 'Conditioning Exercise'};
        wrapper.state().activities = [activity];
        input.simulate('change', {target: {value: '1234'}});
        expect(spy).toHaveBeenCalledWith({currentActivity: activity});
    });

    it('should set the duration', () => {
        const wrapper = shallow(<ActivityComponent {...props}/>);
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        const input = wrapper.find('.duration-input');
        input.simulate('change', {target: {value: 25}});
        expect(spy).toHaveBeenCalledWith({duration: 25});
    });

    it('should not render results if there is not a current activity', () => {
        const wrapper = shallow(<ActivityComponent {...props}/>);
        wrapper.state().currentActivity = undefined;
        wrapper.instance().forceUpdate();
        expect(wrapper.find('.activity-description')).toHaveLength(0);
    });
});
