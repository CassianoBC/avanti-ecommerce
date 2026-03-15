const dropdowns = document.querySelectorAll('.dropdown-btn');
const menuDropdownBtn = document.querySelectorAll('.btn-menu-dropdown');
const menuDropdown = document.getElementById('menu-dropdown');
const menuDropdownDepartment = document.getElementById('menu-department');
const menuDropdownDepartmentBtn = document.querySelectorAll('.btn-dropdown-department');
const btnClickableDepartment = document.querySelectorAll('.click-dropdown-department');
const searchOutput = document.getElementById('search-output');
const searchButtons = document.querySelectorAll('.search-input + button');
const searchHeading = searchOutput ? searchOutput.closest('h1') : null;

function updateSearchOutput(value) {
    if (!searchOutput || !searchHeading) return;

    const sanitizedValue = value.trim();

    searchOutput.textContent = sanitizedValue;

    if (sanitizedValue) {
        searchHeading.classList.remove('hidden');
    } else {
        searchHeading.classList.add('hidden');
    }
}

function openMenuDropdown() {
    searchHeading.classList.add('hidden');
    menuDropdown.classList.remove('hidden');
    menuDropdown.classList.add('flex');
}

function closeMenuDropdown() {
    menuDropdown.classList.add('hidden');
    menuDropdown.classList.remove('flex');
}

function openDepartmentDropdown() {
    searchHeading.classList.add('hidden');
    menuDropdownDepartment.classList.remove('hidden');
    menuDropdownDepartment.classList.add('flex');
}

function closeDepartmentDropdown() {
    menuDropdownDepartment.classList.add('hidden');
    menuDropdownDepartment.classList.remove('flex');
}

searchButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const searchWrapper = this.closest('div');
        const relatedInput = searchWrapper ? searchWrapper.querySelector('.search-input') : null;

        if (!relatedInput) return;

        updateSearchOutput(relatedInput.value);

        relatedInput.value = '';
        closeDepartmentDropdown();
        closeMenuDropdown();
    });
});

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

menuDropdownBtn.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        openMenuDropdown();
        closeDepartmentDropdown();
    });
});

btnClickableDepartment.forEach(btn => {
    btn.addEventListener('click', function () {
        closeMenuDropdown();
        openDepartmentDropdown();
    });
});

menuDropdownDepartmentBtn.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        closeDepartmentDropdown();
        openDepartmentDropdown();
        closeMenuDropdown();
    });
});

menuDropdownDepartment.addEventListener('mouseleave', function() {
    closeDepartmentDropdown();
});

menuDropdown.addEventListener('mouseleave', function() {
    closeMenuDropdown();
});

document.addEventListener('click', function (event) {
    if (window.innerWidth >= 1280) return;

    const clickedInsideMenu = menuDropdown.contains(event.target) || menuDropdownDepartment.contains(event.target);
    const clickedMenuButton = event.target.closest('.btn-menu-dropdown') || event.target.closest('.btn-dropdown-department');

    if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenuDropdown();
        closeDepartmentDropdown();
    }
});

const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 15,
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
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
    loop: false,

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
