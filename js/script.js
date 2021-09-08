$(".symptoms__inner").slick({
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  prevArrow: `<button type="button" class="symptoms__arrow symptoms__arrow--left"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.16992 1.04492L0.848633 7.36621L7.16992 13.6875" stroke="white" stroke-linecap="round"/>
  </svg></button>`,
  nextArrow: `<button type="button" class="symptoms__arrow symptoms__arrow--right"><svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.830078 1.04492L7.15137 7.36621L0.830078 13.6875" stroke="white" stroke-linecap="round"/>
  </svg></button>`,
});

$(".about-specialists__slider").slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
});

document.querySelectorAll(".about-specialists__slider .slick-dots li button").forEach((btn) => (btn.innerHTML = ""));

// функция для обертки айтеов, чтобы после сделать слайдер

const concatForSlides = function (itemsNumPerSlide, itemsClass, slideClass, parentClass) {
  let items;
  let parent;
  items = document.querySelectorAll(`.${itemsClass}`);

  parent = document.querySelector(`.${parentClass}`);
  const slides = Math.ceil(items.length / itemsNumPerSlide);
  console.log(slides);
  console.log(items.length);
  for (let slideNum = 0; slideNum < slides; slideNum++) {
    const slide = document.createElement("div");
    slide.classList.add(slideClass);
    for (let itemNum = 0 + itemsNumPerSlide * slideNum; itemNum < itemsNumPerSlide + itemsNumPerSlide * slideNum + 1; itemNum++) {
      if (itemNum < items.length) {
        slide.appendChild(items[+itemNum]);
      }
    }
    parent.appendChild(slide);
  }
};

// burger menu in start pages
if (document.querySelector(".header-start")) {
  document.addEventListener("click", function (e) {
    const mobileMenu = document.querySelector(".header-start__nav.mobile");
    const bg = document.querySelector(".layer-header");
    const burger = document.querySelector(".burger");
    if (e.target == burger) {
      e.target.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      bg.classList.toggle("active");
      document.querySelector("body").classList.toggle("active");
    }

    if (e.target == bg) {
      burger.classList.remove("active");
      mobileMenu.classList.remove("active");
      bg.classList.remove("active");
      document.querySelector("body").classList.remove("active");
    }
  });
}

// accordion
if (document.querySelector(".accordion__inner")) {
  document.querySelector(".accordion__inner").addEventListener("click", function (e) {
    if (e.target.classList.contains("accordion__item")) {
      e.target.classList.toggle("active");
    }
  });
}

// login form
if (document.querySelector(".login__inner")) {
  document.querySelector(".login__inner").addEventListener("click", function (e) {
    if (e.target.classList.contains("login__forgot-link")) {
      e.preventDefault();
      document.querySelector(".login__window.active").classList.remove("active");
      document.querySelector(".login__window--recover").classList.add("active");
    }
    if (e.target.classList.contains("login__back")) {
      document.querySelector(".login__window.active").classList.remove("active");
      document.querySelector(".login__window").classList.add("active");
    }
    if (e.target.classList.contains("login__btn--send")) {
      e.preventDefault();
      document.querySelector(".login__window--recover").classList.remove("active");
      document.querySelector(".login__window--recover-check").classList.add("active");
    }
  });
}

// burger on other pages
if (document.querySelector(".burger")) {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".header__mobile-menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    document.querySelector("body").classList.toggle("active");
  });
}

if (document.querySelector(".reg")) {
  // рассче индекса массы тела
  document.addEventListener("keyup", function () {
    const msd = document.querySelector(".reg__msd");
    const weight = document.querySelector(".reg__input--weight input");
    const height = document.querySelector(".reg__input--height input");
    if (weight.value && height.value) {
      let msdNum = weight.value / (height.value / 100) ** 2;
      msd.classList.remove("inactive");
      switch (true) {
        case msdNum < 16.5:
          msd.innerHTML = "Выраженный дефицит массы";
          break;
        case msdNum >= 16.5 && msdNum < 18.5:
          msd.innerHTML = "	Недостаточная масса тела";
          break;
        case msdNum >= 18.5 && msdNum < 25:
          msd.innerHTML = "Нормальный индекс массы тела";
          break;
        case msdNum >= 25 && msdNum < 30:
          msd.innerHTML = "Избыточная масса тела";
          break;
        case msdNum >= 30 && msdNum < 35:
          msd.innerHTML = "Ожирение первой степени";
          break;
        case msdNum >= 35 && msdNum < 40:
          msd.innerHTML = "Ожирение второй степени";
          break;
        case msdNum >= 40:
          msd.innerHTML = "Ожирение третьей степени ";
          break;
      }
      console.log(msdNum);
    } else {
      msd.innerHTML = "Нормальный индекс массы тела";
      msd.classList.add("inactive");
    }
  });
  // загрузка файлов в регистрации пациента (2-ой шаг)
  const uploadFilesSecondStep = {}; // сюда сохраняем загруженные файлы
  let filesCount = 0;
  document.querySelector("#file").addEventListener("change", function (e) {
    filesCount++;
    // 1) находим загруженный файл и добавляем его в наш объект
    uploadFilesSecondStep[filesCount] = e.target.files[0];
    console.log(uploadFilesSecondStep);
    // 2) заплняем инпут в новом айтеме и в целом подргружаем новый айтем
    const fileName = e.srcElement.files[0].name;
    const filesList = document.querySelector(".reg__file-list");
    const fileWidth = window.innerWidth > 768 ? (fileName.length + 1) * 14 : (fileName.length + 1) * 9;
    console.log(e);
    const html = `
  <div class="reg__file-item" data-file="${filesCount}">
      <img src="./img/reg-icons/reg-file-icon.svg" alt="file icon" class="reg__file-icon" />
      <input type="text" class="reg__file-name" placeholder="Введите название файла" style="width: ${fileWidth}px"/>
      <button class="reg__file-del"></button>  
  </div>
  `;
    filesList.insertAdjacentHTML("beforeend", html);
    const filesInputs = document.querySelectorAll(".reg__file-name");
    filesInputs[filesInputs.length - 1].value = fileName;
    document.querySelector(".reg__file-list-text").classList.add("active");
  });

  //max-width: 300px;
  //width: 100%;

  // удаление файла из интерфейса и объекта
  document.querySelector(".reg__file-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("reg__file-del")) {
      const item = e.target.parentElement;
      const itemID = e.target.parentElement.dataset.file;
      delete uploadFilesSecondStep[itemID];
      item.remove();
    }
  });
  // загрузка анализов в регистрации пациента (3-ий шаг)
  document.querySelectorAll(".reg__analyze-input").forEach((analyze) =>
    analyze.addEventListener("change", function (e) {
      // 1) заплняем инпут в новом айтеме и в целом подргружаем новый айтем
      const fileName = e.srcElement.files[0].name;
      const filesList = document.querySelector(".reg__file-list");
      console.log(e);
      const html = `
    <div class="reg__analyze-item">
      <img src="./img/reg-icons/reg-file-icon.svg" alt="file icon" class="reg__analyze-icon" />
      <span class="reg__analyze-name btn-text">${fileName}</span>
    </div>
  `;
      analyze.parentElement.insertAdjacentHTML("afterend", html);
      analyze.parentElement.classList.add("hidden");
    })
  );
  // делаем динамический счетчик шагов
  const stepsCount = function (curStep) {
    document.querySelector(".reg__steps-cur").innerHTML = curStep;
  };
  stepsCount(document.querySelector(".reg__tabs-content.active").dataset.tab);

  // добавляем переключение по табам
  document.querySelector(".reg").addEventListener("click", function (e) {
    if (e.target.classList.contains("reg__tabs-btn")) {
      const dataTab = +e.target.dataset.tab;
      stepsCount(dataTab);
      document.querySelector(".reg__tabs-content.active").classList.remove("active");
      document.querySelector(".reg__tabs-btn.active").classList.remove("active");
      document.querySelector(`.reg__tabs-content[data-tab="${dataTab}"]`).classList.add("active");
      document.querySelector(`.reg__tabs-btn[data-tab="${dataTab}"]`).classList.add("active");
    }

    // возвращение к предыдущему шагу в мобилке
    const curStep = document.querySelector(".reg__tabs-content.active");
    if (e.target.classList.contains("reg__back")) {
      const curStepNum = +curStep.dataset.tab;
      if (!(curStepNum == 1)) {
        curStep.classList.remove("active");
        console.log(curStepNum);
        document.querySelector(`.reg__tabs-content[data-tab="${curStepNum - 1}"]`).classList.add("active");
        stepsCount(curStepNum - 1);
      } else {
        window.location.href = "login.html";
      }

      if (curStepNum == 2) {
        e.target.innerHTML = "Войти в личный кабинет";
        e.target.classList.remove("active");
      }
    }
  });

  document.querySelector(".reg__wrapper").addEventListener("click", function (e) {
    // добавляем функционал для кнопки Далее и Пропустить шаг
    e.preventDefault();
    if (e.target.classList.contains("reg__btn") || e.target.classList.contains("reg__pass")) {
      // переходим на новый шаг
      const curStep = +e.target.parentElement.dataset.tab;
      const curStepPage = document.querySelector(`.reg__tabs-content[data-tab="${curStep}"]`);
      const newTab = +curStep + 1;
      // добавляем класс active нужному шагу справа
      if (curStep != 5) {
        curStepPage.classList.remove("active");
        document.querySelector(`.reg__tabs-content[data-tab="${newTab}"]`).classList.add("active");
        stepsCount(newTab);
        document.querySelector(".reg__tabs-btn.active").classList.remove("active");
        document.querySelector(`.reg__tabs-btn[data-tab="${newTab}"]`).classList.add("active");
      } else {
        window.location.href = "client-profile.html";
      }
      if (curStep == 1) {
        document.querySelector(".reg__back").innerHTML = "Вернуться назад";
        document.querySelector(".reg__back").classList.add("active");
      }
    }
    // добавляем класс complete слева для выполненного таба
    if (e.target.classList.contains("reg__btn")) {
      const curStep = +e.target.parentElement.dataset.tab;
      document.querySelector(`.reg__tabs-btn[data-tab="${curStep}"]`).classList.add("complete");
    }
    // вставляем +7 если пользователь собирается вводить номер телефона
    if (e.target.getAttribute("id") == "phone") {
      if (e.target.value == "") {
        e.target.value = "+7";
      }
    }
  });
  // слайдер для 5-го шага регистрации
  $(".reg__slider").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    infinity: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          variableWidth: false,
        },
      },
    ],
  });

  if (window.innerWidth < 768) {
    // слайдер для мобильных бадов
    $(".reg__buds-list").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      variableWidth: true,
      infinity: false,
    });
  }
}

