import View from "./View.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _link = document.querySelector(".preview__link");
  _cards = document.querySelector(".beer");
  _searchW = document.querySelector(".search-results");
  _errorMessage = `<div class='icon-error'>⚠️</div> <h4>No beers found for your query. Please try again!</h4>`;

  scrollToCards() {

      this._cards.scrollIntoView({ behavior: "smooth" });
    
  }

  _generateMarkup() {
    return `
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
      `;
  }

  removeHidden() {
    this._searchW.classList.remove("hidden");
  }
}

export default new ResultsView();
