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