if (document.querySelector(".appointment")) {
  // загрузка файлов в регистрации пациента (2-ой шаг)
  const uploadFilesSecondStep = {}; // сюда сохраняем загруженные файлы
  let filesCount = 0;
  document.querySelector("#file").addEventListener("change", function (e) {
    filesCount++;
    // 1) находим загруженный файл и добавляем его в наш объект
    uploadFilesSecondStep[filesCount] = e.target.files[0];
    console.log(uploadFilesSecondStep);
    // 2) заплняем инпут в новом айтеме и в целом подргружаем новый айтем
    const fileName = e.srcElement.files[0].name;
    const fileWidth = window.innerWidth > 768 ? (fileName.length + 1) * 14 : (fileName.length + 1) * 9;
    const filesList = document.querySelector(".reg__file-list");
    console.log(e);
    const html = `
    <div class="reg__file-item" data-file="${filesCount}">
      <img src="./img/reg-icons/reg-file-icon.svg" alt="file icon" class="reg__file-icon" />
      <input type="text" class="reg__file-name" placeholder="Введите название файла" style="width: ${fileWidth}px"/>
      <button class="reg__file-del"></button>  
    </div>
  `;
    filesList.insertAdjacentHTML("beforeend", html);
    const filesInputs = document.querySelectorAll(".reg__file-name");
    filesInputs[filesInputs.length - 1].value = fileName;
  });

  // удаление файла из интерфейса и объекта
  document.querySelector(".reg__file-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("reg__file-del")) {
      const item = e.target.parentElement;
      const itemID = e.target.parentElement.dataset.file;
      delete uploadFilesSecondStep[itemID];
      item.remove();
    }
  });
  const freeDays = [10, 11, 12, 25, 26];
  $(".appointment__datepicker").datepicker({
    showOtherMonths: false,
    weekends: [0],
    onRenderCell: function (date, cellType) {
      if (cellType == "day" && freeDays.indexOf(date.getDate()) != -1) {
        console.log("gg");
        return {
          classes: "disable",
        };
      }
    },
  });

  const calendar = document.querySelectorAll(".datepicker--cell");
  const monthsList = ["Янаварь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  const curMonth = monthsList.indexOf(document.querySelector(".datepicker--nav-title").innerHTML);
  setTimeout(() => {
    calendar.forEach((cell) => {
      if (freeDays.indexOf(+cell.dataset.date) != -1 && cell.dataset.month == curMonth) {
        console.log(cell);
        cell.setAttribute("available", "true");
      }
    });
  }, 1000);

  // активация календарей
  if (window.innerWidth < 768) {
    document.querySelector(".appointment__btn--next[data-tab='6']").classList.remove("appointment__btn--next");
    document.querySelector(".appointment__date").addEventListener("click", function (e) {
      if (e.target.classList.contains("appointment__btn--finish") && document.querySelector(".-selected-")) {
        // показываем время
        if (document.querySelector(".appointment__month.active")) {
          document.querySelector(".appointment__month.active").classList.remove("active");
        }
        document.querySelector(".appointment__wrapper").classList.add("hidden");
        document.querySelector(".appointment__date-mobile").classList.add("active");
        document.querySelector(".appointment__return").classList.add("daysOpen");
        document.querySelector(".appointment__return").innerHTML = "Вернуться к выбору дня";
        // заполняем нужной датой
        const day = document.querySelector(".-selected-");
        const monthsList = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        const monthsListMobile = ["Янаваря", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        const daysOfWeekList = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        const month = monthsList[+day.dataset.month];
        const monthMobile = monthsListMobile[+day.dataset.month];
        const dayOfWeek = daysOfWeekList[+day.dataset.date % 7];
        document.querySelector(".appointment__date-title").innerHTML = "Свободное время " + day.dataset.date + " " + monthMobile + ", " + dayOfWeek.toLowerCase();
        document.querySelectorAll(".appointment__days-time input").forEach((input) => {
          if (input.checked) {
            document.querySelector(".appointment__tabs").classList.remove("active");
            document.querySelector(".appointment__date").classList.remove("active");
            document.querySelector(".appointment__finish").classList.add("active");
            document.querySelector(".appointment__finish-title").classList.add("active");
            document.querySelector(".appointment__preview").classList.remove("active");
            document.querySelector(".appointment").classList.add("appointment--blue");
          }
        });
      }
    });
  } else {
    document.querySelector(".appointment__tabs-content[data-tab='5']").addEventListener("mousedown", function (e) {
      if (e.target.classList.contains("datepicker--cell-day")) {
        document.querySelector(".appointment__days").classList.add("active");
        e.target.closest(".appointment__tabs-content").querySelector(".appointment__btns").classList.add("hidden");
        // заполняем нужной датой
        const day = e.target.innerHTML;
        const monthsList = ["Янаварь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        const monthsListMobile = ["Янаваря", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

        const month = monthsList[+e.target.dataset.month];
        const monthMobile = monthsListMobile[+e.target.dataset.month];
        document.querySelector(`.appointment__days-title`).innerHTML = "Свободное время " + day + " " + monthMobile;
        document.querySelectorAll(".appointment__days-time input").forEach((input) => {
          input.checked = false;
        });
      }
    });
  }

  if (window.innerWidth < 768) {
    $(".appointment__wrapper").slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
    });
  }
}

