import React from 'react';
import { shallow } from 'enzyme';
import ActivityFactorComponent from './activityFactor';

describe('Activity Factor', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<ActivityFactorComponent/>);
        expect(wrapper.find('.activity-factor-definitions')).toHaveLength(1);
    });

    it('should toggle definition visibility', () => {
        const wrapper = shallow(<ActivityFactorComponent/>);
        expect(wrapper.state().definitionIsOpen).toBeFalsy();
        const spy = jest.spyOn(wrapper.instance(), 'setState');
        wrapper.find('.definitions-button').simulate('click');
        expect(spy).toHaveBeenCalledWith({definitionIsOpen: true});
        expect(wrapper.state().definitionIsOpen).toBeTruthy();
    });
});
