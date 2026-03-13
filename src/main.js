const dropdowns = document.querySelectorAll('.dropdown-btn');

dropdowns.forEach(btn => {
    btn.addEventListener('click', function () {
        if (window.innerWidth < 768) {

            const content = this.nextElementSibling;
            const seta = this.querySelector('.seta');

            if (content) content.classList.toggle('hidden');
            if (seta) seta.classList.toggle('rotate-180');
        }
    });
});

const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: 2,
    spaceBetween: 15,
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 0,
        },
        1280: {
            slidesPerView: 5,
            spaceBetween: 35,
        }
    },
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
