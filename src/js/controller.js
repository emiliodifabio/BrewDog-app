import { async } from "regenerator-runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { container, punkapi } from "./config.js";

import * as model from "./module.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

// PREVENT PAGE RELOAD WHEN RESULTS LIST IS SHOWING
if (module.hot) {
  module.hot.accept();
}

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
  } catch (error) {
    recipeView.renderError();
  }
};
//////////////////////////////////////////////////

// LOAD SEARCH RESULTS FUNCTION
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  // WHEN CALL SHOW FUNCTION
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener('hashchange', controlRecipes)