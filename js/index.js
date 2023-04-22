const menu_item = document.querySelectorAll(".menu__list-item");
const burger_btn = document.querySelector(".burger__btn");
const menu_list = document.querySelector(".menu__list");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");

//клик по иконке бургера
burger_btn.addEventListener("click", () => {
  burger_btn.classList.toggle("active-burger");
  menu_list.classList.toggle("visible");
  body.classList.toggle("no-scroll");
  overlay.classList.toggle("overlay-visible");
});

//закрытие меню при изменении ширины экрана
function startWidth() {
  if (document.documentElement.clientWidth > 767) {
    menu_list.classList.remove("visible");
    burger_btn.classList.remove("active-burger");
    overlay.classList.remove("overlay-visible");
    body.classList.remove("no-scroll");
  }
}
startWidth();
window.addEventListener("resize", startWidth);

//клик вне меню
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

//клик по ссылкам в навигации
menu_item.forEach(function (e) {
  e.addEventListener("click", function () {
    menu_list.classList.remove("visible");
    burger_btn.classList.remove("active-burger");
    overlay.classList.remove("overlay-visible");
    body.classList.remove("no-scroll");
  });
});

//слайдер
const slider_container = document.querySelector(".our-friends__slider-wrapper");
const slider = document.querySelector(".our-friends__slider");
const prev = document.querySelector(".card__btn-prev");
const next = document.querySelector(".card__btn-next");
const modal = document.querySelector(".modal");
const items_left = document.querySelector(".items-left");
const items_center = document.querySelector(".items-center");
const items_right = document.querySelector(".items-right");
let n;

//асинхронная функция добавления переменной с json данными
async function getJson() {
  return fetch("./assets/json/pets.json").then((result) => result.json());
}
getJson();

const json_info = await getJson();

//генерация карточек в заисимости от ширины экрана
if (document.documentElement.clientWidth > 1279) {
  n = 3;
}
if (document.documentElement.clientWidth < 1280) {
  n = 2;
}
if (document.documentElement.clientWidth < 768) {
  n = 1;
}

const widthMax = window.matchMedia("(min-width: 1280px)");
widthMax.addEventListener("change", changePageSizeMax);
function changePageSizeMax(e) {
  if (e.matches) {
    n = 3;
    items_center.innerHTML = "";
    items_left.innerHTML = "";
    items_right.innerHTML = "";
    getRandomSlider();
    createSlider(n);
    createItems();
  }
}
const widthMiddle = window.matchMedia("(max-width: 1279px)");
widthMiddle.addEventListener("change", changePageSizeMiddle);
function changePageSizeMiddle(e) {
  if (e.matches) {
    n = 2;
    items_center.innerHTML = "";
    items_left.innerHTML = "";
    items_right.innerHTML = "";
    getRandomSlider();
    createSlider(n);
    createItems();
  }
}
const widthMiddle2 = window.matchMedia("(min-width: 766px)");
widthMiddle2.addEventListener("change", changePageSizeMiddle2);
function changePageSizeMiddle2(e) {
  if (e.matches) {
    n = 2;
    items_center.innerHTML = "";
    items_left.innerHTML = "";
    items_right.innerHTML = "";
    getRandomSlider();
    createSlider(n);
    createItems();
  }
}
const widthMin = window.matchMedia("(max-width: 767px)");
widthMin.addEventListener("change", changePageSizeMin);
function changePageSizeMin(e) {
  if (e.matches) {
    n = 1;
    items_center.innerHTML = "";
    items_left.innerHTML = "";
    items_right.innerHTML = "";
    getRandomSlider();
    createSlider(n);
    createItems();
  }
}
//создание карточки и генерация модалки
function createCard(id, item) {
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
  item.append(div);
}
let random_function = [];
let randomSlider = [];

//функция генерации рандомного массива
function getRandomSlider() {
  random_function = [];
  while (random_function.length < n * 2) {
    let num = Math.floor(Math.random() * json_info.length);
    if (!random_function.includes(json_info[num])) {
      random_function.push(json_info[num]);
    }
  }
  random_function.splice(0, n);
  return random_function;
}
getRandomSlider();

function createSlider(n) {
  randomSlider = [];
  while (randomSlider.length < n) {
    let num = Math.floor(Math.random() * json_info.length);
    if (
      !random_function.includes(json_info[num]) &&
      !randomSlider.includes(json_info[num])
    ) {
      randomSlider.push(json_info[num]);
    }
  }
}
createSlider(n);

let newArr = [];

function checkForSigns(array, items, random, n) {
  newArr = [];
  while (newArr.length < 100) {
    let num = Math.floor(Math.random() * array.length);
    if (!random.includes(array[num])) {
      newArr.push(array[num]);
    }
  }
  let b = [...new Set(newArr)];
  let a = b.splice(0, n);
  items.innerHTML = "";
  random_function = newArr;
  a.forEach((el) => {
    createCard(el, items);
  });
}

function createItems() {
  random_function.forEach((el) => {
    createCard(el, items_left);
    createCard(el, items_right);
  });
  randomSlider.forEach((el) => {
    createCard(el, items_center);
  });
}
createItems();

let count = 0;

//клики по кнопкам

function move_left() {
  slider_container.classList.add("transition__left");
  next.removeEventListener("click", move_right);
  prev.removeEventListener("click", move_left);
}

function move_right() {
  slider_container.classList.add("transition__right");
  next.removeEventListener("click", move_right);
  prev.removeEventListener("click", move_left);
}
next.addEventListener("click", move_right);
prev.addEventListener("click", move_left);

slider_container.addEventListener("animationend", (animation) => {
  if (animation.animationName === "move-right") {
    items_left.innerHTML = "";
    Array.from(items_center.children).forEach((card) =>
      items_left.append(card)
    );
    items_center.innerHTML = "";
    Array.from(items_right.children).forEach((card) =>
      items_center.append(card)
    );

    checkForSigns(json_info, items_right, random_function, n);
    slider_container.classList.remove("transition__right");
  }
  if (animation.animationName === "move-left") {
    items_right.innerHTML = "";
    Array.from(items_center.children).forEach((card) =>
      items_right.append(card)
    );
    items_center.innerHTML = "";
    Array.from(items_left.children).forEach((card) =>
      items_center.append(card)
    );

    checkForSigns(json_info, items_left, random_function, n);
    slider_container.classList.remove("transition__left");
  }
  next.addEventListener("click", move_right);
  prev.addEventListener("click", move_left);
});
//модалка

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
