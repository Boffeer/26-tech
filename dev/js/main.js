// const burgerMenu = document.querySelector('.burger-menu_wrap'),
// 	  burger    = document.querySelector('.burger');


// function toggleBurger() {
// 	burgerMenu.classList.toggle('burger-menu--opened');
// 	console.log('asfas')
// }


let badgeClosed = true;
const badge = document.querySelector(".hero-badge");
const badgeDescr = document.querySelector(".hero-badge_descr");
function heroBadgeTap() {
	badge.classList.toggle('.hero-badge')
}

function toggle(wrap, inner){
      let select = document.querySelector(wrap),
          compStyle = window.getComputedStyle(select),
          modal = document.querySelector('.hero-badge_descr');
          // modalStyle = window.getComputedStyle(modal);
          
          
      if (compStyle.getPropertyValue('visibility') == 'hidden'){
        // select.style.display = 'block';
        select.style.visibility = 'visible';
        select.style.opacity = '1';
        modal.style.transform = 'scale(1)';
      } else {
        // select.style.display = 'none';
        select.style.visibility = 'hidden';
        select.style.opacity = '0';
        modal.style.transform = 'scale(0.2)';
        
      }
}

function modal(btn, modal){
  document.querySelector(btn).addEventListener("click", () => toggle(modal));
}
modal(".hero-badge", ".hero-badge_descr")







var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 30,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
})


// const btn = document.querySelectorAll('.e-button');

// for (let i = 0; i < btn.length; i++){
//   burgerItem[i].addEventListener('click', function() {
//     this.preventDefault;
//     this.textContent = 'Загрузка';
//     location.assign('http://localhost:3000/?_ym_debug=1')
    
//   })
// }



const burger = document.querySelector('#burger');
const burgerItem = document.querySelectorAll('.burger-menu_link');

for (let i = 0; i < burgerItem.length; i++){
  burgerItem[i].addEventListener('click', function() {
    burger.checked = ! burger.checked;
  })
}




// const anchors = document.querySelectorAll('a[href*="#"]')

// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault()
    
//     const blockID = anchor.getAttribute('href').substr(1)
    
//     document.getElementById(blockID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     })
//   })
// }




// burgerItem.addEventListener('click', function() {
//   // burger.checked = false;
//   burger.checked = ! burger.checked;
//   burger.checked = ! burger.checked;
//   alert(burger)  
// })


// "ym('70016527','reachGoal','click-begginer-pack'); ym('70016527','reachGoal','all-full-payment'); ym('70016527','reachGoal','all-book-and-order');"
// "ym('70016527','reachGoal','click-book-begginer-pack'); ym('70016527','reachGoal','all-full-payment'); ym('70016527','reachGoal','all-book-and-order');"
