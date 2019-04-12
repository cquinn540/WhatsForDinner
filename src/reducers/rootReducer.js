import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import mainReducer from "./mainReducer";
import mealPlanReducer from "./mealPlanReducer";

export default combineReducers({
    main: mainReducer,
    account: accountReducer,
    mealPlans: mealPlanReducer,
});