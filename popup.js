document.getElementById("get-recipes").addEventListener("click", function () {
	const ingredients = document.getElementById("ingredients").value;
	if (!ingredients) {
		alert("Please enter some ingredients.");
		return;
	}

	// Show loading spinner
	const spinner = document.getElementById("loading-spinner");
	spinner.classList.add("active");

	// Clear previous results
	document.getElementById("recipes-container").innerHTML = "";
	document.getElementById("error-message").classList.add("hidden");

	// Fetch recipes from API
	fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=d62bc3cd20134583a71b2f10b1eeef33 `
	)
		.then((response) => response.json())
		.then((data) => {
			// Hide loading spinner
			spinner.classList.remove("active");

			if (data.length === 0) {
				document.getElementById("error-message").innerText =
					"No recipes found.";
				document.getElementById("error-message").classList.remove("hidden");
				return;
			}

			// Populate recipes
			data.forEach((recipe) => {
				const recipeCard = document.createElement("div");
				recipeCard.className = "recipe-card";

				recipeCard.innerHTML = `
                  <img src="${recipe.image}" class="recipe-image" alt="${recipe.title}">
                  <h3 class="recipe-title">${recipe.title}</h3>
                  <a href="https://spoonacular.com/recipes/${recipe.id}" class="view-recipe-btn" target="_blank">View Recipe</a>
              `;

				document.getElementById("recipes-container").appendChild(recipeCard);
			});
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
			spinner.classList.remove("active");
			document.getElementById("error-message").innerText =
				"Error fetching recipes.";
			document.getElementById("error-message").classList.remove("hidden");
		});
});
