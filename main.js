/* =========================================================
   MAIN.JS - Toàn bộ hiệu ứng của trang Home
   1. Hiệu ứng xuất hiện khi cuộn (thay cho JOS)
   2. Slider logo thương hiệu (Swiper)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  /* -------------------------------------------------------
     1. HIỆU ỨNG KHI CUỘN: phần tử .jos hiện ra khi vào màn hình
     data-jos_delay="0.2" = trễ 0.2 giây
     ------------------------------------------------------- */
  var josElements = document.querySelectorAll('.jos');

  josElements.forEach(function (el) {
    var delay = parseFloat(el.getAttribute('data-jos_delay'));
    if (delay) el.style.transitionDelay = delay + 's';
  });

  if ('IntersectionObserver' in window) {
    var josObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('jos-animated');
            josObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    josElements.forEach(function (el) {
      josObserver.observe(el);
    });
  } else {
    josElements.forEach(function (el) {
      el.classList.add('jos-animated');
    });
  }

  /* -------------------------------------------------------
     2. SLIDER LOGO THƯƠNG HIỆU: tự động trượt từng logo một
     (hiện 5 logo, cứ 2 giây trượt sang 1 logo, chạy vòng lặp)
     ------------------------------------------------------- */
  if (typeof Swiper !== 'undefined' && document.querySelector('.brand-slider')) {
    new Swiper('.brand-slider', {
      slidesPerView: 5,
      spaceBetween: 60,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    });
  }
});
