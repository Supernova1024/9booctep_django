let toggler = document.querySelector(".toggler");
let animated = document.querySelector(".animated-toggle");
let navbar = document.querySelector(".navbar");
let footer = document.querySelector(".footer");
let dropdown_categories = document.querySelector(".dropdown-categories");

toggler.addEventListener('click', () => {
    animated.classList.toggle("dark");
    navbar.classList.toggle("dark");
    footer.classList.toggle("dark");
    dropdown_categories.classList.toggle("dark");
})