if (document.querySelector(".general")) {
  // accordeon for general (client profile sub-accordeon)
  document.querySelector(".general__tabs-btns").addEventListener("click", function (e) {
    if (e.target.classList.contains("general__tabs-btn")) {
      const generalTabId = e.target.dataset.general;
      document.querySelector(".general__tabs-content.active").classList.remove("active");
      document.querySelector(".general__tabs-btn.active").classList.remove("active");

      e.target.classList.add("active");
      document.querySelector(`.general__tabs-content[data-general="${generalTabId}"]`).classList.add("active");
      if (document.querySelector(".change")) {
        document.querySelector(".change").classList.remove("change");
        document.querySelector(".general__change").classList.remove("hidden");
      }
    }
  });
  // загрузка файлов в создании новой болезни
  // загрузка файлов в регистрации пациента (2-ой шаг)
  const uploadFilesDisease = {}; // сюда сохраняем загруженные файлы
  let filesCount = 0;
  if (document.querySelector("#file")) {
    document.querySelector("#file").addEventListener("change", function (e) {
      filesCount++;
      // 1) находим загруженный файл и добавляем его в наш объект
      uploadFilesDisease[filesCount] = e.target.files[0];
      console.log(uploadFilesDisease);
      // 2) заплняем инпут в новом айтеме и в целом подргружаем новый айтем
      const fileName = e.srcElement.files[0].name;
      const filesList = document.querySelector(".general__file-list");
      console.log(e);
      const html = `
    <div class="general__file-item" data-file="${filesCount}">
        <img src="./img/reg-icons/reg-file-icon.svg" alt="file icon" class="reg__file-icon" />
        <span class="general__file-name"></span>
    </div>
    `;
      filesList.insertAdjacentHTML("beforeend", html);
      const filesInputs = document.querySelectorAll(".general__file-name");
      filesInputs[filesInputs.length - 1].innerHTML = fileName;
    });
    // удаление файла из интерфейса и объекта
    document.querySelector(".general__file-list").addEventListener("click", function (e) {
      if (e.target.classList.contains("reg__file-icon")) {
        const item = e.target.parentElement;
        const itemID = e.target.parentElement.dataset.file;
        delete uploadFilesSecondStep[itemID];
        item.remove();
      }
    });

    // закрытие и создание новой истории по кнопкам
    document.getElementById("newHistory").addEventListener("click", () => {
      document.querySelector(".general__form--new").classList.add("active");
      document.getElementById("cancelNewHistory").classList.add("active");
    });
    document.getElementById("cancelNewHistory").addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".general__form--new").classList.remove("active");
      document.getElementById("cancelNewHistory").classList.remove("active");
    });
  }

  // выбор активности в общем состоянии
  document.querySelector(".general__stats").addEventListener("click", function (e) {
    if (e.target.classList.contains("general__stat-value--list")) {
      e.target.classList.toggle("active");
    } else if (document.querySelector(".general__stat-value--list.active")) {
      document.querySelector(".general__stat-value--list.active").classList.remove("active");
    }

    if (e.target.classList.contains("general__stat-var")) {
      e.target.parentElement.parentElement.querySelector("span").innerHTML = e.target.innerHTML;
    }
  });

  // открытие настроек порфиля по кнопке
  if (document.querySelector(".general__change--profile")) {
    document.querySelector(".general__change--profile").addEventListener("click", function (e) {
      e.target.classList.toggle("hidden");
      e.target.closest(".general__tabs-content").classList.toggle("change");
    });

    // закрытие настроек порфиля по кнопке
    document.querySelector(".profile__btn--cancel").addEventListener("click", function (e) {
      document.querySelector(".general__tabs-content[data-general='1']").classList.toggle("change");
      document.querySelector(".general__change--profile").classList.toggle("hidden");
    });

    //показать существующий пароль
    document.querySelector(".profile__show").addEventListener("click", function () {
      if (this.parentElement.querySelector("input").getAttribute("type") == "password") {
        this.parentElement.querySelector("input").setAttribute("type", "text");
      } else this.parentElement.querySelector("input").setAttribute("type", "password");
    });
  }

  // добавить жалобу
  document.querySelector(".general__tabs-content[data-general='2']").addEventListener("click", function (e) {
    const setSymptoms = function (symptoms, parent, additional = false, action = "get") {
      if (action === "get") {
        // checking type of incoming array
        let symptomsObject;
        let symptomsString = [];
        if (typeof symptoms[0] === "object") {
          symptomsObject = symptoms;
          symptoms.forEach((el) => {
            symptomsString.push(el.innerHTML);
          });
        } else {
          symptomsString = symptoms;
        }
        // finding parent element
        let symptomsList;
        parent.querySelectorAll(".general__subtitle").forEach((title) => {
          if (title.innerHTML == symptomsString[0]) {
            symptomsList = e.target.parentElement.querySelectorAll(`.general__symptoms[data-symptom="${title.dataset.symptom}"] .general__symptom`);
          }
        });

        if (additional) {
          e.target.parentElement.querySelector(".general__symptoms-list").innerHTML = "";
        }

        // setting all choosed symptoms
        symptomsString.forEach((symptom, i) => {
          if (i != 0) {
            let flag = true;
            symptomsList.forEach((el) => {
              const label = el.querySelector("label");
              const input = el.querySelector("input");
              if (label.innerHTML == symptom) {
                input.checked = true;
                flag = false;
              }
            });

            if (symptom.split(":").length == 2) {
              symptomsList.forEach((el) => {
                const label = el.querySelector("label");
                const input = el.querySelector("input");
                if (label) {
                  if (label.innerHTML == symptom.split(":")[0]) {
                    input.checked = true;
                    flag = false;
                    input.parentElement.querySelector("span").innerHTML = symptom.split(":")[1];
                  }
                }
              });
            }

            // setting additional symptoms
            if (flag && additional) {
              const list = e.target.parentElement.querySelector(".general__symptoms-list");

              const html = `
                <li class="general__symptoms-added">
                  <button class="general__symptoms-delete"></button>
                  <span>${symptom}</span>
                </li>
                `;

              list.insertAdjacentHTML("beforeend", html);
            }
          }
        });

        // if type of array is object then trying to find custom inputs
        if (symptomsObject) {
          symptomsObject.forEach((symptom, i) => {
            if (symptom.classList.value) {
              const customInput = parent.querySelector(`.${symptom.classList.value}-input`);
              const customValue = symptom.querySelector("span").innerHTML;
              customInput.value = customValue;
              if (customInput.parentElement.classList.contains("general__input-wrapper")) {
                customInput.parentElement.querySelector("span").style.left = symptom.querySelector("span").innerHTML.length * 31 + "px";
                customInput.parentElement.querySelector("span").style.color = "#333333";
                customInput.parentElement.querySelector("span").innerHTML = checkNum(+symptom.querySelector("span").innerHTML, true);
              }
            }
          });
        }
      }
    };

    const getSymptoms = function (parent, titleData, additional = false, columnList = false, customData = false) {
      const symptoms = [];
      symptoms.push(parent.querySelector(`.general__subtitle[data-desc='${titleData}']`).innerHTML);

      // getting checked inputs
      parent.querySelectorAll(`.general__subtitle[data-desc='${titleData}'] + .general__symptoms input`).forEach((input) => {
        if (input.checked) {
          const adds = input.parentElement.querySelector("span");
          if (adds) {
            adds.innerHTML != "" ? symptoms.push(input.parentElement.querySelector("label").innerHTML + ": " + adds.innerHTML) : symptoms.push(input.parentElement.querySelector("label").innerHTML);
          } else {
            symptoms.push(input.parentElement.querySelector("label").innerHTML);
          }
        }
      });

      if (additional) {
        parent.querySelectorAll(".general__symptoms-added").forEach((el) => {
          symptoms.push(el.querySelector("span").innerHTML);
        });
      }

      let list;

      if (columnList) {
        list = '<ul class="general__disease-list general__disease-list--column">';
      } else {
        list = '<ul class="general__disease-list">';
      }

      symptoms.forEach((symptom) => {
        const html = `<li>${symptom}</li>`;
        list += html;
      });

      if (customData) {
        parent.querySelectorAll("input[type='text']").forEach((input) => {
          if (input.value) {
            let symptomType;
            input.classList.forEach((name) => {
              if (name.includes("-input")) {
                symptomType = name.slice(0, -6);
              }
            });
            const label = parent.querySelector(`.${symptomType}-label`).innerHTML;
            const html = `<li>${label}: ${input.value}</li>`;
            list += html;
          }
        });

        parent.querySelectorAll("input[type='number']").forEach((input) => {
          if (input.value) {
            let symptomType;
            input.classList.forEach((name) => {
              if (name.includes("-input")) {
                symptomType = name.slice(0, -6);
              }
            });
            const label = parent.querySelector(`.${symptomType}-label`).innerHTML;
            const html = `<li>${label}: ${input.value}</li>`;
            list += html;
          }
        });
      }

      list += "</ul>";

      return list;
    };

    const addSymptomItem = function () {
      let template = `
      <div class="general__disease-item">
        <div class="general__disease-title">Жалоба №1</div>
        <div class="general__disease-date">От 20.06.2021</div>
        <div class="general__disease-inner">
      `;

      const parent = e.target.closest(".general__disease");
      template += getSymptoms(parent, "symptoms", true);
      template += getSymptoms(parent, "menSymptoms");
      template += getSymptoms(parent, "anotherSymptoms", false, true, true);
      template += `
        <div class="general__change-wrapper">
        <div class="general__subtitle general__symptoms-title subtitle active" data-symptom="1" data-desc="symptoms">Симптомы</div>
        <form action="" class="general__symptoms active" data-symptom="1">
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Слабость</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Недостаточная концентрация внимания</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Снижение энергии</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Инфекции чаще 1 раза в 4 месяц</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Повышенная утомляемость</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Сухость кожи</label>
            <div class="general__symptom-choose">
              <span></span>
              <ul class="general__symptom-list">
                <li class="general__symptom-item">Голова</li>
                <li class="general__symptom-item">Руки</li>
                <li class="general__symptom-item">Локти</li>
                <li class="general__symptom-item">Лицо</li>
              </ul>
            </div>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Головные боли</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Волосы</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Раздражительность</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Трудности проглатывания твердой пищи</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Перепады настроения</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Проблемы со стулом</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Головокружение, шум в ушах</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Вздутие, изжога, тяжесть в желудке</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Депрессивное настроение</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Беспокойный сон, подъем ночью в туалет</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Снижение трудоспособности</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Отеки</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Одышка, сердцебиение</label>
          </div>
          <div class="general__symptoms-add">
            <button class="general__symptoms-btn">Добавить симптом</button>
            <input type="text" class="general__symptoms-input" placeholder="Введите симптом">
            <ul class="general__symptoms-list">
            </ul>
          </div>
        </form>
        <div class="general__subtitle general__symptoms-title subtitle" data-symptom="2" data-desc="menSymptoms">Мужское здоровье</div>
        <form action="" class="general__symptoms general__symptoms--man" data-symptom="2">
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Утренняя эррекция</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Снижено либидо</label>
          </div>
          <div class="general__symptom">
            <input type="checkbox" class="general__checkbox" />
            <label for="" class="general__checkbox-label">Проблемы с эррекцией во время полового акта</label>
          </div>
        </form>
        <div class="general__subtitle general__symptoms-title subtitle" data-symptom="3" data-desc="anotherSymptoms">Прочее</div>
        <form action="" class="general__symptoms general__symptoms--more" data-symptom="3">
          <div class="general__col">
            <label for="" class="general__input-label allergic-label">Аллергические реакции</label>
            <input type="text" class="general__input allergic-input" placeholder="Перечислите" />
            <label for="" class="general__input-label diagnoses-label">Установленные диагнозы</label>
            <input type="text" class="general__input diagnoses-input" placeholder="Перечислите" />
            <label for="" class="general__input-label operations-label">Проведенные операции</label>
            <input type="text" class="general__input operations-input" placeholder="Перечислите" />
            <div class="general__symptom">
              <input type="checkbox" class="general__checkbox" />
              <label for="" class="general__checkbox-label">Тяга к сладкому</label>
            </div>
            <div class="general__symptom">
              <input type="checkbox" class="general__checkbox" />
              <label for="" class="general__checkbox-label">Тяга к соленому</label>
            </div>
            <div class="general__symptom">
              <input type="checkbox" class="general__checkbox" />
              <label for="" class="general__checkbox-label">Контакты с животными</label>
            </div>
          </div>
          <div class="general__col">
            <div class="general__input-wrapper">
              <span>раз</span>
              <label for="" class="general__input-label eatingNum-label">Количество приемов пищи в день</label>
              <input type="number" class="general__input eatingNum-input" />
            </div>
            <div class="general__input-wrapper">
              <span>раз</span>
              <label for="" class="general__input-label snacksNum-label">Количество перекусов в день</label>
              <input type="number" class="general__input snacksNum-input" />
            </div>
            <div class="general__input-wrapper">
              <span>мл.</span>
              <label for="" class="general__input-label waterNum-label">Объем потреблемой воды</label>
              <input type="number" class="general__input waterNum-input" />
            </div>
            <div class="general__input-wrapper">
              <span>мл.</span>
              <label for="" class="general__input-label coffeeNum-label">Количество кофе в рационе</label>
              <input type="number" class="general__input coffeeNum-input" />
            </div>
          </div>
        </form>
        <div class="profile__btns">
          <button class="profile__btn profile__btn--save btn" type="submit">
            <span>Сохранить</span>
          </button>
          <button class="profile__btn profile__btn--cancel btn btn--stroke" type="submit">
            <span>Отменить</span>
          </button>
        </div>
      </div>
      
      <button class="general__change">Редактировать</button>
    </div>
  </div>
      `;
      document.getElementById("yourSymptoms").insertAdjacentHTML("afterend", template);
      document.querySelectorAll("input:checked").forEach((input) => (input.checked = "false"));
      document.querySelectorAll("input").forEach((input) => (input.value = ""));
      document.querySelectorAll("input[type='number']").forEach((input) => {
        input.parentElement.querySelector("span").style.left = "20px";
      });
    };

    if (e.target.classList.contains("general__btn--add")) {
      document.querySelector(".general__disease").classList.add("active");
    }

    if (e.target.classList.contains("general__disease-title")) {
      e.target.closest(".general__disease-item").classList.toggle("active");
      const item = e.target.closest(".general__disease-item").querySelector(".general__disease-inner");
      $(item).slideToggle();
    }

    if (e.target.classList.contains("general__save")) {
      addSymptomItem();
      e.target.closest(".general__disease").classList.remove("active");
    }

    if (e.target.classList.contains("general__change")) {
      e.target.closest(".general__disease-item").classList.add("change");
      const symptoms = [];
      const menSymptoms = [];
      const anotherSymptoms = [];
      e.target.parentElement.querySelectorAll(".general__disease-list:first-child li").forEach((el) => symptoms.push(el.innerHTML));
      e.target.parentElement.querySelectorAll(".general__disease-list:nth-child(2) li").forEach((el) => menSymptoms.push(el.innerHTML));
      e.target.parentElement.querySelectorAll(".general__disease-list--column li").forEach((el) => anotherSymptoms.push(el));
      let parent = e.target.closest(".general__disease-item");
      // вводим данный в редактированную форму
      setSymptoms(symptoms, parent, true);
      setSymptoms(menSymptoms, parent);
      setSymptoms(anotherSymptoms, parent);
    }

    if (e.target.classList.contains("profile__btn--save")) {
      const parent = e.target.parentElement.parentElement;
      e.target
        .closest(".general__disease-inner")
        .querySelectorAll(".general__disease-list")
        .forEach((list) => list.remove());

      // anotherSymptoms
      e.target.closest(".general__disease-inner").insertAdjacentHTML("afterbegin", getSymptoms(parent, "anotherSymptoms", false, true, true));
      // symptoms
      e.target.closest(".general__disease-inner").insertAdjacentHTML("afterbegin", getSymptoms(parent, "menSymptoms"));
      // menSymptoms
      e.target.closest(".general__disease-inner").insertAdjacentHTML("afterbegin", getSymptoms(parent, "symptoms", true));

      e.target.closest(".general__disease-item").classList.toggle("change");
    }

    if (e.target.classList.contains("profile__btn--cancel")) {
      e.target.closest(".general__disease-item").classList.toggle("change");
    }

    if (e.target.classList.contains("general__symptom-choose")) {
      e.target.classList.toggle("active");
    }

    if (e.target.classList.contains("general__symptom-item")) {
      e.target.closest(".general__symptom-choose").classList.toggle("active");
      e.target.closest(".general__symptom-choose").querySelector("span").innerHTML = e.target.innerHTML;
    }

    // added custom symptom
    if (e.target.classList.contains("general__symptoms-btn")) {
      e.preventDefault();
      const input = e.target.parentElement.querySelector(".general__symptoms-input");
      input.classList.add("active");
      input.focus();
    }

    if (e.target.classList.contains("general__symptoms-delete")) {
      e.preventDefault();
      e.target.parentElement.remove();
    }
  });

  document.querySelectorAll(".general__symptoms-input").forEach((input) => {
    input.addEventListener("keyup", function (e) {
      const list = this.parentElement.querySelector(".general__symptoms-list");
      console.log(e.code);
      if (e.code === "Enter") {
        if (e.target.value === "" || e.target.value === " ") {
          e.target.classList.remove("active");
        } else {
          const html = `
          <li class="general__symptoms-added">
          <button class="general__symptoms-delete"></button>
          <span>${e.target.value}</span>
        </li>
        `;

          list.insertAdjacentHTML("beforeend", html);

          e.target.value = "";
          e.target.classList.remove("active");
        }
      }
    });
  });

  // аккордеон для историй болезни
  document.querySelectorAll(".general__history-name").forEach((history) => {
    history.addEventListener("click", function () {
      this.parentElement.classList.toggle("active");
    });
  });

  // редактирование болезни
  document.querySelector(".general__tabs-content[data-general='3']").addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("general__change")) {
      e.target.closest(".general__history").classList.add("change");
    }

    if (e.target.classList.contains("general__btn--cancel")) {
      e.target.closest(".general__history").classList.remove("change");
    }

    if (e.target.classList.contains("general__save")) {
      e.target.closest(".general__history").classList.remove("change");
    }
  });

  // кастомизация календаря
  $(".tasks__datepicker").datepicker({
    showOtherMonths: false,
    weekends: [0],
  });

  // динамичный инпут с мл. и раз
  const inputElements = document.querySelectorAll(".general__input");

  inputElements.forEach((input) =>
    input.addEventListener("input", () => {
      const width = getTextWidth(input.value, "24px arial");
      if (input.parentElement.classList.contains("general__input-wrapper")) {
        input.parentElement.querySelector("span").style.left = width + 18 + "px";
        input.parentElement.querySelector("span").style.color = "#333333";
      }

      input.parentElement.querySelector("span").innerHTML = checkNum(input);
    })
  );

  function checkNum(input, num = false) {
    let number;
    if (num) {
      number = +input;
    } else {
      number = +input.value;
    }
    let value;
    switch (number % 10) {
      case 1:
        value = "раз";
        break;

      case 2:
        value = "раза";
        break;

      case 3:
        value = "раза";
        break;

      case 4:
        value = "раза";
        break;

      default:
        value = "раз";
        break;
    }

    switch (number) {
      case 12:
        value = "раз";
        break;

      case 13:
        value = "раз";
        break;

      case 14:
        value = "раз";
        break;
    }

    return value;
  }

  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }

  // при каком либо изменении историии болезни убираем класс у кнопки Применить
  const historyInputs = document.querySelectorAll(".general__form .general__input");
  historyInputs.forEach((input) =>
    input.addEventListener("input", () => {
      input.parentElement.querySelector(".general__save").classList.remove("btn--inactive");
    })
  );
  if (document.querySelector(".general__symptoms")) {
    // добавляем воозможность выбрать уточнение для жалобы (список)
    document.querySelector(".general__symptoms").addEventListener("click", function (e) {});
  }

  // переключение на все задачи по ссылке
  if (document.querySelector(".tasks__all")) {
    document.querySelector("#allTasks").addEventListener("click", function () {
      document.querySelector(".tabs__item.active").classList.remove("active");
      document.querySelector(".general__tabs-content.active").classList.remove("active");
      document.querySelector(".general__tabs-btns.active").classList.remove("active");
      document.querySelector(".tasks__all").classList.add("active");
      document.querySelector(".tasks__tabs-btn[data-tasks='1']").classList.add("active");
      document.querySelector(".tasks__list[data-tasks='1']").classList.add("active");
      this.closest(".tasks").classList.add("doctor");
    });

    // переключение на мобилке
    document.querySelector(".tasksMobile").addEventListener("click", function () {
      if (document.querySelector(".tabs__item.active")) {
        document.querySelector(".tabs__item.active").classList.remove("active");
      }
      document.querySelector(".content-block__inner.active").classList.remove("active");
      document.querySelector(".content-block__inner--general").classList.add("active");
      if (document.querySelector(".general__tabs-content.active")) {
        document.querySelector(".general__tabs-content.active").classList.remove("active");
        document.querySelector(".general__tabs-btns.active").classList.remove("active");
      }

      document.querySelector(".tasks__all").classList.add("active");
      document.querySelector(".tasks__tabs-btn[data-tasks='1']").classList.add("active");
      document.querySelector(".tasks__list[data-tasks='1']").classList.add("active");
    });

    // табы для задача (сегодня, на неделю)
    document.querySelector(".tasks__all").addEventListener("click", function (e) {
      if (e.target.classList.contains("tasks__tabs-btn")) {
        const curTab = e.target.dataset.tasks;
        document.querySelector(".tasks__tabs-btn.active").classList.remove("active");
        e.target.classList.add("active");
        document.querySelector(".tasks__list.active").classList.remove("active");
        document.querySelector(`.tasks__list[data-tasks="${curTab}"]`).classList.add("active");
      }
    });
  }

  if (window.innerWidth < 768) {
    // аккордеон для жалоб на мобилке
    document.querySelector(".general__tabs-content[data-general='2']").addEventListener("click", function (e) {
      if (e.target.classList.contains("general__symptoms-subtitle")) {
        document.querySelector(`.general__symptoms[data-symptom="${e.target.dataset.symptom}"]`).classList.toggle("active");
        e.target.classList.toggle("active");
      }
    });
    // слайдер анализов на мобилке
    $(".tests__list").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
      adaptiveHeight: true,
    });

    // слайдер бадов на мобилке
    $(".recommendations__buds-list").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
      variableWidth: true,
    });

    // слайдер табов (общее, анализы и тд)
    $(".tabs__list").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      variableWidth: true,
    });

    // слайдер симптомов
    concatForSlides(10, "general__symptoms[data-symptom='1'] .general__symptom", "general__symptom-slide", "general__symptoms[data-symptom='1']");
    $(".general__symptoms[data-symptom='1']").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: true,
      arrows: false,
    });

    // слайдер рекомендаций от доктора
    $(".recommendations__slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: true,
      arrows: false,
    });

    // слайдер Подходящие вам статьи
    $(".recommendations__maybe .articles__all").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: true,
      arrows: false,
    });

    /* // слайдер Может вам понравятся статьи
    $(".useful__maybe .articles__all").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
    }); */
  }
}

