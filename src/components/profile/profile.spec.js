import React from 'react';
import { shallow } from 'enzyme';
import { ProfileComponent } from './profile';

let props;

beforeEach(() => {
    props = {
        bodyFatPercentage: 20,
        weight: 200,
        idealBodyFatPercentage: 15
    };
});

describe('Profile', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<ProfileComponent {...props}/>);
        expect(wrapper.find('.profile')).toHaveLength(1);
    });
});
