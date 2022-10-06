import View from "./View.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "⚠️ No beers found for your query. Please try again!";

  _generateMarkup() {
    return `
   
              ${this._data.map((data) => {
               return `
          <li class="preview">
             <a class="preview__link" href="#${data.id}">
                <div class="preview__data">
                   <h5 class="preview__title">${data.title}</h5>
                   <p class="preview__malt">${data.ingredients.malt}</p>`;}).join("")}
                 </div>
             </a>
           </li>
       
        `;
  }
}

export default new ResultsView();
