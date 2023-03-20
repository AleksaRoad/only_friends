const menu_item = document.querySelectorAll(".menu__list-item");
const burger_btn = document.querySelector(".burger__btn");

menu_item[1].classList.add("active");

burger_btn.addEventListener("click", () => {
  burger_btn.classList.toggle("active");
});

//генерация карточек
const slider_container = document.querySelector(".our-friends__slider");
import data from "../assets/json/pets.json" assert { type: "json" };
const brackets = document.querySelector(".brackets");

function getSlider() {
  data.forEach((el, i) => {
    //определение числа карточек в зависимости от ширины экрана
    const div = document.createElement("div");
    div.classList.add("card");
    if (window.innerWidth > 768 && i > 7) {
      div.classList.add("hide");
    }
    if (window.innerWidth <= 768 && i > 5) {
      div.classList.add("hide");
    }
    if (window.innerWidth <= 680 && i > 2) {
      div.classList.add("hide");
    }
    //структура div
    div.innerHTML = `
              <img
                class="our-friends__img"
                src=${data[i].img}
                alt="pet"
              />
              <p class="card-name">${data[i].name}</p>
              <button class="btn2 card__btn-more">Learn more</button>
            </div>`;

    slider_container.append(div);
  });
}
getSlider();
//при изменении размера экрана очищать контейнер и обновлять генерацию и менять текст в футере для отодвигания скобок
window.onresize = function (event) {
  slider_container.textContent = "";
  getSlider(), 500;
  if (window.innerWidth <= 320) {
    brackets.innerHTML = "1 Central Street, Boston<br>&nbsp(entrance from the store)";
  }
  if (window.innerWidth > 320) {
    brackets.innerHTML = "1 Central Street, Boston<br>(entrance from the store)";
  }
};
