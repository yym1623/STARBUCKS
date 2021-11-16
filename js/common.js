'use strict';


// header
// header_input //////////////////
// searchEl - html -> .search
const searchEl = document.querySelector('.search');
// searchInputEl - searchEl -> input
const searchInputEl = searchEl.querySelector('input');

// searchEl -> click -> searchInputEl -> focus
searchEl.addEventListener('click', function() {
  searchInputEl.focus();
})

// searchInputEl -> focus? -> searchEl -> add class focused -> add setAttribute
searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  // searchInputEl -> html Attribute add
  searchInputEl.setAttribute('placeholder', '통합검색');
}); 

// searchInputEl -> blur? -> searchEl -> remove class focused -> remove setAttribute
searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  // searchInputEl -> html Attribute add
  searchInputEl.setAttribute('placeholder', '');
}); 


// footer
// 날짜 자동 계산

const thisYear = document.querySelector('.this-year');
// textContent - 요소가 가지고 있는 글자 내용들의 값을 알아내거나 거기에 값을 지정하는 용도로 사용한다
// new Date - 날짜 정보를 알고 있다, getFullYear - 현재 년도의 정보를 알려주는 메서드 = 현재 년도의 날짜가 숫자 데이터로 나온다
thisYear.textContent = new Date().getFullYear(); // 2021