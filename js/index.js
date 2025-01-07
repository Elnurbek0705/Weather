"use strict";

document.addEventListener("DOMContentLoaded", () => {
  function theme() {
    const lightThemeBtn = document.querySelector(".light-theme-btn"),
      darkThemeBtn = document.querySelector(".dark-theme-btn"),
      active_theme = document.querySelector(".active_theme"),
      telegramImg = document.querySelector(".telegramImg");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const defaultTheme = systemPrefersLight ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", defaultTheme);
    const applyTheme = (isLight) => {
      document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
      active_theme.style.transform = isLight ? "translateX(-100%)" : "translateX(0)";
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
      verticalNavbar: "vertical-navbar content py-5 p-0 d-flex flex-column justify-content-between",
      menuBox: "menu_box d-flex justify-content-center align-items-center flex-column w-100",
      buttonsGroup: {
        buttons_groupClassname: "buttons_group d-flex flex-column w-100",
        button: "btn w-100",
        buttonType: ["weather active_nav_btn", "map", "notifications", "settings"],
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
      info_boxBtn = createElement("button", commonClasses.button[1]);

    header.prepend(nav);
    menu_box.appendChild(menuBtn);
    menu_box.appendChild(buttons_group);
    navClasses.buttonsGroup.buttonType.forEach((type) => {
      const button = createElement("button", `${navClasses.buttonsGroup.button} ${type}`);
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

  //   other countries

  function otherCountryUI(countryData, capitalData) {
    const othersCountriesContainer = document.querySelector(".others_countries");

    // Object.entries orqali mamlakat kodi va nomlarini iteratsiya qilish
    Object.entries(countryData).forEach(([code, countryName]) => {
      // Asosiy div
      const othersCountriesCountry = document.createElement("div");
      othersCountriesCountry.className =
        "others_countries_country btn-hover-effect info_cantent d-flex justify-content-between align-items-center my-4";

      // Country va city ma'lumotlari
      const otherCountryNameInfo = document.createElement("div");
      otherCountryNameInfo.className = "other_country_nameInfo";

      const countryNameElement = document.createElement("div");
      countryNameElement.className = "country_name weather-min-data";
      countryNameElement.textContent = countryName; // Mamlakat nomi

      const cityNameElement = document.createElement("div");
      cityNameElement.className = "city_name fs-4";
      cityNameElement.textContent = capitalData[code] || "Unknown City"; // Poytaxt shahar yoki `Unknown City`

      const weatherStatusElement = document.createElement("div");
      weatherStatusElement.className = "otherWeather_status";
      weatherStatusElement.textContent = "Status"; // Ob-havo holati (keyinchalik o'zgartirilishi mumkin)

      otherCountryNameInfo.append(countryNameElement, cityNameElement, weatherStatusElement);

      // Ob-havo rasmi
      const otherCountryWeatherImg = document.createElement("div");
      otherCountryWeatherImg.className = "other_country_weather_img";

      const weatherImg = document.createElement("img");
      weatherImg.src = "./img/weather_images/sunny.svg"; // Default ob-havo rasmi
      weatherImg.width = 70;
      weatherImg.height = 70;
      weatherImg.alt = "photo";

      otherCountryWeatherImg.append(weatherImg);

      // Harorat ma'lumotlari
      const otherCountryWeatherDegrees = document.createElement("div");
      otherCountryWeatherDegrees.className = "other_country_weather_degries";

      const weatherMaxElement = document.createElement("span");
      weatherMaxElement.className = "oweather-max-data fw-bold fs-4";
      weatherMaxElement.textContent = "0°C"; // Maksimal harorat

      const weatherMinElement = document.createElement("span");
      weatherMinElement.className = "oweather-min-data";
      weatherMinElement.textContent = "/0°C"; // Minimal harorat

      otherCountryWeatherDegrees.append(weatherMaxElement, weatherMinElement);

      // Asosiy divga barcha qismlar qo'shiladi
      othersCountriesCountry.append(otherCountryNameInfo, otherCountryWeatherImg, otherCountryWeatherDegrees);

      // Umumiy konteynerga qo'shish
      othersCountriesContainer.append(othersCountriesCountry);
    });
  }

  function oldOtherCountriesHeightTwoElement() {
   const otherCountriesContainer = document.querySelector(".others_countries");
   const toggleBtn = document.querySelector('.seeAllBtn');
   const toggleLess = () => {
      otherCountriesContainer.classList.toggle("fideAll")
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Body scrollni yoqish yoki o'chirish
    document.body.style.overflow = otherCountriesContainer.classList.contains("fideAll")
      ? "hidden"
      : "auto";
      toggleBtn.textContent = otherCountriesContainer.classList.contains("fideAll")? "See Less" : "See All";
   };
   toggleBtn.addEventListener('click', toggleLess)
}

oldOtherCountriesHeightTwoElement();


  // Mamlakatlar va poytaxtlar obyektlarini funksiya bilan ishlatish
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

  const capitalCityNames = {
    UZ: "Tashkent",
    US: "Washington, D.C.",
    RU: "Moscow",
    IN: "New Delhi",
    CN: "Beijing",
    JP: "Tokyo",
    DE: "Berlin",
    FR: "Paris",
    GB: "London",
    IT: "Rome",
    CA: "Ottawa",
    AU: "Canberra",
  };

  // Funksiyani chaqirish
  otherCountryUI(countryNames, capitalCityNames);

  function updateWeather() {
    const locationSpan = document.querySelector(".current_localation span"),
      weekdayElement = document.querySelector(".weekday"),
      mmddyy = document.querySelector(".mmddyy"),
      weatherImgCurrent = document.querySelector(".current-day-img img"),
      weatherMax = document.querySelector(".weather-max-data"),
      weatherMin = document.querySelector(".weather-min-data"),
      weatherFeels = document.querySelector(".feels"),
      weatherStatus = document.querySelector(".status"),
      degSelect = document.querySelector("#deg-select");

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
          const apiKeyWeather = "a40ebafd2f0a56d81aeaa5fbd82b18dc"; // OpenWeather API kaliti
          const apiKeyForecast = "c161f5a4e9b147fa8bb66414e81aa1a1"; // Weatherbit API kaliti

          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeyWeather}`;

          try {
            const response = await fetch(weatherUrl);
            const weatherData = await response.json();

            const countryCode = weatherData.sys.country; // Mamlakat kodi, masalan, "US"
            const cityName = weatherData.name; // Shahar nomi, masalan, "Raleigh"

            const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&country=${countryCode}&key=${apiKeyForecast}`;

            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();

            console.log("Birlamchi API ma'lumotlari:", weatherData);
            console.log("Ikkinchi API ma'lumotlari:", forecastData);

            const currentDay = {
              textChanger: (weatherData) => {
                locationSpan.textContent = weatherData.name + ", " + countryNames[weatherData.sys.country];
                const today = new Date();
                weekdayElement.textContent = weekdays[today.getDay()];
                const yearsMonth = months[today.getMonth()];
                mmddyy.textContent = `${today.getDate()} ${yearsMonth.slice(0, 3)},${today.getFullYear()}`;
                weatherMax.textContent = `${Math.round(weatherData.main.temp_max)}°C`;
                weatherMin.textContent = `/${Math.round(weatherData.main.temp_min)}°C`;
                weatherFeels.textContent = `Feels like ${Math.round(weatherData.main.feels_like)}°C`;
                weatherStatus.textContent = weatherData.weather[0].description;
                degSelect.addEventListener("change", (event) => {
                  const selectedUnit = event.target.value;
                  const currentTempMax = Math.round(weatherData.main.temp_max);
                  const currentTempMin = Math.round(weatherData.main.temp_min);
                  const currentFeelsLike = Math.round(weatherData.main.feels_like);
                  console.log(typeof weatherData.main.temp_max);

                  if (selectedUnit === "dog") {
                    weatherMax.textContent = `${Math.round((currentTempMax * 9) / 5 + 32)}°F`;
                    weatherMin.textContent = `/${Math.round((currentTempMin * 9) / 5 + 32)}°F`;
                    weatherFeels.textContent = `Feels like ${Math.round((currentFeelsLike * 9) / 5 + 32)}°F`;
                  } else {
                    weatherMax.textContent = `${Math.round(currentTempMax)}°C`;
                    weatherMin.textContent = `/${Math.round(currentTempMin)}°C`;
                    weatherFeels.textContent = `Feels like ${Math.round(currentFeelsLike)}°C`;
                  }
                });
              },
              weatherCondition: weatherData.weather[0].main.toLowerCase(),
              weatherConditionToText: (weatherImg, getweatherCondition) => {
                let imgSrc = "";
                if (getweatherCondition.includes("rain")) {
                  imgSrc = "./img/weather_images/rainny.svg";
                } else if (getweatherCondition.includes("cloud") || getweatherCondition.includes("smoke") || getweatherCondition.includes("clouds"))  {
                  imgSrc = "./img/weather_images/cloudy.svg ";
                } else if (getweatherCondition.includes("clear") || getweatherCondition.includes("Clear Sky")) {
                  imgSrc = "./img/weather_images/sunny.svg";
                } else if (getweatherCondition.includes("snow")) {
                  imgSrc = "./img/weather_images/snowy.png";
                } else if (getweatherCondition.includes("mist") || getweatherCondition.includes("fog")) {
                  imgSrc = "./img/weather_images/mist.png";
                } else {
                  imgSrc = "./img/weather_images/default.svg";
                }
                weatherImg.src = imgSrc;
                weatherImg.alt = getweatherCondition;
              },
            };

            currentDay.textChanger(weatherData);

            async function otherCountriesWeather() {
               const apiKey = "a40ebafd2f0a56d81aeaa5fbd82b18dc";
               try {
                 const countryNamesElements = document.querySelectorAll(".city_name");
                 const weatherImgCurrents = document.querySelectorAll(".other_country_weather_img img");
                 const OyherweatherStatus = document.querySelectorAll(".otherWeather_status");
                 const weatherMaxs = document.querySelectorAll(".oweather-max-data");
                 const weatherMins = document.querySelectorAll(".oweather-min-data");
             
                 for (let index = 0; index < countryNamesElements.length; index++) {
                   const countryElement = countryNamesElements[index];
                   console.log(countryElement);
                   const countryCode = countryElement.textContent;
                   console.log(countryCode);
             
                   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&units=metric&appid=${apiKey}`;
                   
                   const response = await fetch(weatherUrl);
                   if (!response.ok) {
                     throw new Error("Ma'lumotni olishda xatolik");
                   }
             
                   const weatherData = await response.json();
                   const weatherCondition = weatherData.weather[0].main.toLowerCase();
                   console.log(weatherCondition);
                   countryElement.textContent = countryCode;
                   currentDay.weatherConditionToText(weatherImgCurrents[index], weatherCondition)
                   weatherMaxs[index].textContent = `${Math.round(weatherData.main.temp_max)}°C`;
                   weatherMins[index].textContent = `/${Math.round(weatherData.main.temp_min)}°C`;
                   OyherweatherStatus[index].textContent = capitalizeWords(weatherData.weather[0].description);
                 }
               } catch (error) {
                 console.error("Shahar ma'lumotlarini olishda xatolik:", error);
               }
             }
             function capitalizeWords(str) {
               return str
                   .split(' ') // Matnni so'zlarga ajratadi
                   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Har bir so'zni katta qilib boshlaydi
                   .join(' '); // So'zlarni yana bitta matnga birlashtiradi
           }
           
           
             
             otherCountriesWeather();

            document.querySelectorAll(".others_countries_country").forEach((countryElement) => {
              countryElement.addEventListener("click", async () => {
                const cityName = countryElement.querySelector(".city_name").textContent;
                const apiKey = "a40ebafd2f0a56d81aeaa5fbd82b18dc";
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

                try {
                  const response = await fetch(weatherUrl);
                  if (!response.ok) {
                    throw new Error("Ma'lumotni olishda xatolik");
                  }
                  const weatherData = await response.json();
                  console.log(weatherData.sys.country);
                  currentDay.textChanger(weatherData);
                  const weatherCondition = weatherData.weather[0].main.toLowerCase();
                  console.log(weatherCondition);
                  currentDay.weatherConditionToText(weatherImgCurrent, weatherCondition);
                  displayForecastInfo(forecastUrl);
                  console.log(`Yangilangan shahar: ${cityName}`, weatherData);
                } catch (error) {
                  console.error("Shahar ma'lumotlarini olishda xatolik:", error);
                }
              });
            });


            const highlightClasses = {
              windStatus: {
                container: "wind_status",
                speed: "wind_speed",
                deg: "deg",
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
                current_time: "current_time",
              },
              visibility: {
                visibility_distance: "visibility_distance",
                visibility_status_text: "visibility_status_text",
              },
              forecast: {
                day: "day",
                day_img: "day_img",
                weather_day_data: "weather_day_data",
              },
            };

            const windSpeed = document.querySelector(`.${highlightClasses.windStatus.speed}`),
              wind_deg = document.querySelector(`.${highlightClasses.windStatus.deg}`),
              humidityPercentage = document.querySelector(`.${highlightClasses.humidity.percentage}`),
              humiditySituation = document.querySelector(`.${highlightClasses.humidity.situation}`),
              sunriseTime = document.querySelector(`.${highlightClasses.sun_rise_set.sunrise}`),
              sunsetTime = document.querySelector(`.${highlightClasses.sun_rise_set.sunset}`),
              timezone_text = document.querySelector(`.${highlightClasses.timezone.timezone_text}`),
              currentTime = document.querySelector(`.${highlightClasses.timezone.current_time}`),
              visibilityDistance = document.querySelector(`.${highlightClasses.visibility.visibility_distance}`),
              visibilityStatusText = document.querySelector(`.${highlightClasses.visibility.visibility_status_text}`);

            function getWindDirection(deg) {
              if ((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg < 22.5)) return "North";
              if (deg >= 22.5 && deg < 67.5) return "Northeast";
              if (deg >= 67.5 && deg < 112.5) return "East";
              if (deg >= 112.5 && deg < 157.5) return "Southeast";
              if (deg >= 157.5 && deg < 202.5) return "South";
              if (deg >= 202.5 && deg < 247.5) return "Southwest";
              if (deg >= 247.5 && deg < 292.5) return "West";
              if (deg >= 292.5 && deg < 337.5) return "Northwest";
              return "Unknown direction";
            }
            function displayWindInfo(windInfo) {
              const windDirection = getWindDirection(windInfo);
              wind_deg.textContent = `${windDirection}`;
            }
            const windDeg = weatherData.wind.deg;
            displayWindInfo(windDeg);

            windSpeed.textContent = `${weatherData.wind.speed}`;
            humidityPercentage.textContent = `${weatherData.main.humidity}`;
            humiditySituation.textContent = currentDay.weatherCondition.includes("rain") ? "Rainy" : "Humid";
            const timezoneOffset = weatherData.timezone;
            const timezoneOffsetMs = timezoneOffset * 1000;
            const timezoneOffsetHours = timezoneOffset / 3600;

            sunriseTime.textContent = new Date(weatherData.sys.sunrise * 1000 + timezoneOffsetMs).toLocaleTimeString(
              "en-US",
              { timeZone: "UTC" }
            );
            sunsetTime.textContent = new Date(weatherData.sys.sunset * 1000 + timezoneOffsetMs).toLocaleTimeString(
              "en-US",
              { timeZone: "UTC" }
            );

            const formattedTimezone = `UTC${timezoneOffsetHours >= 0 ? "+" : ""}${timezoneOffsetHours}`;
            console.log(formattedTimezone);
            timezone_text.textContent = formattedTimezone;

            function updateTime() {
              const utcDate = new Date();
              const hours = utcDate.getUTCHours();
              const minutes = utcDate.getUTCMinutes().toString().padStart(2, "0");
              const seconds = utcDate.getUTCSeconds().toString().padStart(2, "0");

              let adjustedHours = hours + timezoneOffsetHours;

              if (adjustedHours >= 24) {
                adjustedHours -= 24;
              } else if (adjustedHours < 0) {
                adjustedHours += 24;
              }

              const isPM = adjustedHours >= 12;
              const displayHours = adjustedHours % 12 || 12;
              const period = isPM ? "PM" : "AM";
              currentTime.textContent = `${displayHours.toString().padStart(2, "0")}:${minutes}:${seconds} ${period}`;
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

            async function displayForecastInfo(forecastUrl) {
              const forecastUrlRes = await fetch(forecastUrl);
              const forecastData = await forecastUrlRes.json();

              const forecastDays = document.querySelectorAll(`.${highlightClasses.forecast.day}`);
              const forecastDayImgs = document.querySelectorAll(`.${highlightClasses.forecast.day_img}`);
              const forecastDayData = document.querySelectorAll(`.${highlightClasses.forecast.weather_day_data}`);

              forecastDays.forEach((day, index) => {
                const forecastDayData = new Date(forecastData.data[index].datetime);
                const dayOfWeek = forecastDayData.toLocaleString("en-US", { weekday: "long" });
                day.textContent = dayOfWeek;
              });

              forecastDayImgs.forEach((img, index) => {
                const forecastWeatherCondition = forecastData.data[index].weather.description;
                console.log(forecastWeatherCondition);

                currentDay.weatherConditionToText(img, forecastWeatherCondition);
              });

              forecastDayData.forEach((data, index) => {
                const weatherStatus =
                  (+forecastData.data[index].app_max_temp + +forecastData.data[index].app_min_temp) / 2;
                data.textContent = `${Math.round(weatherStatus)}°C`;
              });
            }
            displayForecastInfo(forecastUrl);
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
      if (e.target.id === "signInOutModal" || e.target.classList.contains("btnClose")) {
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
    const successModalCloseBtn = document.querySelector(".successModalCloseBtn");
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
          } else if (e.target.id === "cancelSignoutBtn" || e.target.id === "signoutModal") {
            signoutModal.classList.add("modal-hide");
            document.body.style.overflow = "";
          }
        });
      })
      .catch((error) => console.error("Sessiya ma'lumotlarini olishda xatolik:", error));
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
