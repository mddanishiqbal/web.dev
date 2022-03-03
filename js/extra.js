// Header parallel x animation with lax.js
$(document).ready(function () {
    lax.setup();
    const updateLax = () => {
        lax.update(window.scrollY);
        window.requestAnimationFrame(updateLax);
    }
    window.requestAnimationFrame(updateLax);
    window.addEventListener("resize", function () {
        lax.updateElements();
    });
});


// services-tabs script
$(function () {

    var owl = $('.owl-1');
    owl.owlCarousel({
        loop: false,
        margin: 0,
        nav: false,
        dots: false,
        items: 1,
        smartSpeed: 1000,
        autoplay: false,
        navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
    });

    var carousel_nav_a = $('.carousel-nav a');

    carousel_nav_a.each(function (slide_index) {
        var $this = $(this);
        $this.attr('data-num', slide_index);
        $this.click(function (e) {
            owl.trigger('to.owl.carousel', [slide_index, 1500]);
            e.preventDefault();
        })
    })

    owl.on('changed.owl.carousel', function (event) {
        carousel_nav_a.removeClass('active');
        $(".carousel-nav a[data-num=" + event.item.index + "]").addClass('active');
    })


})


// style switcher light & dark mode theme script
function styleSwitcherToggle() {
    const styleSwitcher = document.querySelector(".js-style-switcher"),
        styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

    styleSwitcherToggler.addEventListener("click", function () {
        styleSwitcher.classList.toggle("open");
        this.querySelector("i").classList.toggle("fa-times");
        this.querySelector("i").classList.toggle("fa-cog");
    });
}
styleSwitcherToggle();


// theme colors script
function themeColors() {
    const colorStyle = document.querySelector(".js-color-style"),
        themeColorsContainer = document.querySelector(".js-theme-colors");

    themeColorsContainer.addEventListener("click", ({ target }) => {
        if (target.classList.contains("js-theme-color-item")) {
            localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
            setColor();
        }
    });

    function setColor() {
        let path = colorStyle.getAttribute("href").split("/");
        path = path.slice(0, path.length - 1);
        colorStyle.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");

        if (document.querySelector(".js-theme-color-item.active")) {
            document.querySelector(".js-theme-color-item.active").classList.remove("active");
        }
        document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active");
    }

    if (localStorage.getItem("color") !== null) {
        setColor();
    }
    else {
        const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
        document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active");
    }
}
themeColors();


//  theme light & dark mode
function themeLightDark() {
    const darkModeCheckbox = document.querySelector(".js-dark-mode");

    darkModeCheckbox.addEventListener("click", function () {
        if (this.checked) {
            localStorage.setItem("theme-dark", "true");
        }
        else {
            localStorage.setItem("theme-dark", "false");
        }
        themeMode();
    });

    function themeMode() {
        if (localStorage.getItem("theme-dark") === "false") {
            document.body.classList.remove("t-dark");
        }
        else {
            document.body.classList.add("t-dark");
        }
    }

    if (localStorage.getItem("theme-dark") !== null) {
        themeMode();
    }
    if (document.body.classList.contains("t-dark")) {
        darkModeCheckbox.checked = true;
    }
}

themeLightDark();


// Testimonial slider
function testimonialSlider() {
    const carouselOne = document.getElementById('carouselOne');
    if (carouselOne) {
        carouselOne.addEventListener('slid.bs.carousel', function () {
            const activeItem = this.querySelector(".active");
            document.querySelector(".js-testimonial-img").src =
                activeItem.getAttribute("data-js-testimonial-img");
        })
    }
}
testimonialSlider();