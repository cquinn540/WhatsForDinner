const Ingredient = require('../model/Ingredient');
const MeasurementUnit = require('../model/MeasurementUnit');

class IngredientCount {

    constructor(){
        this.measurementUnit = null;
        this.measurement = 0.0;
        this.ingredient = null;
    }

    //getters

    getMeasurementUnit(){
        return this.measurementUnit;
    }

    getMeasurement(){
        return this.measurement;
    }

    getIngredient(){
        return this.ingredient;
    }

    getIngredientID() {
        return this.ingredient.getID();
    }

    getMeasurementID(){
        return this.measurementUnit.getID();
    }

    //setters

    setMeasurementUnit(newMeasurementUnit){
        this.measurementUnit = new MeasurementUnit();
        this.measurementUnit = newMeasurementUnit;
    }

    setMeasurement(newMeasurement){
        this.measurement = newMeasurement;
    }

    setIngredient(newIngredient) {
        this.ingredient = new Ingredient();
        this.ingredient = newIngredient;
    }

    /**
     * Method that will be called when generating JSON to send to client
     */
    toJSON() {
        return {
            ingredient: this.ingredient.getName(),
            measurementUnit: this.measurementUnit.getName(),
            measurement: this.measurement,
        }
    }
}

module.exports = IngredientCount;