if (document.querySelector(".tabs__list")) {
  // после нажатия на все задачи убираем active у вкладки общее, и после при клике на
  // различные главные табы по кд убираем классы у tasks__all
  document.querySelector(".tabs__list").addEventListener("click", function (e) {
    if (e.target.classList.contains("tabs__item")) {
      const curTab = e.target.dataset.tab;
      // убираем старые классы а так же классы у tasks__all
      if (document.querySelector(".tabs__item.active")) {
        document.querySelector(".tabs__item.active").classList.remove("active");
      }
      document.querySelector(".content-block__inner.active").classList.remove("active");
      if (document.querySelector(".tasks__all.active")) {
        document.querySelector(".tasks__all.active").classList.remove("active");
        document.querySelector(".tasks__tabs-btn.active").classList.remove("active");
        document.querySelector(".tasks__list.active").classList.remove("active");
        document.querySelector(".tasks").classList.remove("doctor");
      }

      e.target.classList.add("active");
      const newContent = document.querySelector(`.content-block__inner[data-tab="${curTab}"]`);
      newContent.classList.add("active");
      if (newContent.querySelector(".general__tabs-btns")) {
        newContent.querySelector(".general__tabs-btns").classList.add("active");
        newContent.querySelectorAll(".general__tabs-btn").forEach((btn) => btn.classList.remove("active"));
        newContent.querySelectorAll(".general__tabs-content").forEach((content) => content.classList.remove("active"));
        newContent.querySelector('.general__tabs-btn[data-general="1"]').classList.add("active");
        newContent.querySelector('.general__tabs-content[data-general="1"]').classList.add("active");
      }
    }
  });
}

