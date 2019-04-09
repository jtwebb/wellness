import React from 'react';
import { shallow } from 'enzyme';
import { FormComponent } from './form';

let props;

beforeEach(() => {
    props = {
        bodyFatPercentage: 20,
        weight: 200,
        idealBodyFatPercentage: 15,
        allGroups: true,
        showTitle: true,
        allFields: true,
        updateUserProfile: jest.fn()
    };
});

describe('Form', () => {
    it('renders without crashing', () => {
        props.allGroups = false;
        const wrapper = shallow(<FormComponent {...props}/>);
        expect(wrapper.find('.user-form')).toHaveLength(1);
        expect(wrapper.find('.group-current')).toHaveLength(0);
    });

    it('should render the group body', () => {
        props.allFields = false;
        const wrapper = shallow(<FormComponent {...props}/>);
        expect(wrapper.find('.user-form')).toHaveLength(1);
        expect(wrapper.find('.group-current')).toHaveLength(1);
    });

    it('should render the group fields', () => {
        const wrapper = shallow(<FormComponent {...props}/>);
        expect(wrapper.find('.user-form')).toHaveLength(1);
        expect(wrapper.find('.group-current')).toHaveLength(1);
        expect(wrapper.find('#height')).toHaveLength(1);
    });

    it('should update user on input change', () => {
        const wrapper = shallow(<FormComponent {...props}/>);
        const height = wrapper.find('#height');
        height.simulate('change', {target: {value: 70}});
        expect(props.updateUserProfile).toHaveBeenCalledWith('height', 70);
    });

    it('should update user on select change', () => {
        const wrapper = shallow(<FormComponent {...props}/>);
        const height = wrapper.find('#gender');
        height.simulate('change', {target: {value: 70}});
        expect(props.updateUserProfile).toHaveBeenCalledWith('gender', 70);
    });
});
