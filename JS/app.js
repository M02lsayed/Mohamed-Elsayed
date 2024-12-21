

// Get the current date
var today = new Date();

// Add 13 days to the current date
today.setDate(today.getDate() + 13);

// Now you have the countdown date
var countDownDate = today.getTime();

// Update the countdown every second
var x = setInterval(function () {
  // Get the current time
  var now = new Date().getTime();

  // Calculate the distance between now and the countdown date
  var distance = countDownDate - now;

  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Add a zero if the number is less than 10
  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  // Update HTML elements with the time values, adding ":" between each unit
  document.getElementById("days").innerHTML =  days ;
  document.getElementById("hours").innerHTML = hours ;
  document.getElementById("minutes").innerHTML =  minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

// Start Swiper JS to swipe the images between the divs products
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});

// Animation
ScrollReveal().reveal(".top_nav", {
  origin: "top",
  distance: "2px",
  opacity: 0,
});
ScrollReveal().reveal(".nav", {
  origin: "top",
  distance: "2px",
  opacity: 0,
  delay: 100,
});
ScrollReveal().reveal(".header", {
  origin: "top",
  distance: "20px",
  opacity: 0,
  delay: 200,
});
ScrollReveal().reveal(".section", {
  origin: "top",
  distance: "20px",
  opacity: 0,
  delay: 100,
  duration: 1000,
});
ScrollReveal().reveal(".footer", {
  origin: "top",
  distance: "20px",
  opacity: 0,
  delay: 100,
  duration: 1000,
});
ScrollReveal().reveal(".container_contact", {
  origin: "top",
  distance: "20px",
  opacity: 0,
  delay: 100,
  duration: 1000,
});
ScrollReveal().reveal(".container_product", {
  origin: "top",
  distance: "20px",
  opacity: 0,
  delay: 100,
  duration: 1000,
});
ScrollReveal().reveal(".profile", {
  origin: "top",
  distance: "20px",
  opacity: 0,
  delay: 100,
  duration: 1000,

});


// Mobile nav
const hamburger = document.querySelector(".hamburger");
const Nav = document.querySelector(".mobile_nav");

hamburger.addEventListener("click", () => {
  Nav.classList.toggle("mobile_nav_hide");
});

const AddToCart = document.querySelectorAll(".add_to_cart");

AddToCart.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const title = button.getAttribute("data-titel");
    const image = button.getAttribute("data-img");
    const price = button.getAttribute("data-price");

    const cartItem = { id, title, image, price };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

