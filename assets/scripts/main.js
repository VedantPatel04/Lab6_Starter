// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.
	let recipeData  = localStorage.getItem("recipes");
	if(recipeData){
		recipeData = JSON.parse(recipeData);
	}
	else{
		recipeData = [];
	}
	return recipeData;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element
	const mainSelector = document.querySelector('main');
	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	for(let i = 0; i <recipes.length;i++){
		const recipeCard = document.createElement('recipe-card');
		recipeCard.data = recipes[i];
		mainSelector.appendChild(recipeCard);
	}
}
/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	const formSelector = document.querySelector("form");
	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked
	formSelector.addEventListener("submit", (event) =>{
		event.preventDefault();
		const formData = new FormData(formSelector);
		const recipeObject = {};
		
		formData.forEach((value, key) => {
    		recipeObject[key] = value;
  		});
		const recipeCard = document.createElement("recipe-card");
		recipeCard.data = recipeObject;
		document.querySelector("main").appendChild(recipeCard);
		let recipesTemp = getRecipesFromStorage();
		recipesTemp.push(recipeObject);
		saveRecipesToStorage(recipesTemp);;
		
	});

	// Steps B4-B9 will occur inside the event listener from step B3
	// B4. TODO - Create a new FormData object from the <form> element reference above
	// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
	//            make this easier to read), and then extract the keys and corresponding
	//            values from the FormData object and insert them into recipeObject

	
	// B6. TODO - Create a new <recipe-card> element
	// B7. TODO - Add the recipeObject data to <recipe-card> using element.data
	// B8. TODO - Append this new <recipe-card> to <main>
	// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
	//            then save the recipes array back to localStorage
	const clearButton = document.querySelector("button.danger");
	clearButton.addEventListener("click", (event)=>{
		localStorage.clear();
		let mainElement = document.querySelector("main");
		mainElement.innerHTML = '';
		
	})
	// B10. TODO - Get a reference to the "Clear Local Storage" button
	// B11. TODO - Add a click event listener to clear local storage button
	// Steps B12 & B13 will occur inside the event listener from step B11
	// B12. TODO - Clear the local storage
	// B13. TODO - Delete the contents of <main>
}
