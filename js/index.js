"use strict";
// import countryNames from './countries.js';

const countryNames = {
  UZ: "Uzbekistan",
  US: "United States",
  RU: "Russia",
  IN: "India",
  CN: "China",
  JP: "Japan",
  DE: "Germany",
  FR: "France",
  GB: "United Kingdom",
  IT: "Italy",
  CA: "Canada",
  AU: "Australia",
};

document.addEventListener("DOMContentLoaded", () => {
  function theme() {
    const lightThemeBtn = document.querySelector(".light-theme-btn"),
      darkThemeBtn = document.querySelector(".dark-theme-btn"),
      active_theme = document.querySelector(".active_theme"),
      telegramImg = document.querySelector(".telegramImg");
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
      telegramImg.src = "./img/telegram.png";
      console.log("Light Theme clicked");
      applyTheme(true);
    });

    darkThemeBtn.addEventListener("click", () => {
      telegramImg.src = "./img/telegramLight.png";
      console.log("Dark Theme clicked");
      applyTheme(false);
    });
  }

  theme();

  function navbar() {
    const header = document.querySelector("#header");
    const commonClasses = {
      line: "line",
      button: ["menu", "info btn w-100"],
    };

    const navClasses = {
      verticalNavbar:
        "vertical-navbar content py-5 p-0 d-flex flex-column justify-content-between",
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

    navButtons.forEach((button, index) => {
      const img = document.createElement("img");
      img.src = buttonsImg[index].src;
      img.alt = buttonsImg[index].alt;
      button.appendChild(img);
    });
  }
  navbar();

  function updateWeather() {
    const locationSpan = document.querySelector(".current_localation span"),
      weekdayElement = document.querySelector(".weekday"),
      mmddyy = document.querySelector(".mmddyy"),
      weatherImg = document.querySelector(".current-day-img img"),
      weatherMax = document.querySelector(".weather-max-data"),
      weatherMin = document.querySelector(".weather-min-data"),
      weatherFeels = document.querySelector(".feels"),
      weatherStatus = document.querySelector(".status"),
      degSelect = document.querySelector("#deg-select");

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const apiKey = "a40ebafd2f0a56d81aeaa5fbd82b18dc";
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
          
          try {
            const response = await fetch(weatherUrl);
            const weatherData = await response.json();
            console.log(weatherData);
            locationSpan.textContent =
              weatherData.name + ", " + countryNames[weatherData.sys.country];

            const today = new Date();
            weekdayElement.textContent = weekdays[today.getDay()];
            const yearsMonth = months[today.getMonth()];
            mmddyy.textContent = `${today.getDate()} ${yearsMonth.slice(
              0,
              3
            )},${today.getFullYear()}`;

            const weatherCondition = weatherData.weather[0].main.toLowerCase();

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
              imgSrc = "./img/weather_images/cloudy.svg";
            } else if (
              weatherCondition.includes("mist") ||
              weatherCondition.includes("fog")
            ) {
              imgSrc = "./img/weather_images/mist.png";
            } else {
              imgSrc = "./img/weather_images/default.svg";
            }

            weatherImg.src = imgSrc;
            weatherImg.alt = weatherCondition;

            weatherMax.textContent = `${Math.round(
              weatherData.main.temp_max
            )}°C`;
            weatherMin.textContent = `/${Math.round(
              weatherData.main.temp_min
            )}°C`;
            weatherFeels.textContent = `Feels like ${Math.round(
              weatherData.main.feels_like
            )}°C`;

            weatherStatus.textContent = weatherData.weather[0].description;

            degSelect.addEventListener("change", (event) => {
              const selectedUnit = event.target.value;
              const currentTempMax = Math.round(weatherData.main.temp_max);
              const currentTempMin = Math.round(weatherData.main.temp_min);
              const currentFeelsLike = Math.round(weatherData.main.feels_like);
              console.log(typeof weatherData.main.temp_max);

              if (selectedUnit === "dog") {
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
                weatherMax.textContent = `${Math.round(currentTempMax)}°C`;
                weatherMin.textContent = `/${Math.round(currentTempMin)}°C`;
                weatherFeels.textContent = `Feels like ${Math.round(
                  currentFeelsLike
                )}°C`;
              }
            });

            // Today’s Highlight
            // select html class from

            const highlightClasses = {
               windStatus: {
                   container: "wind_status",
                   speed: "wind_speed",
                   gust: "gust",
               },
               humidity: {
                   container: "humidity_status",
                   percentage: "humidity_percentage",
                   situation: "humidity_situation",
               },
               sun_rise_set: {
                   container: "sun_rise_set",
                   sunrise: "sunrise_time",
                   sunset: "sunset_time",
               },
               timezone: {
                  timezone_text: "timezone_text",
                  current_time: "timezone",
               },
               visibility: {
                  visibility_distance: "visibility_distance",
                  visibility_status_text: "visibility_status_text"
               }
           };

           const windSpeed = document.querySelector(`.${highlightClasses.windStatus.speed}`),
            gust = document.querySelector(`.${highlightClasses.windStatus.gust}`),
            humidityPercentage = document.querySelector(`.${highlightClasses.humidity.percentage}`),
            humiditySituation = document.querySelector(`.${highlightClasses.humidity.situation}`),
            sunriseTime = document.querySelector(`.${highlightClasses.sun_rise_set.sunrise}`),
            sunsetTime = document.querySelector(`.${highlightClasses.sun_rise_set.sunset}`),
            timezone_text = document.querySelector(`.${highlightClasses.timezone.timezone_text}`),
            currentTime = document.querySelector(`.${highlightClasses.timezone.current_time}`),
            visibilityDistance = document.querySelector(`.${highlightClasses.visibility.visibility_distance}`),
            visibilityStatusText = document.querySelector(`.${highlightClasses.visibility.visibility_status_text}`);
            
            
           windSpeed.textContent = `${weatherData.wind.speed}`;
           gust.textContent = `${weatherData.wind.gust}`;
           humidityPercentage.textContent = `${weatherData.main.humidity}`;
           humiditySituation.textContent = weatherCondition.includes("rain")? "Rainy" : "Humid";
           sunriseTime.textContent = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
           sunsetTime.textContent = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
           const timezoneOffset = weatherData.timezone;
           const timezoneOffsetHours = timezoneOffset / 3600;
           const formattedTimezone = `UTC${timezoneOffsetHours >= 0 ? '+' : ''}${timezoneOffsetHours}`;
            timezone_text.textContent = formattedTimezone;
            function updateTime() {
               const utcDate = new Date(Date.now());
               const hours = utcDate.getHours().toString().padStart(2, '0');
               const minutes = utcDate.getMinutes().toString().padStart(2, '0');
               const seconds = utcDate.getSeconds().toString().padStart(2, '0');
           
               currentTime.textContent = `${hours}:${minutes}:${seconds}`;
            }
            setInterval(updateTime, 1000);
            updateTime();
           
            const visibilityKm = weatherData.visibility / 1000;
            visibilityDistance.textContent = visibilityKm;
            let visibilityStatus = "Normal";
            if (visibilityKm > 10) {
               visibilityStatus = "Good";
           } else if (visibilityKm <= 10 && visibilityKm > 2) {
               visibilityStatus = "Normal";
           } else {
               visibilityStatus = "Poor";
           }
            visibilityStatusText.textContent = visibilityStatus;

           


           


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

  function signInModal() {
    const logInOutBtn = document.querySelector("#tizimga-kirish-btn"),
      signUpBtn = document.querySelector("#sign-up-btn"),
      signInBtn = document.querySelector("#sign-in-btn"),
      signUpModal = document.querySelector(".signUp"),
      signInModal = document.querySelector(".signIn"),
      formModal = document.querySelector("#signInOutModal"),
      main_weather_content = document.querySelector(".main_weather_content");

    document.addEventListener("click", (e) => {
      if (
        e.target.id === "signInOutModal" ||
        e.target.classList.contains("btnClose")
      ) {
        formModal.classList.add("modal-hide");
        main_weather_content.classList.remove("modal-hide");
        document.body.style.overflow = "";
      }
    });

    logInOutBtn.addEventListener("click", () => {
      formModal.classList.remove("modal-hide");
      main_weather_content.classList.add("modal-hide");
      document.body.style.overflow = "hidden";
    });

    function toggleModal(showModal, hideModal) {
      showModal.classList.remove("modal-hide");
      hideModal.classList.add("modal-hide");
    }

    signUpBtn.addEventListener("click", () => {
      toggleModal(signUpModal, signInModal);
    });

    signInBtn.addEventListener("click", () => {
      toggleModal(signInModal, signUpModal);
    });
  }

  function alertModal() {
    const modal = document.querySelector("#successModal");
    const modalMessage = document.querySelector("#modalMessage");
    const successModalCloseBtn = document.querySelector(
      ".successModalCloseBtn"
    );
    function closeModal() {
      modal.style.transform = "translateX(100%)";
      setTimeout(() => {
        modal.style.display = "none";
        modal.style.visibility = "hidden";
      }, 300);
    }

    function showModal(message) {
      if (modal) {
        modalMessage.textContent = message;
        modal.style.display = "block";
        modal.style.transform = "translateX(0)";
        modal.style.visibility = "visible";
        setTimeout(closeModal, 3000);
      }
    }

    function getURLParameter(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }

    successModalCloseBtn.addEventListener("click", closeModal);

    const status = getURLParameter("status");

    if (status === "success") {
      showModal("Tizimga muvaffaqiyatli kirdingiz!");
    } else if (status === "error") {
      showModal("Email yoki parol noto'g'ri!");
    } else if (status === "error_email") {
      showModal("Bu email bilan hisob topilmadi!");
    } else if (status === "error_password") {
      showModal("Noto'g'ri parol, iltimos qayta urinib ko'ring!");
    } else if (status === "email_exists") {
      showModal("Bu email allaqachon ro'yxatdan o'tgan!");
    }
  }

  function fetchData() {
    fetch("./php/session_data.php")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const sayHello = document.getElementById("welcomeMessage"),
          userName = document.getElementById("userName"),
          userEmail = document.getElementById("userEmail"),
          logInBtn = document.getElementById("tizimga-kirish-btn"),
          signOutBtn = document.getElementById("tizimdan-chiqish"),
          tizimText = document.getElementById("tizim-text"),
          signoutModal = document.getElementById("signoutModal");

        if (data.status === "success") {
          logInBtn.classList.add("d-none");
          signOutBtn.classList.remove("d-none");
          tizimText.textContent = "Tizimdan chiqish";
          sayHello.textContent = `Hi ${data.username}`;
          userName.textContent = data.username;
          userEmail.textContent = data.email;
        } else {
          sayHello.textContent = "Welcome!";
          userName.textContent = "username";
          userEmail.textContent = "user email";
          logInBtn.classList.remove("d-none");
          signOutBtn.classList.add("d-none");
          tizimText.textContent = "Tizimga kirish";
        }
        signOutBtn.addEventListener("click", function () {
          signoutModal.classList.remove("modal-hide");
          document.body.style.overflow = "hidden";
        });

        document.addEventListener("click", (e) => {
          if (e.target.id === "confirmSignoutBtn") {
            fetch("./php/signout.php")
              .then((response) => {
                window.location.href = "./index.php"; // Chiqishdan so'ng sahifani yangilash
              })
              .catch((error) => console.error("Chiqishda xatolik:", error));
          } else if (
            e.target.id === "cancelSignoutBtn" ||
            e.target.id === "signoutModal"
          ) {
            signoutModal.classList.add("modal-hide");
            document.body.style.overflow = "";
          }
        });
      })
      .catch((error) =>
        console.error("Sessiya ma'lumotlarini olishda xatolik:", error)
      );
  }

  alertModal();

  function kunKech(data) {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return (data.innerHTML = "Good Morning!");
    } else if (hour >= 12 && hour < 18) {
      return (data.innerHTML = "Have a good day!");
    } else {
      return (data.innerHTML = "Good evening!");
    }
  }

  fetchData();
  alertModal();
  kunKech(document.querySelector(".goodDay"));
  signInModal();
});
