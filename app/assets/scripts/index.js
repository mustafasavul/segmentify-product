// Lazy Load Init
const observer = lozad();
observer.observe();

const sBetween = 16;
const recommendsProducts = [];

// Get Data
async function fetchText() {
  let userCategories = [];
  let recommendedProducts = [];

  return new Promise(async (resolve, reject) => {
    let response = await fetch('./assets/data/product-list.json');
    let data = await response.json();

    userCategories = data.responses[0][0].params.userCategories
    recommendedProducts = data.responses[0][0].params.recommendedProducts

    recommendsProducts.push(data.responses[0][0].params.recommendedProducts)

    resolve({
      userCategories,
      recommendedProducts
    })
  });
}

// Handle Data
fetchText().then((resp) => {
  resp.userCategories.forEach(item => {
    let nav = document.createElement('a')
    nav.setAttribute("href", "javascript:");
    nav.setAttribute("onClick", "getNavItem(event)");
    nav.setAttribute("data-value", item.name);
    nav.classList.add('tab__nav-item')
    nav.innerText = `${item.name.slice(0, 30)}`

    document.getElementById('userCategories').appendChild(nav);
  })
}).catch(err => { console.log(err) });

const sliderTemplate = ''
const filterCategoryName = [];

/***
 * @params: event
 * */
function getNavItem(event) {
  document.querySelectorAll('.tab__nav-item').forEach(function (button, index) {
    button.classList.remove('tab__nav-item--active');
  });

  event.target.classList.add('tab__nav-item--active')

  recommendsProducts.forEach(item => {
    let sliderInner = document.getElementById('sliderData');

    // Empty Content
    sliderInner.innerHTML = '';

    let freeCargo = "<div class=\"card__cargo\"><img src=\"assets/images/icons/cargo.svg\" alt=\"Hızlı Kargo\"><span>Ücretsiz Kargo</span></div>\n"

    for (let value of Object.values(item[event.target.dataset.value])) {
      let card = `
             <div class="swiper-slide">
              <div class="card">
              <div class="card__image">
                <img src="${value.image}" data-src="${value.image}" alt="${value.name.slice(0, 25)}">

              </div>

              <div class="card__info">
                <h2 class="card__title">${value.name}</h2>

                <div class="card__price">
                  ${value.priceText}
                </div>

              ${value.params.shippingFee === "FREE" ? freeCargo : ''}

              <a href="javascript:" class="card__basket">
              Sepete Ekle
              </a>
              </div>
          </div>
        </div>
    `
      let product = document.createElement('a')
      product.classList.add('swiper-slide')
      product.innerText = `${item.name}`
      product.innerHTML = card;
      sliderInner.appendChild(product);
    }
  })
}

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 2,
  spaceBetween: sBetween,
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: sBetween,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: sBetween,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: sBetween,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: sBetween,
    },
  },
});
