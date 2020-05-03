import { getAll } from './bmrCalculators';
import { IMPERIAL, SEDENTARY } from '../redux/userReducer';
import { convertToKilograms, convertToPounds } from './conversion';
import accuMeasureData from '../components/calculators/accuMeasureData';

export const poundsPerWeek = (user) => {
    if (!user.weight || !user.idealWeight || !user.fatLossPerWeek) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};
    let bmr = 0;
    let burnPerDay = 0;

    while (updatedUser.weight > user.idealWeight) {
        updatedUser = {...updatedUser, weight: updatedUser.weight - user.fatLossPerWeek};
        const results = caloriesToBurn(updatedUser, user.fatLossPerWeek);
        bmr += results.bmr;
        burnPerDay += results.calories;
        weeks.push({
            caloriesToBurn: results.calories,
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2)
        });
    }

    return {
        dailyCalorieDeficit: +(getCaloriesForFatLoss(user.fatLossPerWeek, user.unitOfMeasure) / 7).toFixed(2),
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2),
        averageBurnPerDay: +(burnPerDay / weeks.length).toFixed(2)
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
    let burnPerDay = 0;

    for (let i = 0; i < weeksToLose; i++) {
        updatedUser = {...updatedUser, weight: updatedUser.weight - weightPerWeek};
        const results = caloriesToBurn(updatedUser, weightPerWeek);
        bmr += results.bmr;
        burnPerDay += results.calories;
        weeks.push({
            caloriesToBurn: results.calories,
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2)
        });
    }

    return {
        dailyCalorieDeficit: +(getCaloriesForFatLoss(weightPerWeek, user.unitOfMeasure) / 7).toFixed(2),
        weightPerWeek,
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2),
        averageBurnPerDay: +(burnPerDay / weeks.length).toFixed(2)
    };
};

export const byPercentage = (user) => {
    if (!user.weight || !user.idealWeight || !user.percentLossPerWeek) {
        return false;
    }

    const weeks = [];
    let updatedUser = {...user};
    let bmr = 0;
    let burnPerDay = 0;

    while (updatedUser.weight > user.idealWeight && user.percentLossPerWeek > 0) {
        const weightToLose = updatedUser.weight * (user.percentLossPerWeek / 100);
        updatedUser = {...updatedUser, weight: updatedUser.weight - weightToLose};
        const results = caloriesToBurn(updatedUser, weightToLose);
        bmr += results.bmr;
        burnPerDay += results.calories;

        weeks.push({
            caloriesToBurn: results.calories,
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2),
            weightLost: +weightToLose.toFixed(2)
        });
    }

    return {
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2),
        averageBurnPerDay: +(burnPerDay / weeks.length).toFixed(2)
    };
};

export const byExercise = (user) => {
    if (!user.weight || !user.idealWeight) {
        return false;
    }

    const weeks = [];
    let bmr = 0;
    let updatedUser = {...user};
    let poundsLostForWeek = 1;

    while (updatedUser.weight > user.idealWeight) {
        if (poundsLostForWeek < 0.1) {
            break;
        }
        const currentBmr = getAll(updatedUser)[user.preferredCalculator];
        bmr += currentBmr[SEDENTARY].value;
        let caloriesBurned = 0;
        user.workouts.forEach((workout) => {
            caloriesBurned += workout.exercises.reduce((previous, current) => {
                return previous + (+getCaloriesBurned(updatedUser.weight, current.duration, current.activity.mets, user));
            }, 0)
        });
        caloriesBurned += (currentBmr[SEDENTARY].value * 7) - (user.lowestCalorieIntake * 7);
        poundsLostForWeek = caloriesBurned / 3500;
        updatedUser.weight = updatedUser.weight - (user.unitOfMeasure === IMPERIAL ? poundsLostForWeek : convertToKilograms(poundsLostForWeek));
        weeks.push({
            caloriesBurnedPerDay: (caloriesBurned / 7).toFixed(2),
            weightAtEndOfWeek: +updatedUser.weight.toFixed(2),
            weightLost: user.unitOfMeasure === IMPERIAL ? poundsLostForWeek.toFixed(2) : convertToKilograms(poundsLostForWeek).toFixed(2)
        });
    }

    return {
        weeks,
        averageBmr: +(bmr / weeks.length).toFixed(2),
        weightPerWeek: +((user.weight - updatedUser.weight) / weeks.length).toFixed(2),
        caloriesBurnedPerDayExplanation: true
    };
};

export const byAccuMeasure = (user, measurement = 0) => {
    if (!user.age || !user.gender) {
        return false;
    }

    const adjustedMeasurement = measurement > 36 ? 36 : measurement < 2 ? 2 : measurement;
    const adjustedAge = user.age > 150 ? 150 : user.age < 0 ? 0 : user.age;
    const ageGroup = accuMeasureData[user.gender.toLowerCase()].find((group) => {
        return group.maxAge >= adjustedAge && group.minAge <= adjustedAge;
    });

    if (!ageGroup) {
        return 0;
    }

    if (measurement > 36) {
        return ageGroup[36] + ((measurement - 36) * .25);
    }

    return ageGroup[adjustedMeasurement];
};

export const getWeight = (weight, user) => {
    return user.unitOfMeasure === IMPERIAL ? convertToKilograms(weight) : weight;
};

export const getCaloriesBurned = (weight, duration, mets, user) => {
    return (duration * (mets * 3.5 * getWeight(weight, user)) / 200).toFixed(2);
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
