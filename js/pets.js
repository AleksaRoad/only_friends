const menu_item = document.querySelectorAll(".menu__list-item");
const burger_btn = document.querySelector(".burger__btn");
const menu_list = document.querySelector(".menu__list");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");

burger_btn.addEventListener("click", () => {
  burger_btn.classList.toggle("active-burger");
  menu_list.classList.toggle("visible");
  body.classList.toggle("no-scroll");
  overlay.classList.toggle("overlay-visible");
});

//close menu after resize

startWidth();
window.addEventListener("resize", startWidth);
function startWidth() {
  if (document.documentElement.clientWidth > 767) {
    menu_list.classList.remove("visible");
    burger_btn.classList.remove("active-burger");
    overlay.classList.remove("overlay-visible");
    body.classList.remove("no-scroll");
  }
}

//click not in window

document.addEventListener("click", (e) => {
  const out_the_box =
    e.composedPath().includes(menu_list) ||
    e.composedPath().includes(burger_btn);
  if (!out_the_box) {
    menu_list.classList.remove("visible");
    burger_btn.classList.remove("active-burger");
    overlay.classList.remove("overlay-visible");
    body.classList.remove("no-scroll");
  }
});

menu_item.forEach(function (e) {
  e.addEventListener("click", function () {
    menu_list.classList.remove("visible");
    burger_btn.classList.remove("active-burger");
    overlay.classList.remove("overlay-visible");
    body.classList.remove("no-scroll");
  });
});

//генерация карточек
const slider_container = document.querySelector(".our-friends__slider");
const modal = document.querySelector(".modal");

//асинхронная функция добавления переменной с json данными
async function getJson() {
  return fetch("./assets/json/pets.json").then((result) => result.json());
}
getJson();

const json_info = await getJson();

//генерация карточек

//создание карточки и генерация модалки
function createCard(id) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
                <img
                  class="our-friends__img"
                  src=${id.img}
                  alt=${id.name}
                />
                <p class="card-name">${id.name}</p>
              <button class="btn2 card__btn-more">Learn more</button>
              `;
  div.addEventListener("click", () => {
    createModal(id);
    overlay.classList.add("overlay__visible");
    modal.classList.add("visible");
    body.classList.add("no-s");
  });
  slider_container.append(div);
}

//создание модального окна
function createModal(id) {
  modal.innerHTML = "";
  const modal_div = document.createElement("div");
  modal_div.classList.add("modal-card");
  modal_div.innerHTML = `
          <img
          class="our-friends__img"
          src=${id.imgModal}
          alt=${id.name}
        />
        <div class="modal-card__right">
          <h3 class="modal-card__name">${id.name}</h3>
          <div class="modal-card__type">${id.species} - ${id.breed}</div>
          <div class="modal-card__info">${id.info}</div>
          <ul class="modal-card__other">
            <li><b>Age: </b>${id.age}</li>
            <li><b>Inoculations: </b>${id.inoculations}</li>
            <li><b>Diseases: </b>${id.diseases}</li>
            <li><b>Parasites: </b>${id.parasites}</li>
          </ul>
        </div>
        <button class="btn__circle2 close">&#10006;</button>`;
  modal.append(modal_div);
  const btn_modal = modal.querySelector(".close");
  btn_modal.addEventListener("click", () => {
    overlay.classList.remove("overlay__visible");
    modal.classList.remove("visible");
    body.classList.remove("no-s");
  });
  //клик вне модалки
  document.addEventListener("click", (e) => {
    if (modal.classList.contains("visible") && e.target === modal) {
      overlay.classList.remove("overlay__visible");
      modal.classList.remove("visible");
      body.classList.remove("no-s");
    }
  });
}

let result = [];

