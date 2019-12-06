import { combineReducers } from 'redux';
import userReducer from './userReducer';
import activityReducer from './activityReducer';

export default combineReducers({
    user: userReducer.reducer,
    activity: activityReducer.reducer
});
