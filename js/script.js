$(".symptoms__inner").slick({
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  prevArrow: `<button type="button" class="symptoms__arrow symptoms__arrow--left"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.16992 1.04492L0.848633 7.36621L7.16992 13.6875" stroke="white" stroke-linecap="round"/>
  </svg></button>`,
  nextArrow: `<button type="button" class="symptoms__arrow symptoms__arrow--right"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.830078 1.04492L7.15137 7.36621L0.830078 13.6875" stroke="white" stroke-linecap="round"/>
  </svg></button>`,
});
$(".about-specialists__slider").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
});
document.querySelectorAll(".about-specialists__slider .slick-dots li button").forEach((btn) => (btn.innerHTML = ""));

// accordion

document.querySelector(".accordion__inner").addEventListener("click", function (e) {
  if (e.target.classList.contains("accordion__item")) {
    e.target.classList.toggle("active");
  }
});