if (document.getElementById("price")) {
  // слайдер цен для поиска врачей по нужной стоимости
  const priceSlider = document.getElementById("price");

  noUiSlider.create(priceSlider, {
    start: [0, 5000],
    behaviour: "snap",
    connect: true,
    range: {
      min: 0,
      max: 5000,
    },
    format: {
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return parseInt(value);
      },
    },
  });
  // собираем данные со слайдеров при изменении значения на них
  const priceFrom = document.querySelector(".search__input-from input");
  const priceTo = document.querySelector(".search__input-to input");
  [priceFrom.value, priceTo.value] = [0, 5000];
  priceSlider.noUiSlider.on("slide", function (value) {
    [priceFrom.value, priceTo.value] = value;
  });
  // изменяем слайдер при изменении значений инпутов
  document.addEventListener("keyup", function () {
    priceSlider.noUiSlider.set([priceFrom.value, priceTo.value]);
  });

  const filterResults = function () {
    // проверяем фильтры
    let filters = {
      exp1To5: false,
      exp5To10: false,
      expMore10: false,
      male: false,
      female: false,
      ageLess30: false,
      age30To50: false,
      ageMore50: false,
    };
    document.querySelectorAll(".search__checkbox input").forEach((box) => {
      if (box.checked) {
        filters[box.dataset.doctor] = true;
      }
    });
    // создаем нужный селектор
    let curCards = ".search__card";
    for (filter in filters) {
      if (filters[filter] == true) {
        curCards += "." + filter;
      }
    }
    // убираем все карточки
    document.querySelectorAll(".search__card").forEach((card) => card.classList.add("hidden"));
    // показываем нужные карточки
    document.querySelectorAll(curCards).forEach((card) => {
      // проверяем выбранную диапазон цен
      if (card.dataset.price > priceFrom.value && card.dataset.price < priceTo.value) card.classList.remove("hidden");
    });
  };

  // обнуление фильтров
  document.querySelector(".search__reset").addEventListener("click", () => {
    // показываем всех докторов
    document.querySelectorAll(".search__card.hidden").forEach((card) => {
      card.classList.remove("hidden");
    });
    // обнуляем фильтры
    $("input[type=checkbox]").prop("checked", false);
    // обнуляем слайдер и цену
    priceSlider.noUiSlider.set([0, 5000]);
    [priceFrom.value, priceTo.value] = [0, 5000];
  });

  // фильтрация по нажатию на кнопку
  document.querySelector(".search__filter-btn").addEventListener("click", function (e) {
    e.preventDefault();
    filterResults();
  });

  // фильтрация по популярности и тд (только внешне)
  document.querySelector(".search__sort").addEventListener("click", function (e) {
    if (e.target.classList.contains("search__sort-choosed")) {
      e.target.classList.toggle("active");
    }
    if (e.target.classList.contains("search__sort-item")) {
      e.target.closest(".search__sort-choosed").querySelector("span").innerHTML = e.target.innerHTML;
      e.target.closest(".search__sort-choosed").classList.remove("active");
    }
  });

  // добавление функционала для Читать полностью
  document.querySelector(".search__results").addEventListener("click", function (e) {
    if (e.target.classList.contains("search__card-more")) {
      const content = "Диагностирую, предупреждаю и лечу патологии головного и спинного мозга, нервных окончаний и заболеваний влияющих на нервную систему. Окончила Московский государственный университет имени Ленина и Сталина";
      e.target.closest(".search__card").querySelector(".search__card-text").innerHTML = content;
      e.target.remove();
    }
  });
}

