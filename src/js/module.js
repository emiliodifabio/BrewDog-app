import { async } from "regenerator-runtime";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`https://api.punkapi.com/v2/beers?ids=${id}`);
    // const res = await fetch("https://api.punkapi.com/v2/beers?search=pasta");
    const data = await res.json();
    if (!res.ok) throw new Error(`data.message`)(`$(res.status)`);

    const { 0: recipe } = data;
    // console.log(recipe);

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
    // console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
