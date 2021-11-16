'use strict';


// header_badge ////////

// document - HTML자체
const badgeEl = document.querySelector('header .badges');

const toTopEl = document.querySelector('#to-top');

// window - 브라우저 창, 프로젝트가 출력되는 화면 자체
// _.throttle - lodash.js를 이용해서 scroll될 때마다 0.3초 간격으로 함수를 실행한다(한번에 실행 방지), throttle(함수,시간)
window.addEventListener('scroll', _.throttle(function() {
  if(window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' 
    });
    // 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    // gsap 첫번째 인수인 요소에는 요소 뿐만아니라, css선택자만 넣어도 해당하는 요소를 자동으로 찾아준다
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); // 300 -> 0.3초


// 버튼 클릭시 최상단 이동

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    // scrollTo - 화면의 위치
    scrollTo: 0
  });
});


// visual_img ////////////

const fadeEls = document.querySelectorAll('.visual .fade-in');
// forEach - html에서 찾은 요소의 갯수만큼 인수로적은 함수가 실행된다
// 순차적으로 찾은 값을 사용할 수 있게 데이터로 내어준다, 인수로받는다
// fadeEl - 반복적으로 받은 요소, index - 반복되는 횟수
// forEach(현재요소, 현재 요소의 인덱스)
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    // delay - 순차적으로 몇 초 간격으로 실행할건지 명시
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});



// swiper //////////////////////////
// new -> class 생성자
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  // autoplay - 자동재생
  autoplay: true,
  // loop - 반복재생
  loop: true
});


new Swiper('.promotion .swiper', {
  direction: 'horizontal', // 기본값
  slidesPerView: 3, // 한번의 몇개의 view를 보여줄건지 정한다
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: { // 객체로 할당하면 추가적인 옵션 명시 가능
    delay: 5000 // 0.5
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true //  사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev', // 이전버튼
    nextEl: '.promotion .swiper-next' // 다음버튼
  }
});

new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  // slidesPerView - 하나의 화면에 몇개의 슬라이드가 보일거냐
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


// upload action

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion // ! = 반대
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리
    promotionEl.classList.remove('hide');
  }
});





function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션) - 애니메이션
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size, // 축
      repeat: -1, // 반복
      yoyo: true, // 한번 재생한걸 뒤로재생한다
      ease: Power1.easeInOut, // 원하는 형태로 제어
      delay: random(0, delay)
    }
  );
}

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 호출
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



// scrollmagic 

const spyEls = document.querySelectorAll('section.scroll-spy');

// 외부의 라이브러리들은 평소에 구현하기 어려운 부분이나 시간이 많이걸리는 부분을 대신해서 동작하는거라 로직을 다 이해할 필요는 없다, 최대한 사용하는 라이브러리에 제공하는 문서가 시키는대로 한다
spyEls.forEach(function(spyEl) {
  // Scene() - ScrollMagic -> 특정한 요소를 감시하는 옵션을 지정해준다
  // setClassToggle() - ScrollMagic -> 클래스 속성을 넣었다 뺏다를 지정한다
  // addTo() -  ScrollMagic -> 컨트롤러
  new ScrollMagic
    .Scene({
      // triggerElement - ScrollMagic -> 보여짐 여부를 감시할 요소를 지정  
      triggerElement: spyEl,
      // triggerHook -  보여질 여부를 감시할 요소가 걸려있다, 스크롤하면서 걸릴때 실행이 된다, 판단이 되면 밑쪽의 메소드가 실행된다
      triggerHook: .8
    })
    // setClassToggle(class를 실행할 요소, 실행할 클래스 이름 지정)
    .setClassToggle(spyEl, 'show')
    // addTo -  ScrollMagic -> 우리가 추가한 옵션들을 내부의 컨트롤러에 내용을 할당해서 실제로 동작할 수 있게 만들어준다
    .addTo(new ScrollMagic.Controller());
});
























