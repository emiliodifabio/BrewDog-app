import { container, punkapi } from "./config";

const recipeContainer = document.querySelector("beer");

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout aster ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {
    const res = await fetch("https://api.punkapi.com/v2/beers?ids=88");
    const data = await res.json();
    if (!res.ok) throw new Error(`data.message`)(`$(res.status)`);

    let { 0: recipe } = data;
    console.log(recipe);

    recipe = {
      id: recipe.id,
      title: recipe.name,
      firstBrewed: recipe.first_brewed,
      tagline: recipe.tagline,
      description: recipe.description,
      basics: {
        abv: recipe.abv,
        volume: {
          value: recipe.volume.value,
          unit: recipe.volume.unit,
        },
        boilVolume: {
          value: recipe.boil_volume.value,
          unit: recipe.boil_volume.unit,
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
      method: recipe.method,
      tip: recipe.brewers_tips,
      food: recipe.food_pairing,
    };
    console.log(recipe);
  } catch (error) {
    console.error(error);
  }
};
showRecipe();
