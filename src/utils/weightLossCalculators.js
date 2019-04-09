import { getAll } from './bmrCalculators';
import { IMPERIAL } from '../redux/userReducer';
import { convertToPounds } from './conversion';

export const poundsPerWeek = (user) => {
    if (!user.weight || !user.idealWeight || !user.fatLossPerWeek) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};
    let bmr = 0;

    while (updatedUser.weight > user.idealWeight) {
        updatedUser = {...updatedUser, weight: updatedUser.weight - user.fatLossPerWeek};
        const results = caloriesToBurn(updatedUser, user.fatLossPerWeek);
        bmr += results.bmr;
        weeks.push({
            caloriesToBurn: results.calories,
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2)
        });
    }

    return {
        dailyCalorieDeficit: +(getCaloriesForFatLoss(user.fatLossPerWeek, user.unitOfMeasure) / 7).toFixed(2),
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2)
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
    let bmr = 0;

    for (let i = 0; i < weeksToLose; i++) {
        updatedUser = {...updatedUser, weight: updatedUser.weight - weightPerWeek};
        const results = caloriesToBurn(updatedUser, weightPerWeek);
        bmr += results.bmr;
        weeks.push({
            caloriesToBurn: results.calories,
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2)
        });
    }

    return {
        dailyCalorieDeficit: +(getCaloriesForFatLoss(weightPerWeek, user.unitOfMeasure) / 7).toFixed(2),
        weightPerWeek,
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2)
    };
};

export const byPercentage = (user) => {
    if (!user.weight || !user.idealWeight || !user.percentLossPerWeek) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};
    let bmr = 0;

    while (updatedUser.weight > user.idealWeight && user.percentLossPerWeek > 0) {
        const weightToLose = updatedUser.weight * (user.percentLossPerWeek / 100);
        updatedUser = {...updatedUser, weight: updatedUser.weight - weightToLose};
        const results = caloriesToBurn(updatedUser, weightToLose);
        bmr += results.bmr;

        weeks.push({
            caloriesToBurn: results.calories,
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2),
            weightLost: +weightToLose.toFixed(2)
        });
    }

    return {
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2)
    };
};

export const caloriesToBurn = (user, weightPerWeek) => {
    const bmr = getAll(user)[user.preferredCalculator];
    const goalDailyCalorieDeficit = getCaloriesForFatLoss(weightPerWeek, user.unitOfMeasure) / 7;
    const dailyCalorieIntake = bmr[user.activityFactor].value - goalDailyCalorieDeficit;

    return {bmr: bmr[user.activityFactor].value, calories: +(user.lowestCalorieIntake - dailyCalorieIntake).toFixed(2)};
};

export const getCaloriesForFatLoss = (fatLossPerWeek, unit) => {
    return +(unit === IMPERIAL ? fatLossPerWeek * 3500 : convertToPounds(fatLossPerWeek) * 3500).toFixed(2);
};