function shaffleJSON(array) {
  let newArr = [];
  for (let i; newArr.length < 8; i++) {
    let num = Math.floor(Math.random() * 8);
    if (!newArr.includes(json_info[num])) {
      newArr.push(json_info[num]);
    }
  }
  return newArr;
}
let start_array = shaffleJSON(json_info);
result = start_array;
function randomeArray(massive, n) {
  let array = [];
  for (let i = 1; n >= i; i++) {
    array.push(massive.at(-i));
  }
  let shuffle = shaffleJSON(start_array);
  let o = array.concat(shuffle);
  [o[0], o[1]] = [o[1], o[0]];
  let result = [...new Set(o)].reverse();
  return result;
}
let new_array = start_array
  .concat(randomeArray(result, 2))
  .concat(randomeArray(result, 2))
  .concat(randomeArray(result, 2))
  .concat(randomeArray(result, 2))
  .concat(randomeArray(result, 2));


let numcard;
const PETS_NUM = 48;
let last_page = PETS_NUM / numcard;
let first_page = 1;
if (document.documentElement.clientWidth > 1279.98) {
  numcard = 8;
  last_page = PETS_NUM / numcard;
}
if (document.documentElement.clientWidth < 1279.98) {
  numcard = 6;
  last_page = PETS_NUM / numcard;
}
if (document.documentElement.clientWidth < 767.98) {
  numcard = 3;
  last_page = PETS_NUM / numcard;
}
const widthMax = window.matchMedia("(min-width: 1280px)");
const widthMiddle = window.matchMedia("(max-width: 1279.89px)");
const widthMiddle2 = window.matchMedia("(min-width: 767.98px)");
const widthMin = window.matchMedia("(max-width: 767.98px)");

function choiceNumCard() {
  widthMin.addEventListener("change", changePageSizeMin);
  function changePageSizeMin(e) {
    if (e.matches) {
      numcard = 3;
      last_page = PETS_NUM / numcard;
      if (NUMBER_PAGE.innerHTML > last_page) {
        NUMBER_PAGE.innerHTML = last_page;
      }
      current_page = Number(NUMBER_PAGE.innerHTML);
      changeClassBtns();
      getSlider(
        new_array,
        current_page * numcard - numcard,
        current_page * numcard
      );
    }
  }
  widthMiddle.addEventListener("change", changePageSizeMiddle);
  function changePageSizeMiddle(e) {
    if (e.matches) {
      numcard = 6;
      last_page = PETS_NUM / numcard;
      if (NUMBER_PAGE.innerHTML > last_page) {
        NUMBER_PAGE.innerHTML = last_page;
      }
      current_page = Number(NUMBER_PAGE.innerHTML);
      changeClassBtns();
      getSlider(
        new_array,
        current_page * numcard - numcard,
        current_page * numcard
      );
    }
  }

  widthMiddle2.addEventListener("change", changePageSizeMiddle2);
  function changePageSizeMiddle2(e) {
    if (e.matches) {
      numcard = 6;
      last_page = PETS_NUM / numcard;
      if (NUMBER_PAGE.innerHTML > last_page) {
        NUMBER_PAGE.innerHTML = last_page;
      }
      current_page = Number(NUMBER_PAGE.innerHTML);
      changeClassBtns();
      getSlider(
        new_array,
        current_page * numcard - numcard,
        current_page * numcard
      );
    }
  }
  widthMax.addEventListener("change", changePageSizeMax);
  function changePageSizeMax(e) {
    if (e.matches) {
      numcard = 8;
      last_page = PETS_NUM / numcard;
      if (NUMBER_PAGE.innerHTML > last_page) {
        NUMBER_PAGE.innerHTML = last_page;
      }
      current_page = Number(NUMBER_PAGE.innerHTML);
      changeClassBtns();
      getSlider(
        new_array,
        current_page * numcard - numcard,
        current_page * numcard
      );
    }
  }
}
choiceNumCard();

//добавление слайдера на страницу
function getSlider(array, numstart, numend) {
  let slice_pages = array.slice(numstart, numend);
  slider_container.innerHTML = "";
  slice_pages.forEach((el, i) => createCard(el, array));
  return slice_pages;
}
getSlider(new_array, numcard - numcard, numcard);

