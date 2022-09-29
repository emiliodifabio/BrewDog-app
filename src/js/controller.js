import { container, punkapi } from "./config";
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".beer");

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout faster ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = (parentEl) => {
  const markup = `<div class="spinner"></div>`;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);


    // Loading recipe
    renderSpinner(recipeContainer);

    const res = await fetch(`https://api.punkapi.com/v2/beers?ids=${id}`);
    // const res = await fetch("https://api.punkapi.com/v2/beers?search=pasta");
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
    console.log(recipe);
    const food = recipe.food.join("; ");

    // Rendering recipe
    const markup = `
    <div class="beer-info">
            <h1 class="beer-info__name">${recipe.title}</h1>
            <h2 class="beer-info__brewed">First Brewed ${
              recipe.firstBrewed
            }</h2>
            <div class="beer-info-flex">
              <h3 class="beer-info__tagline">«${recipe.tagline}»</h3>
              <div class="beer-info--abv-ibu-og-w">
                <div class="beer-info--abv-w">
                  <h4 class="beer-info--abv">Abv:</h4>
                  <h4 class="beer-info--abv-val">${recipe.basics.abv}%</h4>
                </div>
                <div class="beer-info--ibu-w">
                  <h4 class="beer-info--ibu">Ibu:</h4>
                  <h4 class="beer-info--ibu-val">${recipe.basics.ibu}</h4>
                </div>
                <div class="beer-info--og-w">
                  <h4 class="beer-info--og">Og:</h4>
                  <h4 class="beer-info--og-val">${recipe.basics.og}</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="cards-w">
            <div class="cards__description">
              <h5 class="cards__description--title">The beer is...</h5>
              <p class="cards__description--text">
              ${recipe.description}
              </p>
            </div>
            <div class="cards__basics">
              <h5 class="cards__basics--title">Basics</h5>
              <div class="cards__basics--unit-details-w">
                <p class="cards__basics--unit-details">Volume</p>
                <p class="cards__basics--unit-details">Boil Volume</p>
                <p class="cards__basics--unit-details">Abv</p>
                <p class="cards__basics--unit-details">Target Fg</p>
                <p class="cards__basics--unit-details">Target OG</p>
                <p class="cards__basics--unit-details">Ebc</p>
                <p class="cards__basics--unit-details">Srm</p>
                <p class="cards__basics--unit-details">Ph</p>
                <p class="cards__basics--unit-details">Attenuation Level</p>
              </div>
              <div class="cards__basics--unit-EU-w">
                <p class="cards__basics--unit-EU">${
                  recipe.basics.volume.eu
                }l</p>
                <p class="cards__basics--unit-EU">${
                  recipe.basics.boilVolume.eu
                }l</p>
              </div>
              <div class="cards__basics--unit-US-w">
                <p class="cards__basics--unit-US">${
                  recipe.basics.volume.us
                }gal</p>
                <p class="cards__basics--unit-US">${
                  recipe.basics.boilVolume.us
                }gal</p>
                <p class="cards__basics--unit-US">${recipe.basics.abv}%</p>
                <p class="cards__basics--unit-US">${recipe.basics.fg}</p>
                <p class="cards__basics--unit-US">${recipe.basics.og}</p>
                <p class="cards__basics--unit-US">${recipe.basics.ebc}</p>
                <p class="cards__basics--unit-US">${recipe.basics.srm}</p>
                <p class="cards__basics--unit-US">${recipe.basics.ph}</p>
                <p class="cards__basics--unit-US">${
                  recipe.basics.attenuationLevel
                }%</p>
              </div>
            </div>
            <div class="cards__method">
              <h5 class="cards__method--title">Method</h5>
              <div class="cards__method--details-w">
                <p class="cards__method--details">Mash Temp</p>
                <p class="cards__method--details">Fermentation</p>
              </div>
              <div class="cards__method--unit-EU-w">
                <p class="cards__method--unit-EU">${
                  recipe.method.mashTemp.eu
                }°C</p>
                <p class="cards__method--unit-EU">${
                  recipe.method.fermentation.eu
                }°C</p>
              </div>
              <div class="cards__method--unit-US-w">
                <p class="cards__method--unit-US">${
                  recipe.method.mashTemp.us
                }°F</p>
                <p class="cards__method--unit-US">${
                  recipe.method.fermentation.us
                }°F</p>
              </div>
            </div>
            <div class="cards__ingredients">
              <h5 class="cards__ingredients--title">Ingredients</h5>
              <h5 class="cards__ingredients--malt-title">Malt</h5>
              <div class="cards__ingredients--malt-details-w">
                 ${recipe.ingredients.malt
                   .map((malt) => {
                     return `<p class='cards__ingredients--malt-details'>${malt.name}</p>`;
                   })
                   .join("")}
              </div>
              <div class="cards__ingredients--malt-unit-EU-w">
                ${recipe.ingredients.malt
                  .map((malt) => {
                    return `
                  <p class="cards__ingredients--malt-unit-EU">${malt.amount.value}kg</p>
                  `;
                  })
                  .join("")}
              </div>
              <div class="cards__ingredients--malt-unit-US-w">
              ${recipe.ingredients.malt
                .map((malt) => {
                  return `
                <p class="cards__ingredients--malt-unit-US">${(
                  malt.amount.value * 2.205
                ).toFixed(2)}lb</p>
                `;
                })
                .join("")}
             
              </div>
              <h5 class="cards__ingredients--hops-title">Hops</h5>
              <div class="cards__ingredients--hops-details-w">
              ${recipe.ingredients.hops
                .map((hops) => {
                  return `<p class="cards__ingredients--hops-details">${`${hops.name
                    .split(" ")[0]
                    .concat(" ")
                    .concat(
                      hops.name.split(" ")[1] && hops.name.length > 13
                        ? hops.name.split(" ").slice(1, -1).join(" ")
                        : ""
                    )}`}</p>`;
                })
                .join("")}
              </div>
              <div class="cards__ingredients--hops-unit-w">
                <p class="cards__ingredients--hops-unit-t">g</p>
                ${recipe.ingredients.hops
                  .map((hops) => {
                    return `<p class="cards__ingredients--hops-unit">${hops.amount.value}</p>`;
                  })
                  .join("")}
              </div>
              <div class="cards__ingredients--hops-add-w">
                <p class="cards__ingredients--hops-add-t">Add</p>
                ${recipe.ingredients.hops
                  .map((hops) => {
                    return `<p class="cards__ingredients--hops-add">${hops.add
                      .slice(0, 1)
                      .toUpperCase()
                      .concat(hops.add.slice(1))}</p>`;
                  })
                  .join("")}
              </div>
              <div class="cards__ingredients--hops-attribute-w">
                <p class="cards__ingredients--hops-attribute-t">Attribute</p>
                ${recipe.ingredients.hops
                  .map((hops) => {
                    return `<p class="cards__ingredients--hops-attribute">${hops.attribute
                      .slice(0, 1)
                      .toUpperCase()
                      .concat(hops.attribute.slice(1))}</p>`;
                  })
                  .join("")}
              </div>
              <h5 class="cards__ingredients--yeast-title">Yeast</h5>
              <div class="cards__ingredients--yeast-details-w">
                <p class="cards__ingredients--yeast-details">
                  ${recipe.ingredients.yeast}
                </p>
              </div>
            </div>
            <div class="cards__food">
              <h5 class="cards__food--title">Food pairing</h5>
              <p class="cards__food--text">
                ${food}
              </p>
            </div>
            <div class="cards__image">
              <img
                src="${recipe.image}"
                alt="Beer packaging"
                class="cards__image--img"
              />
            </div>
            <div class="cards__tip">
              <h5 class="cards__tip--title">Tip</h5>
              <p class="cards__tip--text">
                ${recipe.tip}
              </p>
            </div>
          </div>`;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", showRecipe);
