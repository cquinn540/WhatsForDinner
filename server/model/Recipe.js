//Recipe class- Duncan Henry
//General class to be inherited and used by PersonalRecipe and SharedRecipe


class Recipe {
    //0 Arg constructor- may replace this with a Name-Arg constructor later.
    constructor() {
        this.recipe_id = null;                 //ID Generation handled by SQL table
        this.name = null;
        this.imageURL = null;
        this.ingredientList = new Array();        //Array<Ingredient>
        this.prepInstructions = null;
        this.prepTime = 0;
        this.cookTime = 0;
        this.caloricEstimate = 0;
        this.tasteRating = 0;
        this.difficultyRating = 0;
        this.tags = new Array();               //Array<Tag>
    }

    makeCopy(otherRecipe){
        if (otherRecipe instanceof Recipe) {
            this.recipe_id = null;         //ID Generation handled by SQL table.
            this.name = otherRecipe.name;
            this.imageURL = otherRecipe.imageURL;
            this.ingredientList = otherRecipe.ingredientList.slice();
            this.prepInstructions = otherRecipe.prepInstructions;
            this.prepTime = otherRecipe.prepTime;
            this.cookTime = otherRecipe.cookTime;
            this.caloricEstimate = otherRecipe.caloricEstimate;
            this.tasteRating = otherRecipe.tasteRating;
            this.difficultyRating = otherRecipe.difficultyRating;
            this.tags = otherRecipe.tags.slice();
        }
    }


    addIngredient(ingredientCount){
        this.ingredientList.push(ingredientCount);
    }


    removeIngredient(ingredientName) {
        for (var x = 0; x < this.ingredientList.length; x++) {
            if (this.ingredientList[x].getName() === ingredientName)
            {
                this.ingredientList.splice(x-1, 1);
            }
        }
    }

    addTag(name){
        this.tags.push(name);
    }

    removeTag(name){
        for (var x = 0; x < this.tags.length; x++) {
            if (this.tags[x].getName() === name)
            {
                this.tags.splice(x-1, 1);
            }
        }
    }

    //Getters
    getID(){
        return this.recipe_id;
    }
    getName(){
        return this.name;
    }
    //Keep an eye on this, it may need to change from just returning the whole list.
    getIngredients(){
        return this.ingredientList;
    }
    getPrepInstructions(){
        return this.prepInstructions;
    }
    getPrepTime() {
        return this.prepTime;
    }
    getCookTime() {
        return this.cookTime;
    }
    getCaloricEstimate() {
        return this.caloricEstimate;
    }
    getTasteRating() {
        return this.tasteRating;
    }
    getDifficultyRating(){
        return this.difficultyRating;
    }
    getImageURL(){
        return this.imageURL;
    }

    //Setters
    setID(newID){
        this.recipe_id = newID;
    }
    setName(newName) {
        this.name = newName;
    }

    //Placeholder- will likely remove this method in the future.
    setIngredients(newIngredients){
        this.ingredientList = newIngredients;
    }

    setPrepInstructions(newPrepInstructions){
        this.prepInstructions = newPrepInstructions;
    }
    setPrepTime(newPrepTime){
        this.prepTime = newPrepTime;
    }
    setCookTime(newCookTime){
        this.cookTime = newCookTime;
    }
    setCaloricEstimate(newCaloricEstimate){
        this.caloricEstimate = newCaloricEstimate;
    }
    setTasteRating(newTasteRating){
        this.tasteRating = newTasteRating;
    }
    setDifficultyRating(newDifficultyRating){
        this.difficultyRating = newDifficultyRating;
    }
    setImageURL(newImageURL){
        this.imageURL = newImageURL;
    }

    //Placeholder, will likely remove this method in the future.
    setTags(newTags){
        this.tags = newTags;
    }

}

module.exports = Recipe;