function shufflePets(array) {
  let newArr = [];
  for (let i; newArr.length < array.length; i++) {
    let num = Math.floor(Math.random() * array.length);
    if (!newArr.includes(array[num])) {
      newArr.push(array[num]);
    }
  }
  return newArr;
}
shufflePets(json_info);

//кнопки пагинации

const PAGINATION_BTNS = document.querySelectorAll(".pagination__btn");
const NUMBER_PAGE = document.querySelector(".pagination__number");
let current_page = 1;

NUMBER_PAGE.innerHTML = current_page;

function goToFirstPage() {
  current_page = first_page;
  NUMBER_PAGE.innerHTML = current_page;
}
function goToNextPage() {
  if (current_page < last_page) {
    current_page = current_page + 1;
    NUMBER_PAGE.innerHTML = current_page;
  }
}
function goToPrevPage() {
  if (current_page > first_page) {
    current_page = current_page - 1;
    NUMBER_PAGE.innerHTML = current_page;
  }
}
function goToLastPage() {
  current_page = last_page;
  NUMBER_PAGE.innerHTML = current_page;
}

function changeClassBtns() {
  if (current_page === last_page) {
    PAGINATION_BTNS[3].classList.add("disabled");
    PAGINATION_BTNS[4].classList.add("disabled");
    PAGINATION_BTNS[0].classList.remove("disabled");
    PAGINATION_BTNS[1].classList.remove("disabled");
  }
  if (current_page === first_page) {
    PAGINATION_BTNS[0].classList.add("disabled");
    PAGINATION_BTNS[1].classList.add("disabled");
    PAGINATION_BTNS[3].classList.remove("disabled");
    PAGINATION_BTNS[4].classList.remove("disabled");
  }
  if (current_page > first_page && current_page < last_page) {
    PAGINATION_BTNS[0].classList.remove("disabled");
    PAGINATION_BTNS[1].classList.remove("disabled");
    PAGINATION_BTNS[3].classList.remove("disabled");
    PAGINATION_BTNS[4].classList.remove("disabled");
  }
}

PAGINATION_BTNS[0].addEventListener("click", () => {
  goToFirstPage();
  changeClassBtns();
  getSlider(
    new_array,
    current_page * numcard - numcard,
    current_page * numcard
  );
});
PAGINATION_BTNS[1].addEventListener("click", () => {
  goToPrevPage();
  changeClassBtns();
  getSlider(
    new_array,
    current_page * numcard - numcard,
    current_page * numcard
  );
});
PAGINATION_BTNS[3].addEventListener("click", () => {
  goToNextPage();
  changeClassBtns();
  getSlider(
    new_array,
    current_page * numcard - numcard,
    current_page * numcard
  );
});
PAGINATION_BTNS[4].addEventListener("click", () => {
  goToLastPage();
  changeClassBtns();
  slider_container.innerHTML = "";
  getSlider(
    new_array,
    current_page * numcard - numcard,
    current_page * numcard
  );
});

const brackets = document.querySelector(".brackets");
// менять текст в футере для отодвигания скобок
window.addEventListener("resize", function (event) {
  if (window.innerWidth <= 320) {
    brackets.innerHTML =
      "1 Central Street, Boston<br>&nbsp(entrance from the store)";
  }
  if (window.innerWidth > 320) {
    brackets.innerHTML =
      "1 Central Street, Boston<br>(entrance from the store)";
  }
});
window.addEventListener("load", function (event) {
  if (window.innerWidth <= 320) {
    brackets.innerHTML =
      "1 Central Street, Boston<br>&nbsp(entrance from the store)";
  }
  if (window.innerWidth > 320) {
    brackets.innerHTML =
      "1 Central Street, Boston<br>(entrance from the store)";
  }
});
