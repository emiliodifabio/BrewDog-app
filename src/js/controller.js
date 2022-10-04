import * as model from "./module.js";
import recipeView from "./views/recipeView.js";

import { container, punkapi } from "./config";
import "core-js/stable";
import "regenerator-runtime/runtime";

// SELECTORS
const recipeContainer = document.querySelector(".beer");
//////////////////////////////////////////////////

// SHOW RECIPE FUNCTION
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
//////////////////////////////////////////////////

const init = function () {
  recipeView.renderMessage();

  // WHEN CALL SHOW FUNCTION
  recipeView.addHandlerRender(controlRecipes);
};
init();
