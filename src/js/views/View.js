export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner = () => {
    const markup = `<div class="spinner"></div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
          <h4>${message}</h4>
        </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
    <h4>${message}</h4>
  </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}
