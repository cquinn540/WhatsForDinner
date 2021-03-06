/**
 * Entity for Meal
 */
class Meal {
    constructor() {
        this.id = null;
        this.name = null;
        this.dateTime = null;
        this.servingsRequired = null;
        this.recipes = []; // Array of Recipe objects
        this.mealPlan = null; // Parent MealPlan object
        this.note = null;
    }
}

module.exports = Meal;