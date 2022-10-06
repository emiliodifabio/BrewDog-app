import View from "./View.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".container");
  _errorMessage = "⚠️ No beers found for your query. Please try again!";

  _generateMarkup() {
    return `
     <section class="search-results">
        <ul class="results">
          ${this._data
            .map((data) => {
              return `
            <li class="preview">
            <a class="preview__link" href="#${data.id}">
                <div class="preview__data">
                <h5 class="preview__title">${data.title}</h5>
                <p class="preview__malt">${data.ingredients.malt}</p>`;
            })
            .join("")}
                </div>
              </a>
            </li>
        </ul>
        <div class="pagination"></div>
    </section>
    <section class="beer">
      <div class="message">
        <h4>Start by searching for a beer, ingredient (malt, hops, yeast), first brewed's year. Have fun!</h4>
      </div>
        `;
  }
}

export default new ResultsView();
