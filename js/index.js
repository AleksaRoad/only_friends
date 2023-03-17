
const menu_item = document.querySelectorAll(".menu__list-item");
const burger_btn = document.querySelector('.burger__btn');

menu_item[0].classList.add('active')

burger_btn.addEventListener('click', ()=>{
  burger_btn.classList.toggle('active');
}
)