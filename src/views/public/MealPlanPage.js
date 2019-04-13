import React from "react";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {LOAD_MEAL_PLANS, LOAD_MEALS, MEAL_PLAN_SELECTED} from "../../actions/mealPlanActions";
import mealPlanService from "../../services/mealPlanService";

const styles = {};

class MealPlanPage extends React.Component {

    componentWillMount() {
        const {
            token,
            mealPlans,
            match,
            loadingStart,
            loadMealPlans,
            selectMealPlan,
            loadMeals,
            loadingComplete } = this.props;

       loadingStart();
       Promise.resolve()
           .then(() => {
               if (mealPlans < 1) {
                   return mealPlanService.getMealPlans(token)
                       .then((mealPlans) => {
                           loadMealPlans(mealPlans);
                       })
                       .catch(console.err);
               }
           })
           .then(() => {
               selectMealPlan(Number(match.params.id));
               return mealPlanService.getMeals(token, Number(match.params.id));
           })
           .then((meals) => {
               loadMeals(meals);
               loadingComplete();
           })
           .catch(console.err);
    }

    render() {
        const { selectedPlan, meals } = this.props;
        return <div>
            <h1>{JSON.stringify(selectedPlan)}</h1>
            {
                meals.map(meal => <p>{JSON.stringify(meal)}</p>)
            }
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        selectedPlan: state.mealPlans.selectedPlan,
        mealPlans: state.mealPlans.plans,
        meals: state.mealPlans.meals,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
        loadMealPlans: (plans) => dispatch({ type: LOAD_MEAL_PLANS, payload: { plans } }),
        loadMeals: (meals) => dispatch({ type: LOAD_MEALS, payload: { meals } }),
        selectMealPlan: (id) => dispatch({ type: MEAL_PLAN_SELECTED, payload: { id } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlanPage);
export default withStyles(styles)(connected);