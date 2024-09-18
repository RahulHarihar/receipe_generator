// Spoonacular API settings
const API_KEY = 'd62bc3cd20134583a71b2f10b1eeef33';
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

// DOM Elements
const ingredientsInput = document.getElementById('ingredients');
const getRecipesButton = document.getElementById('get-recipes');
const recipesContainer = document.getElementById('recipes');

// Function to fetch recipes from the Spoonacular API
async function getRecipes(ingredients) {
  try {
    const response = await fetch(`${API_URL}?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`);
    const data = await response.json();
    displayRecipes(data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Function to display recipes on the popup
function displayRecipes(recipes) {
  recipesContainer.innerHTML = ''; // Clear previous recipes

  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';

    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">
      <p>Ingredients used: ${recipe.usedIngredientCount}, Missing: ${recipe.missedIngredientCount}</p>
      <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
    `;

    recipesContainer.appendChild(recipeDiv);
  });
}

// Event Listener for the 'Get Recipes' button
getRecipesButton.addEventListener('click', () => {
  const ingredients = ingredientsInput.value;
  if (ingredients) {
    getRecipes(ingredients);
  } else {
    alert('Please enter some ingredients.');
  }
});