if (document.querySelector(".doctor__info")) {
  $(".doctor__info-slider").slick({
    infinity: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    arrows: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  // открытие настроек порфиля по кнопке
  document.querySelector(".doctor__change--profile").addEventListener("click", function (e) {
    e.target.classList.toggle("hidden");
    e.target.closest(".doctor__tabs-content").classList.toggle("change");
    if (e.target.closest(".doctor__tabs-content").classList.contains("change")) {
      document.querySelector(".general__file-list").innerHTML = "";
    }
  });

  // закрытие настроек порфиля по кнопке
  document.querySelector(".profile__btn--cancel").addEventListener("click", function (e) {
    document.querySelector(".doctor__tabs-content").classList.toggle("change");
    document.querySelector(".doctor__change--profile").classList.toggle("hidden");
  });

  //показать существующий пароль
  document.querySelector(".profile__show").addEventListener("click", function () {
    if (this.parentElement.querySelector("input").getAttribute("type") == "password") {
      this.parentElement.querySelector("input").setAttribute("type", "text");
    } else this.parentElement.querySelector("input").setAttribute("type", "password");
  });
  document.querySelectorAll(".slick-dots button").forEach((btn) => (btn.innerHTML = " "));

  // accordeon for doctor-info
  if (document.querySelector(".doctor__tabs-btns")) {
    document.querySelector(".doctor__tabs-btns").addEventListener("click", function (e) {
      if (e.target.classList.contains("doctor__tabs-btn")) {
        const infoTabId = e.target.dataset.info;
        document.querySelector(".doctor__tabs-content.active").classList.remove("active");
        document.querySelector(".doctor__tabs-btn.active").classList.remove("active");

        e.target.classList.add("active");
        document.querySelector(`.doctor__tabs-content[data-info="${infoTabId}"]`).classList.add("active");
      }
    });

    // block or list view for doctor__clients
    document.querySelector(".doctor__clients-view").addEventListener("click", function (e) {
      if (e.target.classList.contains("block")) {
        e.target.classList.remove("active");
        document.querySelector(".doctor__clients-view .list").classList.add("active");
        document.querySelector(".doctor__clients-wrapper").classList.add("active");
        document.querySelectorAll(".doctor__clients-wrapper .doctor__wrapper").forEach((client) => {
          client.classList.add("block");
        });
      }
      if (e.target.classList.contains("list")) {
        e.target.classList.remove("active");
        document.querySelector(".doctor__clients-view .block").classList.add("active");
        document.querySelector(".doctor__clients-wrapper").classList.remove("active");
        document.querySelectorAll(".doctor__clients-wrapper .doctor__wrapper").forEach((client) => {
          client.classList.remove("block");
        });
      }
    });

    document.querySelector(".doctor__requests").addEventListener("click", function (e) {
      if (e.target.classList.contains("doctor__requests-more")) {
        e.target.closest(".doctor__requests-text").innerHTML = "Здравствуйте! Беспокоит сильная боль в желудке каждое утро. Рацион у меня обыкновенный, никаких особых препаратов не принимаю, год назад была операция, а сейчас все топчик! :)";
        e.target.remove();
      }
    });
  }
  // смотерть весь отзыв
  document.querySelector(".doctor__reviews").addEventListener("click", function (e) {
    if (e.target.classList.contains("doctor__reviews-more")) {
      e.target.closest(".doctor__reviews-item").querySelector(".doctor__reviews-text").innerHTML = "Здравствуйте! Хочу выразить огромную благодарность талантливейшему врачу Елене Петровне! С самого начала Елена Петровна очень ответственно отнеслась к моей проблеме по серьезке и теперь все топчик :)";
      e.target.remove();
    }
  });

  const uploadFilesDisease = {}; // сюда сохраняем загруженные файлы
  let filesCount = 0;
  if (document.querySelector("#file")) {
    document.querySelector("#file").addEventListener("change", function (e) {
      filesCount++;
      // 1) находим загруженный файл и добавляем его в наш объект
      uploadFilesDisease[filesCount] = e.target.files[0];
      console.log(uploadFilesDisease);
      // 2) заплняем инпут в новом айтеме и в целом подргружаем новый айтем
      const fileName = e.srcElement.files[0].name;
      const filesList = document.querySelector(".general__file-list");
      console.log(e);
      const html = `
    <div class="general__file-item" data-file="${filesCount}">
        <img src="./img/reg-icons/reg-file-icon.svg" alt="file icon" class="reg__file-icon" />
        <span class="general__file-name"></span>
    </div>
    `;
      filesList.insertAdjacentHTML("beforeend", html);
      const filesInputs = document.querySelectorAll(".general__file-name");
      filesInputs[filesInputs.length - 1].innerHTML = fileName;
    });
    // удаление файла из интерфейса и объекта
    document.querySelector(".general__file-list").addEventListener("click", function (e) {
      if (e.target.classList.contains("reg__file-icon")) {
        const item = e.target.parentElement;
        const itemID = e.target.parentElement.dataset.file;
        delete uploadFilesSecondStep[itemID];
        item.remove();
      }
    });
  }
}

if (document.querySelector(".tests__add")) {
  // выбираем что назаначить пациенту
  document.querySelectorAll(".tests__add").forEach((add) =>
    add.addEventListener("click", function (e) {
      add.classList.toggle("active");
      if (e.target.classList.contains("tests__add-option")) {
        add.querySelector("span").innerHTML = e.target.innerHTML;
        if (e.target.closest(".tests__card").querySelector("div.active")) {
          e.target.closest(".tests__card").querySelector("div.active").classList.remove("active");
        }
        add.closest(".tests__card").querySelector(`div[data-add="${e.target.dataset.add}"]`).classList.add("active");
      }
    })
  );

  // добавляем рекомендацию не из списка а по нажатию Enter
  document.querySelector(".tests__meals-input").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      document.querySelector(".tests__meals-choosed").classList.remove("active");
      document.querySelector(".tests__meals-list").classList.remove("active");
      const recommendation = `<div class="tests__meals-item">${document.querySelector(".tests__meals-input").value}<span class="delete"></span></div>`;
      document.querySelector(".tests__meals-recommendations").insertAdjacentHTML("beforeend", recommendation);
      document.querySelector(".tests__meals-input").value = "";
      // также выводим заголовок для этого списка "Вы рекумендуете"
      e.target.closest(".tests__meals").querySelector(".tests__meals-subtitle").classList.add("active");
    }
  });

  // удаляем элементы при нажатии на крестик
  document.querySelector(".tests__meals-recommendations").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
    }
  });

  // выбор анализов
  document.querySelector(".tests").addEventListener("click", function (e) {
    if (e.target.classList.contains("tests__analyzes-choosed")) {
      e.target.querySelector("ul").classList.toggle("active");
    } else {
      document.querySelectorAll(".tests__analyzes-choosed ul.active").forEach((list) => list.classList.remove("active"));
    }
    if (e.target.classList.contains("tests__add")) {
      e.target.classList.add("active");
    } else {
      document.querySelectorAll(".tests__add").forEach((el) => el.classList.remove("active"));
    }

    if (e.target.classList.contains("tests__analyzes-option")) {
      e.target.closest("ul").classList.toggle("active");
      const curCard = e.target.closest(".tests__card");
      console.log(curCard.querySelector(`.tests__analyzes-list.active`));
      curCard.querySelector(".tests__analyzes-choosed span").innerHTML = e.target.innerHTML;
      curCard.querySelector(`.tests__analyzes-list.active`).classList.remove("active");
      curCard.querySelector(`.tests__analyzes-list[data-analyze="${e.target.dataset.analyze}"]`).classList.add("active");
    }
    // добавляем рекомендации по питанию
    if (e.target.classList.contains("tests__meals-input")) {
      e.target.closest(".tests__meals-choosed").classList.toggle("active");
      e.target.closest(".tests__meals-choosed").querySelector(".tests__meals-list").classList.toggle("active");
    } else {
      document.querySelectorAll(".tests__meals-choosed").forEach((input) => {
        input.classList.remove("active");
        input.querySelector("ul").classList.remove("active");
      });
    }
    if (e.target.classList.contains("tests__meals-option")) {
      e.target.closest(".tests__meals-list").classList.remove("active");
      e.target.closest(".tests__meals-choosed").querySelector(".tests__meals-input").value = e.target.innerHTML;
      const recommendation = `<div class="tests__meals-item">${e.target.innerHTML}<span class="delete"></span></div>`;
      e.target.closest(".tests__meals-wrapper").querySelector(".tests__meals-recommendations").insertAdjacentHTML("beforeend", recommendation);
      e.target.closest(".tests__meals-choosed").querySelector(".tests__meals-input").value = "";
      // также выводим заголовок для этого списка "Вы рекумендуете"
      e.target.closest(".tests__meals").querySelector(".tests__meals-subtitle").classList.add("active");
    }
  });

  // добавляем Назначено при выборе ckeckbox
  document.querySelector(".tests__analyzes-btn").addEventListener("click", function (e) {
    document.querySelectorAll(".tests__analyzes-selected span").forEach((span) => span.remove());
    document.querySelectorAll(".tests__analyzes-checkbox:checked").forEach((box) => {
      document.querySelector(".tests__analyzes-selected").insertAdjacentHTML("beforeend", `<span>${box.parentElement.querySelector("span").innerHTML}</span>`);
    });
  });

  // добавляем переход на реккомендации при нажатии на болезни пациента
  document.querySelector(".general__for-doctor").addEventListener("click", function (e) {
    if (e.target.classList.contains("general__for-doctor-rec")) {
      document.querySelector(".tabs__item.active").classList.remove("active");
      document.querySelector(".content-block__inner.active").classList.remove("active");
      document.querySelector(`.content-block__inner[data-tab="3"]`).classList.add("active");
      document.querySelector(`.tabs__item[data-tab="3"]`).classList.add("active");
    }
  });
  if (window.innerWidth < 768) {
    document.querySelectorAll(".tests__analyzes-list").forEach((list) => {
      let items;
      let parent;
      let itemsNumPerSlide = 8;
      items = list.querySelectorAll(".tests__analyzes-item");
      parent = list;
      const slides = Math.ceil(items.length / itemsNumPerSlide);
      for (let slideNum = 0; slideNum < slides; slideNum++) {
        const slide = document.createElement("div");
        slide.classList.add("tests__analyzes-slide");
        for (let itemNum = 0 + itemsNumPerSlide * slideNum; itemNum < itemsNumPerSlide + itemsNumPerSlide * slideNum + 1; itemNum++) {
          if (itemNum < items.length) {
            slide.appendChild(items[+itemNum]);
          }
        }
        parent.appendChild(slide);
      }
      $(list).slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        swipe: false,
        prevArrow: `<button type="button" class="slick-prev"><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.79387 1L2 8.89559L10 17" stroke="#FE9393" stroke-width="1.6" stroke-linecap="round"/></svg></button>`,
        nextArrow: `<button type="button" class="slick-next"><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20613 17L9 9.10441L0.999999 1" stroke="#FE9393" stroke-width="1.6" stroke-linecap="round"/></svg></button>`,
      });
    });
    $(".tests").slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
    });
  }
}

