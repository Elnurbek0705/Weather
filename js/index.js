"use strict";
document.addEventListener("DOMContentLoaded", () => {
  function theme() {
    const lightThemeBtn = document.querySelector(".light-theme-btn"),
      darkThemeBtn = document.querySelector(".dark-theme-btn"),
      active_theme = document.querySelector(".active_theme");
    const systemPrefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const defaultTheme = systemPrefersLight ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", defaultTheme);
    const applyTheme = (isLight) => {
      document.documentElement.setAttribute(
        "data-theme",
        isLight ? "light" : "dark"
      );
      active_theme.style.transform = isLight
        ? "translateX(-100%)"
        : "translateX(0)";
      lightThemeBtn.style.filter = isLight ? "brightness(1000%)" : "";
      darkThemeBtn.style.filter = isLight ? "" : "brightness(1000%)";
    };
    applyTheme(defaultTheme === "light");
    lightThemeBtn.addEventListener("click", () => {
      console.log("Light Theme clicked");
      applyTheme(true);
    });

    darkThemeBtn.addEventListener("click", () => {
      console.log("Dark Theme clicked");
      applyTheme(false);
    });
  }

  theme();

  // Dynamically navbar

  function navbar() {
    const header = document.querySelector("#header");
    const commonClasses = {
      line: "line",
      button: ["menu", "info btn w-100"],
    };

    const navClasses = {
      verticalNavbar:
        "vertical-navbar content h-100 py-5 p-0 d-flex flex-column justify-content-between",
      menuBox:
        "menu_box d-flex justify-content-center align-items-center flex-column w-100",
      buttonsGroup: {
        buttons_groupClassname: "buttons_group d-flex flex-column w-100",
        button: "btn w-100",
        buttonType: ["weather", "map", "notifications", "settings"],
      },
      infoBox:
        "info_box d-flex justify-content-center align-items-center flex-column w-100",
    };

    function createElement(tag, className, textContent) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (textContent) element.textContent = textContent;
      return element;
    }

    const nav = createElement("nav", navClasses.verticalNavbar),
      menu_box = createElement("div", navClasses.menuBox),
      buttons_group = createElement(
        "div",
        navClasses.buttonsGroup.buttons_groupClassname
      ),
      menuBtn = createElement("button", commonClasses.button),
      info_box = createElement("div", navClasses.infoBox),
      info_boxBtn = createElement("button", commonClasses.button[1]);
    //

    header.prepend(nav);
    menu_box.appendChild(menuBtn);
    menu_box.appendChild(buttons_group);
    navClasses.buttonsGroup.buttonType.forEach((type) => {
      const button = createElement(
        "button",
        `${navClasses.buttonsGroup.button} ${type}`
      );
      buttons_group.appendChild(button);
    });

    function createLine() {
      return createElement("span", commonClasses.line);
    }

    const line1 = createLine();
    menu_box.appendChild(line1);
    menuBtn.after(line1);

    const line2 = createLine();
    info_box.prepend(line2);
    info_box.append(info_boxBtn);

    nav.appendChild(menu_box);
    nav.appendChild(info_box);

    const buttonsImg = [
      { src: "./img/menu.svg", alt: "Menu" },
      { src: "img/weather.svg", alt: "Weather" },
      { src: "img/map.svg", alt: "Map" },
      { src: "img/notifications.svg", alt: "Notifications" },
      { src: "img/settings.svg", alt: "Settings" },
      { src: "./img/info.svg", alt: "Info" },
    ];
    const navbar = document.querySelector("nav");
    const navButtons = navbar.querySelectorAll("button");
    console.log(navButtons);

    navButtons.forEach((button, index) => {
      const img = document.createElement("img");
      img.src = buttonsImg[index].src;
      img.alt = buttonsImg[index].alt;
      button.appendChild(img);
    });
  }
  navbar()

  // Foydalanuvchi joylashuvini aniqlash va ob-havo ma'lumotlarini ko'rsatish
  function updateWeather() {
    // DOM elementlarni topish
    const locationSpan = document.querySelector(".current_localation span"),
      weekdayElement = document.querySelector(".weekday"),
      mmddyy = document.querySelector(".mmddyy"),
      weatherImg = document.querySelector(".current-day-img img");

    // Haroratni va ob-havo holatini yangilash
    const weatherMax = document.querySelector(".weather-max-data");
    const weatherMin = document.querySelector(".weather-min-data");
    const weatherFeels = document.querySelector(".feels");
    const weatherStatus = document.querySelector(".status");

    const degSelect = document.querySelector("#deg-select");

    // Haftaning kunlari ro'yxati
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mart",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Joylashuvni olish
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // OpenWeather API orqali ob-havo ma'lumotlarini olish
          const apiKey = "a40ebafd2f0a56d81aeaa5fbd82b18dc"; // OpenWeather API kalitini kiriting
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          try {
            const response = await fetch(weatherUrl);
            const weatherData = await response.json();

            // Foydalanuvchi joylashuvi nomini ko'rsatish
            locationSpan.textContent = weatherData.name;

            // Haftaning kunini aniqlash
            const today = new Date();
            weekdayElement.textContent = weekdays[today.getDay()];
            const yearsMonth = months[today.getMonth()];
            mmddyy.textContent = `${today.getDate()} ${yearsMonth.slice(
              0,
              3
            )},${today.getFullYear()}`;

            // Ob-havo holatini va tasvirini yangilash
            const weatherCondition = weatherData.weather[0].main.toLowerCase();
            console.log(weatherCondition);

            let imgSrc = "";

            if (weatherCondition.includes("rain")) {
              imgSrc = "./img/weather_images/rainny.svg";
            } else if (
              weatherCondition.includes("cloud") ||
              weatherCondition.includes("smoke")
            ) {
              imgSrc = "./img/weather_images/cloudy.svg";
            } else if (weatherCondition.includes("clear")) {
              imgSrc = "./img/weather_images/sunny.svg";
            } else if (weatherCondition.includes("mist")) {
              imgSrc = "./img/weather_images/mist.png";
            } else {
              imgSrc = "./img/weather_images/default.svg";
            }

            weatherImg.src = imgSrc;
            weatherImg.alt = weatherCondition;

            // Maksimal va minimal haroratni yangilash
            weatherMax.textContent = `${Math.round(
              weatherData.main.temp_max
            )}°C`;
            weatherMin.textContent = `/${Math.round(
              weatherData.main.temp_min
            )}°C`;
            weatherFeels.textContent = `Feels like ${Math.round(
              weatherData.main.feels_like
            )}°C`;

            // Ob-havo holatini yangilash
            weatherStatus.textContent = weatherData.weather[0].description;

            // Harorat o'lchov birligini o'zgartirish (C / F)
            degSelect.addEventListener("change", (event) => {
              const selectedUnit = event.target.value;
              const currentTempMax = Math.round(weatherData.main.temp_max);
              const currentTempMin = Math.round(weatherData.main.temp_min);
              const currentFeelsLike = Math.round(weatherData.main.feels_like);
              console.log(typeof weatherData.main.temp_max);

              if (selectedUnit === "dog") {
                // Farengeytga aylantirish
                weatherMax.textContent = `${Math.round(
                  (currentTempMax * 9) / 5 + 32
                )}°F`;
                weatherMin.textContent = `/${Math.round(
                  (currentTempMin * 9) / 5 + 32
                )}°F`;
                weatherFeels.textContent = `Feels like ${Math.round(
                  (currentFeelsLike * 9) / 5 + 32
                )}°F`;
              } else {
                // Celsiusga qaytarish
                weatherMax.textContent = `${Math.round(currentTempMax)}°C`;
                weatherMin.textContent = `/${Math.round(currentTempMin)}°C`;
                weatherFeels.textContent = `Feels like ${Math.round(
                  currentFeelsLike
                )}°C`;
              }
            });
          } catch (error) {
            console.error("Ob-havo ma'lumotlarini olishda xatolik:", error);
            locationSpan.textContent =
              "Weather data could not be retrieved. Please check your internet connection or API key.";
          }
        },
        () => {
          console.error("Joylashuvga ruxsat berilmadi");
          locationSpan.textContent = "Permission denied";
        }
      );
    } else {
      console.error("Geolocation qo'llab-quvvatlanmaydi");
      locationSpan.textContent = "Geolocation not supported";
    }
  }

  window.onload = updateWeather;
});
