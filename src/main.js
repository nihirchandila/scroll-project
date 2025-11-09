import "./tailwind.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


//bottle animation start from hero section and end at overlay section
const bottle = document.querySelector(".bottle");
const bottleImg = bottle.querySelector("img");
gsap.to(
  bottle,
  {
    rotate: 345, // rotate bottle on scroll
    ease: "none",
    duration: 0.2,
    scrollTrigger: {
      onUpdate: (self) => {
      const progress = self.progress || 0; 
      if (progress >= 0.99) {
        bottleImg.classList.add("animation-complete"); // enable bottle hover at end
      } else if (progress <= 0.01) {
        bottleImg.classList.remove("animation-complete"); // disable bottle hover at start
      }else{
        bottleImg.classList.remove("animation-complete"); // disable bottle hover at start
      }
      },
      trigger: ".hero-section",
      start: "top top",
      endTrigger: ".overlay-section",
      end: () => {
        if (window.innerWidth >= 1024) {
          return "top 25%";
        } else if (window.innerWidth >= 768) { 
          return "top 35%";
        } else { // small
          return "top 38%";
        }
      },
      scrub: true, 
      pin: bottle, // pin bottle while animating
      pinSpacing: false,
      markers: false,
    },
  }
);


// overlay section appear animation
gsap.to(".masked-ellipse", {
  scrollTrigger: {
    trigger: ".masked-ellipse",
    start: "top 70%", 
    toggleActions: "play none none none",
  },
  clipPath: "ellipse(100% 0% at 50% 0%)",
  duration: 1.2,
  ease: "power2.inOut"
});


// ingredients list hover animation to show and hide image
const list = document.getElementById("ing-list");
const images = document.querySelectorAll(".ingredient-images img");

list.querySelectorAll("li").forEach((li) => {
  li.addEventListener("mouseenter", () => {
    const data = li.getAttribute("data");
    images.forEach((img) => {
      if (img.id === data) {
        img.classList.remove("opacity-0"); // show hovered ingredient image
      } else {
        img.classList.add("opacity-0"); // hide other images
      }
    });
  });

  li.addEventListener("mouseleave", () => {
    images.forEach((img) => {
      img.classList.add("opacity-0"); // hide all ingredient images
    });
  });
});


// carousel infinite loop animation
const carousel = document.querySelector(".carousel");
const imgs = gsap.utils.toArray(".carousel img");

// clone images
const cloneCount = 3;
for (let i = 0; i < cloneCount; i++) {
  imgs.forEach(img => {
    const clone = img.cloneNode(true);
    carousel.appendChild(clone); // append clone to carousel
  });
}

const totalWidth = carousel.scrollWidth * (cloneCount / (cloneCount + 1));
gsap.to(carousel, {
  x: -totalWidth, // scroll carousel to left
  duration: 80, 
  ease: "none",
  repeat: -1, // infinite loop
});


