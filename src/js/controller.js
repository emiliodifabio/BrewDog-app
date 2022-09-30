import * as model from "./module.js";
import recipeView from "./views/recipeView.js";

import { container, punkapi } from "./config";
import "core-js/stable";
import "regenerator-runtime/runtime";

// SELECTORS
const recipeContainer = document.querySelector(".beer");
//////////////////////////////////////////////////

// SMALL FUNCTIONS
const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout faster ${s} second`));
    }, s * 1000);
  });
};
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
    console.error(error);
  }
};
//////////////////////////////////////////////////

// WHEN CALL SHOW FUNCTION
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, controlRecipes));
//////////////////////////////////////////////////
