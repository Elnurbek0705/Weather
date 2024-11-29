"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const lightThemeBtn = document.querySelector(".light-theme-btn"),
    darkThemeBtn = document.querySelector(".dark-theme-btn"),
    active_theme = document.querySelector(".active_theme");

  const applyTheme = (isLight) => {
    active_theme.style.transform = isLight ? "translateX(-100%)" : "translateX(0)";
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

  

});
