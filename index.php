<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>Weather App</title>
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
   <link rel="stylesheet" href="./style/style.css" />
</head>

<body>
   <header id="header" class="p-4 d-flex position-relative">
      <!-- nav -->
      <main class="main w-100 position-relative">
         <div class="row mb-3 px-3">
            <div class="col-md-6">
               <span id="welcomeMessage">Hi, User</span>
               <b class="d-block fs-2 fw-semibold goodDay">Good Morning</b>
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-end">
               <input type="text" class="form-control border-0 searchbar" placeholder="Joylashuvingizni qidiring..." />
               <a href="https://t.me/elnur0710" target="_blank"
                  class="d-flex align-items-center justify-content-center mx-2 p-1"><img class="telegramImg" width="30"
                     src="./img/telegramLight.png" alt="photo" /></a>
               <div class="theme_buttons d-flex align-items-center">
                  <span class="active_theme"></span>
                  <button class="light-theme-btn d-flex align-items-center justify-content-center btn">
                     <img src="./img/lightBtn.svg" alt="photo" />
                  </button>
                  <button class="dark-theme-btn d-flex align-items-center justify-content-center btn"
                     style="filter: brightness(1000%)">
                     <img src="./img/darkBtn.svg" alt="photo" />
                  </button>
               </div>
               <!-- user avatar img and drop down-->
               <div class="dropdown d-flex align-items-center">
                  <button class="btn border-0 dropdown-toggle" type="button" id="dropdownMenuButton"
                     data-bs-toggle="dropdown" aria-expanded="false">
                     <img src="./img/user-avatar.png" alt="photouser avatar" />
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                     <li>
                        <button class="dropdown-item current_user_data d-flex" href="#">
                           <img src="./img/user-avatar.png" alt="photouser avatar" />
                           <div class="user_data mx-3 user-info">
                              <div id="userName" class="current_user_name">Firstname Lastname</div>
                              <div id="userEmail" class="current_user_email">firstname@gmail.com</div>
                           </div>
                        </button>
                     </li>
                     <li>
                        <button class="dropdown-item d-flex align-items-center p-3 px-4" href="#">
                           <img class="mx-2" src="./img/gear.png" width="20" alt="photo" />
                           <span class="mx-3 settings-btn">Profile settings</span>
                        </button>
                     </li>
                     <li>
                        <button class="dropdown-item d-flex align-items-center p-3 px-4" id="tizimga-kirish-btn"
                           href="#">
                           <img class="mx-2" src="./img/sign-in.png" width="20" alt="photo" />
                           <span class="mx-3" id="tizim-text">Sign in</span>
                        </button>
                        <button class="dropdown-item d-flex align-items-center p-3 px-4 d-none" id="tizimdan-chiqish"
                           href="#">
                           <img class="mx-2" src="./img/sign-in.png" width="20" alt="photo" />
                           <span class="mx-3" id="tizim-text">Sign out</span>
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         <div class="main_weather_content manage_modal">
            <div class="row main-content m-0">
               <div class="col-md-5">
                  <div class="current_country content">
                     <div class="row">
                        <div class="col-md-7 current-day">
                           <div class="current_localation d-flex align-content-center">
                              <img src="./img/weather_images/localation.svg" alt="photo" class="ico px-1" /><span>City,
                                 Country</span>
                           </div>
                           <div class="weekday fs-2 fw-medium pt-1">weekday</div>
                           <div class="mmddyy">dd mm,yyyy</div>
                           <div class="current-day-img">
                              <img src="./img/weather_images/rainny.svg" width="142" alt="photo" />
                           </div>
                        </div>
                        <div
                           class="col-md-5 weatherInfoBox text-lg-end text-nowrap d-flex align-items-end justify-content-between flex-column">
                           <select id="deg-select">
                              <option value="">&deg;C</option>
                              <option value="dog">F</option>
                           </select>
                           <div class="weather-degries pt-4 pb-5">
                              <div class="weather-max-data fw-bold fs-1">0&deg;C</div>
                              <div class="weather-min-data fs-5">/0&deg;C</div>
                           </div>
                           <div class="weather-status">
                              <div class="status fw-bolder fs-5 text-capitalize">
                                 Heavy Rain
                              </div>
                              <div class="feels">Feels like 0&deg;</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <!-- other_countries -->
                   
                  <div class="others_countries content mt-4">
                     <div class="others_countries-title d-flex justify-content-between">
                        <b class="fs-4">Others Countries</b>
                        <button class="seeAllBtn">See All &bigtriangledown;</button>
                     </div>
                     <div
                        class="others_countries_country btn-hover-effect info_cantent d-flex justify-content-between align-items-center my-4">
                        <div class="other_country_nameInfo">
                           <div class="country_name weather-min-data">Country</div>
                           <div class="city_name fs-4">City</div>
                           <div class="weather_status">Status</div>
                        </div>
                        <div class="other_country_weather_img">
                           <img src="./img/weather_images/sunny.svg" width="70" height="70" alt="photo" />
                        </div>
                        <div class="other_country_weather_degries">
                           <span class="weather-max-data fw-bold fs-4">0&deg;C</span>
                           <span class="weather-min-data">/0&deg;C
                           </span>
                        </div>
                     </div>

                     <div
                        class="others_countries_country btn-hover-effect info_cantent d-flex justify-content-between align-items-center">
                        <div class="other_country_nameInfo">
                           <div class="country_name weather-min-data">Country</div>
                           <div class="city_name fs-4">City</div>
                           <div class="weather_status">Status</div>
                        </div>
                        <div class="other_country_weather_img">
                           <img src="./img/weather_images/sunny.svg" width="70" height="70" alt="photo" />
                        </div>
                        <div class="other_country_weather_degries">
                           <span class="weather-max-data fw-bold fs-4">0&deg;C</span>
                           <span class="weather-min-data">/0&deg;C
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <!-- todays_highlight -->

               <div class="col-md-7 weather-info px-3">
                  <div class="todays_highlight content">
                     <b class="fs-4 pb-2 d-inline-block">Today’s Highlight</b>
                     <div class="row">
                        <div class="col-md-7 row m-0">
                           <div class="col-md-6 my-2">
                              <div class="wind_status info_cantent text-lg-end h-100 align-content-center">
                                 <div class="wind_status_title">
                                    <img src="./img/weather_images/wind.svg" alt="photo">
                                    <b>Wind Status</b>
                                 </div>
                                 <b class="wind_speed fs-4 d-inline-block my-2">0</b>
                                 <span class="fs-6 fw-medium">km/h</span><br>
                                 <div class="deg d-inline-block">0</div>
                              </div>
                           </div>

                           <div class="col-md-6 my-2">
                              <div class="humidity_status info_cantent text-lg-end  h-100 align-content-center">
                                 <div class="">
                                    <img src="./img/weather_images/humidity.svg" alt="photo">
                                    <b>Humidity</b>
                                 </div>
                                 <b class="humidity_percentage fs-4 d-inline-block my-2">00</b>
                                 <span class="fs-6 fw-medium">%</span>
                                 <div class="humidity_situation">Humidity is good</div>
                              </div>
                           </div>
                        </div>
                        <div class="col-md-5 my-2">
                           <div class="sun_rise_set info_cantent h-100 align-content-center">
                              <div class="row">
                                 <div class="col-md-6 align-content-center text-center">
                                    <img src="./img/weather_images/sunrise.svg" alt="">
                                 </div>
                                 <div class="col-md-6">
                                    <div class="fw-medium">Sunrise</div>
                                    <b class="sunrise_time fs-4">00:00:00</b>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-md-7 row m-0">
                           <div class="col-md-6 my-2">
                              <div class="info_cantent text-lg-end h-100 align-content-center">
                                 <div class="">
                                    <img src="./img/weather_images/timezone.svg" alt="photo">
                                    <b>Time Zone</b>
                                 </div>
                                 <b class="timezone fs-4 d-inline-block my-2">0</b>
                                 <span class="fs-6 fw-medium current_time"></span>
                                 <div class="timezone_text">UTC</div>
                              </div>
                           </div>

                           <div class="col-md-6 my-2">
                              <div class="visibility info_cantent text-lg-end  h-100 align-content-center">
                                 <div class="">
                                    <img src="./img/weather_images/visibility.svg" alt="photo">
                                    <b>Visibility</b>
                                 </div>
                                 <b class="visibility_distance fs-4 d-inline-block my-2">0</b>
                                 <span class="fs-6 fw-medium"> km</span>
                                 <div class="visibility_status_text">Normal</div>
                              </div>
                           </div>
                        </div>
                        <div class="col-md-5 my-2">
                           <div class="sun_rise_set info_cantent h-100 align-content-center">
                              <div class="row">
                                 <div class="col-md-6 align-content-center text-center">
                                    <img src="./img/weather_images/sunset.svg" alt="">
                                 </div>
                                 <div class="col-md-6">
                                    <div class="fw-medium">Sunset</div>
                                    <b class="sunset_time fs-4">00:00:00</b>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="six_day_forecast content mt-4">
                     <b class="fs-4 pb-4 d-inline-block">5 Day Forecast</b>
                     <div class="row">
                        <div class="col d-flex flex-column align-items-center justify-content-center">
                           <div class="day_item info_cantent text-center">
                              <div class="day position-relative fw-medium">Today</div>
                              <img src="./img/weather_images/rainny.svg" class="day_img my-3" width="70" height="70" alt="">
                              <div class="weather_day_data">0°C</div>
                           </div>
                        </div>
                        <div class="col d-flex flex-column align-items-center justify-content-center">
                           <div class="day_item info_cantent text-center">
                              <div class="day position-relative fw-medium">Today</div>
                              <img src="./img/weather_images/rainny.svg" class="day_img my-3" width="70" height="70" alt="">
                              <div class="weather_day_data">0°C</div>
                           </div>
                        </div>
                        <div class="col d-flex flex-column align-items-center justify-content-center">
                           <div class="day_item info_cantent text-center">
                              <div class="day position-relative fw-medium">Today</div>
                              <img src="./img/weather_images/rainny.svg" class="day_img my-3" width="70" height="70" alt="">
                              <div class="weather_day_data">0°C</div>
                           </div>
                        </div>
                        <div class="col d-flex flex-column align-items-center justify-content-center">
                           <div class="day_item info_cantent text-center">
                              <div class="day position-relative fw-medium">Today</div>
                              <img src="./img/weather_images/rainny.svg" class="day_img my-3" width="70" height="70" alt="">
                              <div class="weather_day_data">0°C</div>
                           </div>
                        </div>
                        <div class="col d-flex flex-column align-items-center justify-content-center">
                           <div class="day_item info_cantent text-center">
                              <div class="day position-relative fw-medium">Today</div>
                              <img src="./img/weather_images/rainny.svg" class="day_img my-3" width="70" height="70" alt="">
                              <div class="weather_day_data">0°C</div>
                           </div>
                        </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>


         <!-- Settings -->
         <!-- <div class="main_profile_settings">
            <div class="row">
               <div class="col-md-4">
                  <div class="main_profile_settings_profile">
                     <img src="./img/user-avatar.png" alt="photo" class="circle_avatar_img rounded-circle" width="150">
                     <div class="user_datas">
                        <div class="user_name">Firsname Lastname</div>
                        <div class="user_role">Web-designer</div>
                     </div>
                  </div>
               </div>
               <div class="col-md-8"></div>
            </div>
         </div> -->


         <!-- Sign in modal -->

         <section id="signInOutModal" class="position-fixed modal-hide manage_modal align-content-center" tabindex="-1"
            aria-labelledby="signInModalLabel" aria-hidden="f">
            <div class="row m-0 position-relative formContent">
               <!-- close modal button -->
               <button type="button" class="btnClose w-auto">X</button>
               <div class="col-md-6 d-flex align-items-center flex-column justify-content-center border formimg z-1">
                  <div class="signIn-modal-titles d-flex justify-content-center align-content-center flex-column">
                     <h1 class=" fs-1">Regestry</h1>
                     <p>Welcome to our weather website!</p>
                     <button id="sign-in-btn" type="button" class="btn w-100 fs-5 mb-3" data-bs-dismiss="modal">Sign
                        In</button>
                     <button id="sign-up-btn" type="button" class="btn w-100 fs-5" data-bs-dismiss="modal">Sign
                        Up</button>
                  </div>
               </div>
               <div class="col-md-6 d-flex justify-content-center">
                  <div class="text-center d-flex justify-content-center flex-column signIn">
                     <b class="fs-1">Sign In</b>
                     <!-- form -->
                     <form action="./php/signin.php" method="post"
                        class="form-group d-flex align-items-center flex-column justify-content-center">
                        <input type="email" name="email" class="form-control m-3 fs-5" placeholder="Email address"
                           required />
                        <input type="password" name="password" class="form-control m-3 fs-5" placeholder="Parol"
                           required />
                        <button type="submit" class="btn border border-1 w-100 m-3 fs-5">Submit</button>
                     </form>
                     <!-- form end -->
                  </div>
                  <div
                     class="text-center d-flex justify-content-center flex-column modal-hide signUp position-absolute h-100">
                     <b class="fs-1">Sign Up</b>
                     <!-- form -->
                     <form action="./php/signup.php" method="post"
                        class="form-group d-flex align-items-center flex-column justify-content-center">
                        <input type="text" name="name" class="form-control m-3 fs-5" placeholder="Ismingiz" required />
                        <input type="text" name="lastname" class="form-control m-3 fs-5" placeholder="Familiyangiz"
                           required />
                        <input type="email" name="email" class="form-control m-3 fs-5" placeholder="Email address"
                           required />
                        <input type="password" name="password" class="form-control m-3 fs-5" placeholder="Parol"
                           required />
                        <div class="check-agree-box align-self-lg-start">
                           <input type="checkbox" name="shartlar" id="agree" required />
                           <label for="agree">Oferta shartlariga roziman</label>
                        </div>
                        <button type="submit" class="btn border border-1 w-100 m-3 fs-5">Submit</button>
                     </form>
                     <!-- form end-->
                  </div>
               </div>
            </div>
         </section>
      </main>



      <!-- Succes modal alert -->

      <div class="successModal overflow-x-hidden">
         <div id="successModal"
            class="bg-gradient py-1 px-3 border d-flex lh-1 align-content-center justify-content-between">
            <span id="modalMessage">Tizimga muvofaqqiyatli kirdingiz!</span>
            <button class="text-white px-2 pb-1 lh-1 bg-danger mx-1 successModalCloseBtn">x</button>
         </div>
      </div>
   </header>






   <!-- agree modal -->

   <div id="signoutModal" class="modal position-fixed modal-hide manage_modal">
      <div class="modal-items d-flex flex-column align-content-center justify-content-center text-center">
         <p class="text-danger fw-bold fs-5">Are you sure you want to log out?</p>
         <div class="w-50 d-flex justify-content-sm-between  mx-auto">
            <button id="confirmSignoutBtn" class="fw-bold btn-hover-effect">Yes</button>
            <button id="cancelSignoutBtn" class="fw-bold btn-hover-effect">No</button>
         </div>
      </div>
   </div>



   <script src="./js/index.js"></script>
   <!-- <script type="module" src="index.js"></script> -->
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>