import { convertToPounds, convertToCentimeters, convertToKilograms } from './conversion';

describe('Conversion', () => {
    it('should convert pounds to kilograms', () => {
        const pounds = 150;
        const expected = 68.04;
        expect(convertToKilograms(pounds)).toEqual(expected);
    });

    it('should convert kilograms to pounds', () => {
        const kilograms = 120;
        const expected = 264.55;
        expect(convertToPounds(kilograms)).toEqual(expected);
    });

    it('should convert inches to centimeters', () => {
        const inches = 70;
        const expected = 177.8;
        expect(convertToCentimeters(inches)).toEqual(expected);
    });
});
