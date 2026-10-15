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
    if (delay) el.style.setProperty('--jos-delay', delay + 's');
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
<<<<<<< Updated upstream:main.js
=======
   /* -------------------------------------------------------
     3. BỘ ĐẾM SỐ: đếm từ 0 lên số trong data-countup-number
     khi cuộn tới phần Funfact
     ------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-countup-number]');

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-countup-number'), 10);
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Chậm dần về cuối (ease-out)
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      el.textContent = '0';
      counterObserver.observe(el);
    });
  }

  /* -------------------------------------------------------
     4. BẢNG GIÁ: chuyển giá giữa chu kỳ tháng và năm
     ------------------------------------------------------- */
  var billingToggles = document.querySelectorAll('[data-billing]');
  var pricingPrices = document.querySelectorAll('.pricing-price');
  var billingCadences = document.querySelectorAll('.billing-cadence');
  var pricingCards = document.querySelectorAll('.pricing-card');
  var annualFlipPlayed = false;

  billingToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var billing = toggle.getAttribute('data-billing');

      if (billing === 'annually' && !annualFlipPlayed) {
        annualFlipPlayed = true;
        pricingCards.forEach(function (card) {
          card.classList.add('billing-flip-once');
          card.addEventListener(
            'animationend',
            function () {
              card.classList.remove('billing-flip-once');
            },
            { once: true }
          );
        });
      }

      billingToggles.forEach(function (button) {
        var isActive = button === toggle;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      pricingPrices.forEach(function (price) {
        price.textContent = '$' + price.getAttribute('data-' + billing);
      });

      billingCadences.forEach(function (cadence) {
        cadence.textContent =
          billing === 'annually' ? '/Per year' : '/Per month';
      });
    });
  });

  /* -------------------------------------------------------
     5. FAQ: accordion built with div elements
     ------------------------------------------------------- */
  var faqQuestions = document.querySelectorAll('.faq-question[role="button"]');

  function toggleFaq(question) {
    var currentItem = question.closest('.faq-item');
    var shouldOpen = !currentItem.classList.contains('is-open');

    faqQuestions.forEach(function (itemQuestion) {
      var item = itemQuestion.closest('.faq-item');
      var answer = document.getElementById(
        itemQuestion.getAttribute('aria-controls')
      );
      var isOpen = itemQuestion === question && shouldOpen;

      item.classList.toggle('is-open', isOpen);
      itemQuestion.setAttribute('aria-expanded', String(isOpen));
      answer.hidden = !isOpen;
    });
  }

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      toggleFaq(question);
    });

    question.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFaq(question);
      }
    });
  });

    /* -------------------------------------------------------
     6. POPUP VIDEO: bấm nút Play mở video YouTube,
     bấm nền / dấu × / phím Esc để đóng
     ------------------------------------------------------- */
  var videoModal = document.getElementById('video-modal');
  var videoFrame = videoModal ? videoModal.querySelector('iframe') : null;

  function getYoutubeId(url) {
    var match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
  }

  function openVideo(url) {
    var id = getYoutubeId(url);
    if (!id) {
      window.open(url, '_blank');
      return;
    }
    videoFrame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
  }

  function closeVideo() {
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoFrame.src = '';
  }

  if (videoModal) {
    document.querySelectorAll('[data-fslightbox]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        openVideo(link.getAttribute('href'));
      });
    });

    videoModal.addEventListener('click', function (event) {
      if (event.target === videoModal || event.target.closest('.video-modal__close')) {
        closeVideo();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && videoModal.classList.contains('is-open')) closeVideo();
    });
  }
>>>>>>> Stashed changes:js/main.js
});
