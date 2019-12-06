import { createSlice } from 'redux-starter-kit';

const activities = createSlice({
    initialState: {
        activities: [],
        categories: []
    },
    reducers: {
        getActivities(state, action) {
            if ((state.activities || []).length) {
                return state.activities;
            }

            return fetchActivities();
        },
        fetchActivitiesSuccess(state, action) {
            const categories = [...new Set(['All'].concat(action.payload.activities.map((activity) => {
                return activity.category;
            })))]
                .map((category) => {
                    return {value: category, label: category};
                });

            return {...state, categories, activities: action.payload.activities.sort((a, b) => {
                return (a.label > b.label) ? 1 : (b.label > a.label) ? -1 : 0;
            })};
        }
    }
});

export default activities;

export const fetchActivities = (currentActivities) => async dispatch => {
    if (currentActivities && currentActivities.length) {
        return currentActivities;
    }

    try {
        const data = await import('../data/physicalActivities');
        dispatch(activities.actions.fetchActivitiesSuccess(data));
    } catch (error) {
        console.error(error);
    }
};
