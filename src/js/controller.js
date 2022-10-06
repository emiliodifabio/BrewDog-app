// import { async } from "regenerator-runtime";
// import "core-js/stable";
// import "regenerator-runtime/runtime";

import * as model from "./module.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

// PREVENT PAGE RELOAD WHEN RESULTS LIST IS SHOWING
if (module.hot) {
  module.hot.accept();
};

// SHOW RECIPE
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    
    if (!id) return;
    console.log(id);
    recipeView.renderSpinner();

    // Loading recipe
    await model.loadRecipe(id);
    console.log(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    console.log(recipeView);
    
  } catch (error) {
    recipeView.renderError();
  }
};
//////////////////////////////////////////////////

// LOAD SEARCH RESULTS
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return

    // 2) Load results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.state.search.results);

  } catch (error) {
    resultsView.renderError()
  }
};

const init = function () {
  // WHEN CALL LOAD AND SHOW FUNCTIONS
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener('hashchange', controlRecipes)
