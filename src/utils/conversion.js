export const convertToKilograms = (pounds) => {
    return +(pounds * 0.45359237).toFixed(2);
};

export const convertToPounds = (kilograms) => {
    return +(kilograms * 2.204623).toFixed(2);
};

export const convertToCentimeters = (inches) => {
    return +(inches * 2.54).toFixed(2);
};
