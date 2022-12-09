// import { async } from "regenerator-runtime";
import { AFTER, API_URL, BEFORE, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}ids=${id}`);

    const { 0: recipe } = data;

    state.recipe = {
      id: recipe.id,
      title: recipe.name,
      firstBrewed: recipe.first_brewed,
      tagline: recipe.tagline,
      description: recipe.description,
      basics: {
        abv: recipe.abv,
        volume: {
          eu: recipe.volume.value,
          us: Math.round(recipe.volume.value / 3.785),
        },
        boilVolume: {
          eu: recipe.boil_volume.value,
          us: Math.round(recipe.boil_volume.value / 3.785),
        },
        fg: recipe.target_fg,
        og: recipe.target_og,
        ebc: recipe.ebc,
        ibu: recipe.ibu,
        srm: recipe.srm,
        ph: recipe.ph,
        attenuationLevel: recipe.attenuation_level,
      },
      image: recipe.image_url,
      ingredients: {
        malt: recipe.ingredients.malt,
        hops: recipe.ingredients.hops,
        yeast: recipe.ingredients.yeast,
      },
      method: {
        mashTemp: {
          eu: recipe.method.mash_temp[0].temp.value,
          us: (recipe.method.mash_temp[0].temp.value * 9) / 5 + 32,
        },
        fermentation: {
          eu: recipe.method.fermentation.temp.value,
          us: Math.round((recipe.method.fermentation.temp.value * 9) / 5 + 32),
        },
      },
      tip: recipe.brewers_tips,
      food: recipe.food_pairing,
    };
  } catch (error) {
    console.error(`${error} ⚠️⚠️⚠️`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const [beer, malt, yeast, brewed, hops, food] = await Promise.all([
      getJSON(`${API_URL}beer_name=${query.replace(" ", "_")}`),
      getJSON(`${API_URL}malt=${query.replace(" ", "_")}`),
      getJSON(`${API_URL}yeast=${query.replace(" ", "_")}`),
      getJSON(
        `${API_URL}brewed_after=${AFTER}-${query}&brewed_before=${BEFORE}-${query}`
      ),
      getJSON(`${API_URL}hops=${query.replace(" ", "_")}`),
      getJSON(`${API_URL}food=${query.replace(" ", "_")}`),
    ]);
    const data = [...beer, ...malt, ...yeast, ...brewed, ...hops, ...food];

    state.search.results = data.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.name,
        ingredients: {
          malt: recipe.ingredients.malt[0].name,
        },
      };
    });
  } catch (error) {
    console.error(`${error} ⚠️⚠️⚠️`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;
  return state.search.results.slice(start, end);
};