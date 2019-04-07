import { getAll } from './bmrCalculators';
import { IMPERIAL } from '../redux/userReducer';
import { convertToPounds } from './conversion';

export const poundsPerWeek = (user) => {
    if (!user.weight || !user.idealWeight || !user.fatLossPerWeek) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};

    while (updatedUser.weight > user.idealWeight) {
        updatedUser = {...updatedUser, weight: updatedUser.weight - user.fatLossPerWeek};
        weeks.push({
            caloriesToBurn: caloriesToBurn(updatedUser, user.fatLossPerWeek),
            weightAtEndOfWeek: updatedUser.weight
        });
    }

    return {
        dailyCalorieDeficit: getCaloriesForFatLoss(user.fatLossPerWeek, user.unitOfMeasure) / 7,
        weeks
    };
};

export const byGoalDate = (user) => {
    if (!user.weight || !user.idealWeight || !user.goalDate) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};
    const weightToLose = user.weight - user.idealWeight;
    const daysToLose = Math.round((new Date(user.goalDate) - Date.now()) / (1000 * 60 * 60 * 24));
    const weeksToLose = daysToLose / 7;
    const weightPerWeek = weightToLose / weeksToLose;

    for (let i = 0; i < weeksToLose; i++) {
        updatedUser = {...updatedUser, weight: updatedUser.weight - weightPerWeek};
        weeks.push({
            caloriesToBurn: caloriesToBurn(updatedUser, weightPerWeek),
            weightAtEndOfWeek: updatedUser.weight
        });
    }

    return {
        dailyCalorieDeficit: getCaloriesForFatLoss(weightPerWeek, user.unitOfMeasure) / 7,
        weightPerWeek,
        weeks
    };
};

export const byPercentage = (user) => {
    if (!user.weight || !user.idealWeight || !user.percentLossPerWeek) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};

    while (updatedUser.weight > user.idealWeight && user.percentLossPerWeek > 0) {
        const weightToLose = updatedUser.weight * (user.percentLossPerWeek / 100);
        updatedUser = {...updatedUser, weight: updatedUser.weight - weightToLose};
        weeks.push({
            caloriesToBurn: caloriesToBurn(updatedUser, weightToLose),
            weightAtEndOfWeek: updatedUser.weight,
            weightLost: weightToLose
        });
    }

    return {
        weeks
    };
};

const caloriesToBurn = (user, weightPerWeek) => {
    const bmr = getAll(user)[user.preferredCalculator];
    const goalDailyCalorieDeficit = getCaloriesForFatLoss(weightPerWeek, user.unitOfMeasure) / 7;
    const dailyCalorieIntake = bmr[user.activityFactor].value - goalDailyCalorieDeficit;

    return user.lowestCalorieIntake - dailyCalorieIntake;
};

const getCaloriesForFatLoss = (fatLossPerWeek, unit) => {
    return unit === IMPERIAL ? fatLossPerWeek * 3500 : convertToPounds(fatLossPerWeek) * 3500;
};
