import React from 'react';
import { shallow } from 'enzyme';
import SidebarFormComponent from './sidebarForm';

let props;

beforeEach(() => {
    props = {
        hideCurrent: false,
        current: {},
        hideGoals: false,
        goal: {}
    };
});

describe('Sidebar Form', () => {
    it('renders without crashing with imperial units', () => {
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        expect(wrapper.find('.current-toggle')).toHaveLength(1);
        expect(wrapper.find('.goal-toggle')).toHaveLength(1);
    });

    it('should toggle current form visibility on button click', () => {
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        const button = wrapper.find('.current-toggle');
        expect(wrapper.state().currentInformationIsOpen).toBeTruthy();
        button.simulate('click');
        expect(wrapper.state().currentInformationIsOpen).toBeFalsy();
    });

    it('should toggle goal form visibility on button click', () => {
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        const button = wrapper.find('.goal-toggle');
        expect(wrapper.state().goalInformationIsOpen).toBeTruthy();
        button.simulate('click');
        expect(wrapper.state().goalInformationIsOpen).toBeFalsy();
    });

    it('should not show current if hideCurrent is set', () => {
        props.hideCurrent = true;
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        expect(wrapper.find('.current-toggle')).toHaveLength(0);
    });

    it('should not show goals if hideGoals is set', () => {
        props.hideGoals = true;
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        expect(wrapper.find('.goal-toggle')).toHaveLength(0);
    });

    it('should honor the props currentOpen if set', () => {
        props.currentOpen = false;
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        expect(wrapper.state().currentInformationIsOpen).toBeFalsy();
    });

    it('should honor the props goalOpen if set', () => {
        props.goalOpen = false;
        const wrapper = shallow(<SidebarFormComponent {...props}/>);
        expect(wrapper.state().goalInformationIsOpen).toBeFalsy();
    });
});
