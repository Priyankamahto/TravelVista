// 🎞️ Image Slider Functionality
let slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide() {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}

setInterval(changeSlide, 4000); // Change slide every 4 seconds