if (document.querySelector(".appointment")) {
  document.querySelector(".appointment").addEventListener("click", function (e) {
    const curTab = +e.target.dataset.tab;
    if (e.target.classList.contains("appointment__tabs-btn")) {
      document.querySelector(".appointment__tabs-btn.active").classList.remove("active");
      e.target.classList.add("active");
      document.querySelector(".appointment__tabs-content.active").classList.remove("active");
      document.querySelector(`.appointment__tabs-content[data-tab="${curTab}"]`).classList.add("active");
    }
    if (e.target.classList.contains("appointment__btn--next")) {
      document.querySelector(".appointment__tabs-btn.active").classList.remove("active");
      document.querySelector(".appointment__tabs-content.active").classList.remove("active");
      document.querySelector(`.appointment__tabs-btn[data-tab="${curTab}"]`).classList.add("complete");
      document.querySelector(`.appointment__tabs-btn[data-tab="${curTab + 1}"]`).classList.add("active");
      document.querySelector(`.appointment__tabs-btn[data-tab="${curTab + 1}"]`).classList.remove("disable");
      document.querySelector(`.appointment__tabs-content[data-tab="${curTab + 1}"]`).classList.add("active");
    }

    if (e.target.classList.contains("appointment__btn--back")) {
      document.querySelector(".appointment__tabs-btn.active").classList.remove("active");
      document.querySelector(".appointment__tabs-content.active").classList.remove("active");
      document.querySelector(`.appointment__tabs-btn[data-tab="${curTab - 1}"]`).classList.add("active");
      document.querySelector(`.appointment__tabs-content[data-tab="${curTab - 1}"]`).classList.add("active");

      if (document.querySelector(".appointment__days.active")) {
        document.querySelector(".appointment__days").classList.remove("active");
        document.querySelector(".-selected-").classList.remove("-selected-");
        document.querySelector(`.appointment__tabs-content[data-tab="5"] .hidden`).classList.remove("hidden");
      }
    }

    if (e.target.classList.contains("appointment__btn--finish")) {
      document.querySelector(".appointment__tabs").classList.remove("active");
      let data = document.querySelector(".appointment__days-title").innerHTML.split(" ").slice(-2).join(" ");
      data += ", " + document.querySelector(".appointment__days-time input:checked + div").innerHTML;
      document.querySelector(".appointment__finish-time").innerHTML = data;
      document.querySelector(".appointment__finish").classList.add("active");
      document.querySelector(".appointment__finish-title").classList.add("active");
      document.querySelector(".appointment__days").classList.remove("active");
    }

    if (e.target.classList.contains("appointment__return")) {
      if (window.innerWidth < 768) {
        if (e.target.classList.contains("daysOpen")) {
          document.querySelector(".appointment__date-mobile").classList.remove("active");
          document.querySelector(".appointment__wrapper").classList.remove("hidden");
          document.querySelectorAll(".appointment__days-time input").forEach((input) => {
            input.checked = false;
          });
          document.querySelector(".appointment__date-title").innerHTML = "Свободные дни для записи";
          e.target.innerHTML = "Вернуться к анкете";
          e.target.classList.remove("daysOpen");
        } else {
          document.querySelector(".appointment__tabs").classList.add("active");
          document.querySelector(".appointment__date").classList.remove("active");
          document.querySelector(".appointment__tabs-btn[data-tab='5']").classList.add("active");
          document.querySelector(".appointment__tabs-content[data-tab='5']").classList.add("active");
          document.querySelector(".appointment__month.active").classList.remove("active");
        }
      } else {
        document.querySelector(".appointment__tabs").classList.add("active");
        document.querySelector(".appointment__date").classList.remove("active");
        document.querySelector(".appointment__tabs-btn[data-tab='5']").classList.add("active");
        document.querySelector(".appointment__tabs-content[data-tab='5']").classList.add("active");
        document.querySelector(".appointment__month.active").classList.remove("active");
      }
    }
    if (document.querySelector(".hasDiagnose:checked")) {
      document.querySelector(".hasDiagnoseInput").classList.add("active");
    } else {
      document.querySelector(".hasDiagnoseInput").classList.remove("active");
    }

    if (window.innerWidth < 768) {
      // возвращение на шаг назад на мобилке
      if (e.target.classList.contains("appointment__back-mobile")) {
        const curStep = e.target.closest(".appointment__tabs-content");
        const curStepNum = curStep.dataset.tab;
        curStep.classList.remove("active");
        document.querySelector(`.appointment__tabs-content[data-tab="${+curStepNum - 1}"]`).classList.add("active");
      }
    }
  });
  if (window.innerWidth < 768) {
    // мобильный слайдер для выбора "с чем хотите разобраться" (шаг 3 из 5)
    concatForSlides(5, "appointment__list-item", "appointment__list-slide", "appointment__list");
    $(".appointment__list").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      dots: true,
      arrows: false,
    });
  }
}

