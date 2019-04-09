import React from 'react';
import { shallow } from 'enzyme';
import { WeightSuggestionComponent } from './weightSuggestion';

let props;

beforeEach(() => {
    props = {
        bodyFatPercentage: 20,
        weight: 200,
        idealBodyFatPercentage: 15
    };
});

describe('Weight Suggestion', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<WeightSuggestionComponent {...props}/>);
        expect(wrapper.find('.weight-suggestion')).toHaveLength(1);
        expect(wrapper.find('.suggestion-body')).toHaveLength(1);
        expect(wrapper.find('.suggestion-error')).toHaveLength(0);
    });

    it('renders without crashing', () => {
        props.idealBodyFatPercentage = 0;
        const wrapper = shallow(<WeightSuggestionComponent {...props}/>);
        expect(wrapper.find('.weight-suggestion')).toHaveLength(1);
        expect(wrapper.find('.suggestion-body')).toHaveLength(0);
        expect(wrapper.find('.suggestion-error')).toHaveLength(1);
    });
});
