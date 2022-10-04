export const API_URL = "https://api.punkapi.com/v2/beers?";
export const TIMEOUT_SEC = 10;

// export { container, punkapi };

// // CONFIG - INIT
// const punkapi = require("punkapi-db");
// // console.log(punkapi);

// // CONFIG - ELEMENTS
// const container = document.querySelector(".container");
// const previewData = document.querySelector(".preview__data");

// // CONTROLLER - RENDER
// const renderBeer = function (data) {
//   const html = `
//   <h4 class="preview__title"">${data.name}</h4>
//       <p class="preview__malt">${data.description}</p>`;

//   container.insertAdjacentHTML("afterbegin", html);
// };

// // renderBeer(punkapi[100]);

// const search = function (word) {
//   punkapi.forEach((data, i) => {
//     // console.log(data.first_brewed);
//     // if (data.includes(word) === true)
//     // renderBeer(punkapi[i]);
//   });
// };
// // search("beer");

// const taglineByString = punkapi.filter((p) => p.tagline == "Imperial Red Ale.");
// // console.log(taglineByString);

// const tagline = punkapi.map((p) => p.tagline);
// // console.log(tagline);

// const malt = punkapi.map((p) => p.ingredients.malt[0]);
// // console.log(malt);

// const sortDesc = function () {
//   const description = punkapi.map((p) => p.description);
//   const descriptionLength = description
//     .map((p) => p.length)
//     .sort((a, b) => b - a);
//   // console.log(descriptionLength);
//   // const stringed = tagline.toString().toLowerCase();
//   // console.log(stringed);
//   // const finded = stringed.endsWith(word);
//   // console.log(finded);
// };
// sortDesc();

// const sortByDescriptionLenght = () => {
//   const description = punkapi.sort(
//     (a, b) => b.description.length - a.description.length
//   );
//   // console.log(description);
//   //  renderBeer(id[87])
// };
// sortByDescriptionLenght();

// // console.log(punkapi[87].image_url);

// const sortById = () => {
//   const data = punkapi.map((n) => n).sort((a, b) => a.id - b.id);
//   // console.log(data);
//   // console.log(data[87]);
// };
// sortById();
