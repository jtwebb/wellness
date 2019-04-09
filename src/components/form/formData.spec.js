import { getForm } from './formData';
import { IMPERIAL, METRIC } from '../../redux/userReducer';

describe('Form Data', () => {
    it('should set the correct unit of measure for metric', () => {
        const formData = getForm(METRIC);
        const currentGroup = formData.find(group => group.groupId === 'current');
        const heightObject = currentGroup.fields.find(field => field.key === 'height');
        expect(heightObject.display).toBe('Height (cm)');
    });

    it('should set the correct unit of measure for imperial', () => {
        const formData = getForm(IMPERIAL);
        const currentGroup = formData.find(group => group.groupId === 'current');
        const heightObject = currentGroup.fields.find(field => field.key === 'height');
        expect(heightObject.display).toBe('Height (in)');
    });
});