if (document.querySelector(".contacts__form-choose")) {
  document.querySelector(".contacts__form-choose").addEventListener("click", function (e) {
    document.querySelector(".contacts__form-choose").classList.toggle("active");
    document.querySelector(".contacts__form-list").classList.toggle("active");
    if (e.target.classList.contains("contacts__form-item")) {
      document.querySelector(".contacts__form-choose span").innerHTML = e.target.innerHTML;
    }
  });
}

if (document.querySelector(".docs")) {
  document.querySelector(".docs").addEventListener("click", function (e) {
    if (e.target.classList.contains("docs__accordeon-title")) {
      e.target.parentElement.classList.toggle("active");
    }
  });
}

if (document.querySelector(".popup")) {
  document.querySelector(".popup__notice").addEventListener("click", function (e) {
    if (e.target.classList.contains("popup__btn")) {
      const curTab = e.target.dataset.popup;
      if (curTab == "add") {
        e.target.closest(".popup__slide").classList.remove("active");
        document.querySelector(`.popup__slide[data-popup="add"]`).classList.add("active");
      } else if (+curTab != 3) {
        e.target.closest(".popup__slide").classList.remove("active");
        document.querySelector(`.popup__slide[data-popup="${+curTab + 1}"]`).classList.add("active");
      } else {
        document.querySelector(".popup__notice").classList.remove("active");
        document.querySelector(".layer").classList.remove("active");
      }
    }
    if (e.target.classList.contains("popup__close")) {
      document.querySelector(".popup__notice").classList.remove("active");
      document.querySelector(".layer").classList.remove("active");
    }
  });
  document.querySelector(".layer").addEventListener("click", function (e) {
    document.querySelector(".popup__notice").classList.remove("active");
    document.querySelector(".layer").classList.remove("active");
  });

  if (document.querySelector(".popup__rating")) {
    document.querySelector(".popup__rating").addEventListener("click", function (e) {
      if (e.target.classList.contains("popup__star")) {
        if (document.querySelector(".popup__star.active")) {
          document.querySelectorAll(".popup__star.active").forEach((star) => star.classList.remove("active"));
        }
        e.target.classList.add("active");
      }
    });
  }
}

if (document.querySelector(".articles")) {
  if (window.innerWidth < 768) {
    $(".articles__tags-list").slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      variableWidth: true,
    });
  }
}

if (document.querySelector(".search__search")) {
  if (window.innerWidth < 768) {
    $(".search__options").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      variableWidth: true,
    });
  }
}
