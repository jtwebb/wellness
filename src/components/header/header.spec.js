import React from 'react';
import { shallow } from 'enzyme';
import HeaderComponent from './header';

describe('Profile', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<HeaderComponent/>);
        expect(wrapper.find('.app-header')).toHaveLength(1);
    });

    it('should toggle the open state', () => {
        const wrapper = shallow(<HeaderComponent/>);
        expect(wrapper.state().isOpen).toBeFalsy();
        wrapper.instance().toggle();
        expect(wrapper.state().isOpen).toBeTruthy();
    });

    it('should toggle the open state when the navbar toggler ic clicked', () => {
        const wrapper = shallow(<HeaderComponent/>);
        expect(wrapper.state().isOpen).toBeFalsy();
        wrapper.find('NavbarToggler').simulate('click');
        expect(wrapper.state().isOpen).toBeTruthy();
    });
});
