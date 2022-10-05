import View from "./View.js";

class RecipeView extends View {
  _parentEl = document.querySelector(".beer");
  _errorMessage = "⚠️ No beers found for your query. Please try again!";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
      <div class="beer-info">
              <h1 class="beer-info__name">${this._data.title}</h1>
              <h2 class="beer-info__brewed">First Brewed ${
                this._data.firstBrewed
              }</h2>
              <div class="beer-info-flex">
                <h3 class="beer-info__tagline">«${this._data.tagline}»</h3>
                <div class="beer-info--abv-ibu-og-w">
                  <div class="beer-info--abv-w">
                    <h4 class="beer-info--abv">Abv:</h4>
                    <h4 class="beer-info--abv-val">${
                      this._data.basics.abv
                    }%</h4>
                  </div>
                  <div class="beer-info--ibu-w">
                    <h4 class="beer-info--ibu">Ibu:</h4>
                    <h4 class="beer-info--ibu-val">${this._data.basics.ibu}</h4>
                  </div>
                  <div class="beer-info--og-w">
                    <h4 class="beer-info--og">Og:</h4>
                    <h4 class="beer-info--og-val">${this._data.basics.og}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="cards-w">
              <div class="cards__description">
                <h5 class="cards__description--title">The beer is...</h5>
                <p class="cards__description--text">
                ${this._data.description}
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
                    this._data.basics.volume.eu
                  }l</p>
                  <p class="cards__basics--unit-EU">${
                    this._data.basics.boilVolume.eu
                  }l</p>
                </div>
                <div class="cards__basics--unit-US-w">
                  <p class="cards__basics--unit-US">${
                    this._data.basics.volume.us
                  }gal</p>
                  <p class="cards__basics--unit-US">${
                    this._data.basics.boilVolume.us
                  }gal</p>
                  <p class="cards__basics--unit-US">${
                    this._data.basics.abv
                  }%</p>
                  <p class="cards__basics--unit-US">${this._data.basics.fg}</p>
                  <p class="cards__basics--unit-US">${this._data.basics.og}</p>
                  <p class="cards__basics--unit-US">${this._data.basics.ebc}</p>
                  <p class="cards__basics--unit-US">${this._data.basics.srm}</p>
                  <p class="cards__basics--unit-US">${this._data.basics.ph}</p>
                  <p class="cards__basics--unit-US">${
                    this._data.basics.attenuationLevel
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
                    this._data.method.mashTemp.eu
                  }°C</p>
                  <p class="cards__method--unit-EU">${
                    this._data.method.fermentation.eu
                  }°C</p>
                </div>
                <div class="cards__method--unit-US-w">
                  <p class="cards__method--unit-US">${
                    this._data.method.mashTemp.us
                  }°F</p>
                  <p class="cards__method--unit-US">${
                    this._data.method.fermentation.us
                  }°F</p>
                </div>
              </div>
              <div class="cards__ingredients">
                <h5 class="cards__ingredients--title">Ingredients</h5>
                <h5 class="cards__ingredients--malt-title">Malt</h5>
                <div class="cards__ingredients--malt-details-w">
                   ${this._data.ingredients.malt
                     .map((malt) => {
                       return `<p class='cards__ingredients--malt-details'>${malt.name}</p>`;
                     })
                     .join("")}
                </div>
                <div class="cards__ingredients--malt-unit-EU-w">
                  ${this._data.ingredients.malt
                    .map((malt) => {
                      return `
                    <p class="cards__ingredients--malt-unit-EU">${malt.amount.value}kg</p>
                    `;
                    })
                    .join("")}
                </div>
                <div class="cards__ingredients--malt-unit-US-w">
                ${this._data.ingredients.malt
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
                ${this._data.ingredients.hops
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
                  ${this._data.ingredients.hops
                    .map((hops) => {
                      return `<p class="cards__ingredients--hops-unit">${hops.amount.value}</p>`;
                    })
                    .join("")}
                </div>
                <div class="cards__ingredients--hops-add-w">
                  <p class="cards__ingredients--hops-add-t">Add</p>
                  ${this._data.ingredients.hops
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
                  ${this._data.ingredients.hops
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
                    ${this._data.ingredients.yeast}
                  </p>
                </div>
              </div>
              <div class="cards__food">
                <h5 class="cards__food--title">Food pairing</h5>
                <p class="cards__food--text">
                  ${this._data.food.join("; ")}
                </p>
              </div>
              <div class="cards__image">
                <img
                  src="${this._data.image}"
                  alt="Beer packaging"
                  class="cards__image--img"
                />
              </div>
              <div class="cards__tip">
                <h5 class="cards__tip--title">Tip</h5>
                <p class="cards__tip--text">
                  ${this._data.tip}
                </p>
              </div>
            </div>`;
  }
}

export default new RecipeView();