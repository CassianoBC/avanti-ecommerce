const dropdowns = document.querySelectorAll('.dropdown-btn');
const menuDropdownBtn = document.querySelectorAll('.btn-menu-dropdown');
const menuDropdown = document.getElementById('menu-dropdown');
const menuDropdownDepartment = document.getElementById('menu-department');
const menuDropdownDepartmentBtn = document.querySelectorAll('.btn-dropdown-department');
const btnClickableDepartment = document.querySelectorAll('.click-dropdown-department');
const searchOutput = document.getElementById('search-output');
const searchButtons = document.querySelectorAll('.search-input + button');
const searchHeading = searchOutput ? searchOutput.closest('h1') : null;
const menuCloseButtons = document.querySelectorAll('.btn-close');

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

function toggleMenuDropdown() {
    searchHeading.classList.add('hidden');
    menuDropdown.classList.toggle('hidden');
    menuDropdown.classList.toggle('flex');
    menuDropdownDepartment.classList.add('hidden');
}

function closeMenuDropdown() {
    menuDropdown.classList.add('hidden');
    menuDropdown.classList.remove('flex');
}

function toggleDepartmentDropdown() {
    searchHeading.classList.add('hidden');
    menuDropdownDepartment.classList.toggle('hidden');
    menuDropdownDepartment.classList.toggle('flex');
}

function closeDepartmentDropdown() {
    menuDropdownDepartment.classList.add('hidden');
    menuDropdownDepartment.classList.remove('flex');
}

function openMenuDropdown() {
    searchHeading.classList.add('hidden');
    menuDropdown.classList.remove('hidden');
    menuDropdown.classList.add('flex');
}

function openDepartmentDropdown() {
    searchHeading.classList.add('hidden');
    menuDropdownDepartment.classList.remove('hidden');
    menuDropdownDepartment.classList.add('flex');
}

let desktopCloseTimeout;

function clearDesktopCloseTimeout() {
    clearTimeout(desktopCloseTimeout);
}

function isDesktopHoverArea(target) {
    if (!target) return false;

    const isMenuTrigger = Array.from(menuDropdownBtn).some(btn => btn.contains(target));
    const isDepartmentTrigger = Array.from(menuDropdownDepartmentBtn).some(btn => btn.contains(target));

    return (
        isMenuTrigger ||
        isDepartmentTrigger ||
        menuDropdown.contains(target) ||
        menuDropdownDepartment.contains(target)
    );
}

function scheduleDesktopClose(relatedTarget) {
    if (relatedTarget && isDesktopHoverArea(relatedTarget)) return;

    clearDesktopCloseTimeout();
    desktopCloseTimeout = setTimeout(() => {
        closeMenuDropdown();
        closeDepartmentDropdown();
    }, 100);
}

function setupDesktopDropdowns() {
    menuDropdownDepartmentBtn.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            clearDesktopCloseTimeout();
            openDepartmentDropdown();
            closeMenuDropdown();
        });

        btn.addEventListener('mouseleave', function (event) {
            scheduleDesktopClose(event.relatedTarget);
        });
    });

    menuDropdownBtn.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            clearDesktopCloseTimeout();
            openMenuDropdown();
            closeDepartmentDropdown();
        });

        btn.addEventListener('mouseleave', function (event) {
            scheduleDesktopClose(event.relatedTarget);
        });
    });

    menuDropdown.addEventListener('mouseenter', clearDesktopCloseTimeout);
    menuDropdownDepartment.addEventListener('mouseenter', clearDesktopCloseTimeout);

    menuDropdown.addEventListener('mouseleave', function (event) {
        scheduleDesktopClose(event.relatedTarget);
    });

    menuDropdownDepartment.addEventListener('mouseleave', function (event) {
        scheduleDesktopClose(event.relatedTarget);
    });
}

function setupMobileDropdowns() {
    return (
        menuDropdownDepartmentBtn.forEach(btn => {
        btn.addEventListener('click', function () {
            toggleDepartmentDropdown();
            closeMenuDropdown();
        });
    }) || menuDropdownBtn.forEach(btn => {
        btn.addEventListener('click', function () {
            toggleMenuDropdown();
            closeDepartmentDropdown();
        });
    })
    )
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

if (window.innerWidth >= 1280) {
    setupDesktopDropdowns();
} else {
    setupMobileDropdowns();
}

btnClickableDepartment.forEach(btn => {
    btn.addEventListener('click', function () {
        closeMenuDropdown();
        toggleDepartmentDropdown();
    });
});

menuCloseButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        closeMenuDropdown();
        closeDepartmentDropdown();
    });
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
