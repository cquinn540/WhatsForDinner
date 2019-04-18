import BaseService from "./BaseService";

const host = 'http://localhost:3001';

class MealPlanService extends BaseService {

    /**
     * @param token {string} user token
     * @returns {Promise<void>}
     */
    async getMealPlans(token) {
        const response = await fetch(`${host}/api/mealplan`, {
            headers: super.getHeaders(token),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }

        const json = await response.json();
        return json.map(plan => {
            return {
                ...plan,
                startDate: new Date(plan.startDate),
                endDate: new Date(plan.endDate),
            }
        });
    }

    async createMealPlan(token, { name, startDate, endDate }) {
        const response = await fetch(`${host}/api/mealplan`, {
            headers: super.getHeaders(token),
            method: 'POST',
            body: JSON.stringify({ name, startDate, endDate }),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }

        return Number(await response.text());
    }

    async getMeals(token, mealPlanId) {
        const response = await fetch(`${host}/api/mealplan/${mealPlanId}/meals`, {
            headers: super.getHeaders(token),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }

        const json = await response.json();
        return json.map(meal => {
            return {
                ...meal,
                dateTime: new Date(meal.dateTime),
            };
        });
    }

    async saveMeal(token, mealPlanId, meal) {
        const response = await fetch(`${host}/api/mealplan/${mealPlanId}/meals/${meal.id}`, {
            headers: super.getHeaders(token),
            method: 'PUT',
            body: JSON.stringify(meal),
        });

        if(!response.ok) {
            throw new Error(await response.text());
        }
    }
}

export default new MealPlanService();