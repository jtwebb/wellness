import React from 'react';
import { shallow } from 'enzyme';
import App from './app';

describe('App', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('.app')).toHaveLength(1);
    });
});
