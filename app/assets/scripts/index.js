const bigData = [];

async function fetchText() {
  let response = await fetch('./assets/data/product-list.json');
  let data = await response.json();
  bigData.push(data);
}

fetchText();

console.log(bigData)
//
// const add = (a, b) => a + b;
//
// function getRatingsAverage(ratings) {
//   return ratings.reduce(add) / ratings.length;
// }
//
// // loop through the data
// data.forEach((datarecord, idx) => {
//   let markup = createSeries(datarecord, idx);
//   let container = document.createElement("div");
//   container.classList.add("a-Series");
//   container.innerHTML = markup;
//   document.body.appendChild(container);
// });
//
// function createSeries(datarecord, idx) {
//   return `
//     <h2 class="a-Series_Title">${datarecord.Title}</h2>
//     <p class="a-Series_Description">
//       <span class="a-Series_DescriptionHeader">Description: </span>${datarecord.Description}
//     </p>
// <h4 class="a-EpisodeBlock_Title">First episodes</h4>
// <ul class="a-EpisodeBlock">
// 	<li class="a-EpisodeBlock_Item">
//
//       ${datarecord.Episodes.map((episode, index) =>
//     `
//
//             <span class="a-EpisodeBlock_Title"><b class="a-EpisodeBlock_EpisodeNo">${index + 1}</b> ${episode}</span>
//
//         `
//   ).join("")}
//
//
//     </li>
// 	${datarecord.Ended === true ? `` : `<div class="a-Series_More">More to come!</div>`}
// </ul>
// <h4 class="a-ReviewsBlock_Title">Reviews</h4>
// 	<ul class="a-ReviewsBlock">
//
// ${datarecord.Reviews.map(review =>
//     `<li class="a-ReviewsBlock_Origin">
//             <b class="a-ReviewsBlock_Reviewer">${Object.keys(review)[0]}</b>
//             <span class="a-ReviewsBlock_Score">${review[Object.keys(review)[0]]}%</span>
//         </li>
//         `
//   ).join("")}
// 	</ul>
// 	<div class="a-UserRating">Average user rating: <b class="a-UserRating_Score">${getRatingsAverage(datarecord.UserRatings)}</b></div>
// `;
// }


const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 4,
  spaceBetween: 16,
  freeMode: true,
});
