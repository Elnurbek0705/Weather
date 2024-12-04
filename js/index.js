"use strict";

document.addEventListener("DOMContentLoaded", () => {
  function theme() {
    const lightThemeBtn = document.querySelector(".light-theme-btn"),
      darkThemeBtn = document.querySelector(".dark-theme-btn"),
      active_theme = document.querySelector(".active_theme");

    const applyTheme = (isLight) => {
      active_theme.style.transform = isLight
        ? "translateX(-100%)"
        : "translateX(0)";
      setTimeout(() => {
        if (isLight) {
          lightThemeBtn.style.filter = "brightness(1000%)";
          darkThemeBtn.style.filter = "";
          darkThemeBtn.style.fill = "#5E5E5E";
        } else {
          darkThemeBtn.style.filter = "brightness(1000%)";
          lightThemeBtn.style.filter = "";
        }
      }, 300);
    };
    lightThemeBtn.addEventListener("click", () => {
      console.log("Light Theme clicked");
      applyTheme(true);
    });

    darkThemeBtn.addEventListener("click", () => {
      console.log("Dark Theme clicked");
      applyTheme(false);
    });
  }
  


const header = document.querySelector("#header");

// Sinflar
const commonClasses = {
  line: "line",
  button: ["menu", "info btn w-100"],
};

const navClasses = {
  verticalNavbar: "vertical-navbar content h-100 py-5 p-0 d-flex flex-column justify-content-between",
  menuBox: "menu_box d-flex justify-content-center align-items-center flex-column w-100",
  buttonsGroup: {
    buttons_groupClassname: "buttons_group d-flex flex-column w-100",
    button: "btn w-100",
    buttonType: ["weather", "map", "notifications", "settings"],
  },
  infoBox: "info_box d-flex justify-content-center align-items-center flex-column w-100",
};


function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}


const nav = createElement("nav", navClasses.verticalNavbar),
  menu_box = createElement("div", navClasses.menuBox),
  buttons_group = createElement("div", navClasses.buttonsGroup.buttons_groupClassname),
  menuBtn = createElement("button", commonClasses.button),
  info_box = createElement("div", navClasses.infoBox),
  info_boxBtn = createElement("button", commonClasses.button[1],);
// 

header.prepend(nav);
menu_box.appendChild(menuBtn);
menu_box.appendChild(buttons_group);
navClasses.buttonsGroup.buttonType.forEach((type) => {
  const button = createElement("button", `${navClasses.buttonsGroup.button} ${type}`);
  buttons_group.appendChild(button);
});

// Line yaratish funksiyasi
function createLine() {
  return createElement("span", commonClasses.line);
}

const line1 = createLine();
menu_box.appendChild(line1);
menuBtn.after(line1);

const line2 = createLine();
info_box.prepend(line2);
info_box.append(info_boxBtn)


nav.appendChild(menu_box);
nav.appendChild(info_box);


// buttons images src and alts 

const buttonsImg = [
  { src: "./img/menu.svg", alt: "Menu"},
  { src: "img/weather.svg", alt: "Weather" },
  { src: "img/map.svg", alt: "Map" },
  { src: "img/notifications.svg", alt: "Notifications" },
  { src: "img/settings.svg", alt: "Settings" },
  { src: "./img/info.svg", alt: "Info" },
]
const navbar = document.querySelector('nav');
const navButtons = navbar.querySelectorAll('button')
console.log(navButtons);

navButtons.forEach((button, index) => {
  const img = document.createElement('img')
  img.src = buttonsImg[index].src
  img.alt = buttonsImg[index].alt 
  button.appendChild(img)
})

  
});
