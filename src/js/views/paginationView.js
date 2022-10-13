import View from "./View";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");
  _results = document.querySelector(".search-results");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  scrollToResult() {
    this._results.scrollIntoView({ behavior: "smooth" });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
      <div></div>
      
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
          <p>Page ${currPage + 1} >></p>
      </button>`;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <p><< Page ${currPage - 1}</p>
      </button>`;
    }

    // Other page
    if (currPage < numPages) {
      return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
      <p><< Page ${currPage - 1}</p>
      </button>
      
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
      <p>Page ${currPage + 1} >></p>
      </button>`;
    }

    // Page 1, and there are NO other pages
    if (currPage && numPages === 1) return "";
  }

  _generateMarkupNext() {
    return `
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
          <p>Page ${currPage + 1} >></p>
      </button>`;
  }
  _generateMarkupPrev() {
    return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
          <p><< Page ${currPage - 1}</p>
      </button>`;
  }
}

export default new PaginationView();
