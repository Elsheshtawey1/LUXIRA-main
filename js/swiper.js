const swiper = new Swiper(".swiper-container", {
  loop: true, // لتكرار السلايدر
  spaceBetween: 0, // المسافة بين العناصر
  slidesPerView: 3, // عدد العناصر اللي تظهر في نفس الوقت
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000, // سرعة التنقل التلقائي
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2, // عرض عنصرين في الشاشات المتوسطة
    },
    1024: {
      slidesPerView: 4, // عرض 4 عناصر في الشاشات الكبيرة
    },
  },
});
