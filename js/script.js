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
  const items = document.querySelectorAll(`.${itemsClass}`);
  const slides = Math.ceil(items.length / itemsNumPerSlide);
  console.log(slides);
  console.log(items.length);
  const parent = document.querySelector(`.${parentClass}`);
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
  document.querySelector(".header-start").addEventListener("click", function (e) {
    const mobileMenu = document.querySelector(".header-start__nav.mobile");
    const bg = document.querySelector(".layer-header");
    if (e.target.classList.contains("burger")) {
      e.target.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      bg.classList.toggle("active");
      document.querySelector("body").classList.toggle("active");
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
      document.querySelector(".login__window.active").classList.remove("active");
      document.querySelector(".login__window--recover").classList.add("active");
    }
    if (e.target.classList.contains("login__back")) {
      document.querySelector(".login__window.active").classList.remove("active");
      document.querySelector(".login__window").classList.add("active");
    }
  });
}

// burger on other pages
if (document.querySelector(".burger--main")) {
  const burger = document.querySelector(".burger");
  const bg = document.querySelector(".layer-header");
  const menu = document.querySelector(".header__profile");
  const notificationBtn = document.querySelector(".notification__open");
  const notificationClose = document.querySelector(".notification__close");
  const notificationList = document.querySelector(".notification");
  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    bg.classList.toggle("active");
  });
  notificationBtn.addEventListener("click", function () {
    notificationList.classList.add("active");
  });
  notificationClose.addEventListener("click", function () {
    notificationList.classList.remove("active");
  });
}

if (document.querySelector(".reg")) {
  // рассче индекса массы тела
  document.addEventListener("keyup", function () {
    const msd = document.querySelector(".reg__msd");
    const weight = document.querySelector(".reg__input--weight");
    const height = document.querySelector(".reg__input--height");
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
      curStep.classList.remove("active");
      if (!(curStepNum == 1)) {
        console.log(curStepNum);
        document.querySelector(`.reg__tabs-content[data-tab="${curStepNum - 1}"]`).classList.add("active");
        stepsCount(curStepNum - 1);
      }
    }
  });

  // добавляем функционал для кнопки Далее и Пропустить шаг
  document.querySelector(".reg__wrapper").addEventListener("click", function (e) {
    if (e.target.classList.contains("reg__btn") || e.target.classList.contains("reg__pass")) {
      // переходим на новый шаг
      const curStep = +e.target.parentElement.dataset.tab;
      const curStepPage = document.querySelector(`.reg__tabs-content[data-tab="${curStep}"]`);
      const newTab = +curStep + 1;
      curStepPage.classList.remove("active");
      console.log(newTab);
      console.log(e.target.parentElement.parentElement);
      document.querySelector(`.reg__tabs-content[data-tab="${newTab}"]`).classList.add("active");
      stepsCount(newTab);
      // добавляем класс active нужному шагу справа
      document.querySelector(".reg__tabs-btn.active").classList.remove("active");
      document.querySelector(`.reg__tabs-btn[data-tab="${newTab}"]`).classList.add("active");
    }
    // добавляем класс complete слева для выполненного таба
    if (e.target.classList.contains("reg__btn")) {
      const curStep = +e.target.parentElement.dataset.tab;
      document.querySelector(`.reg__tabs-btn[data-tab="${curStep}"]`).classList.add("complete");
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

  // слайдер для мобильных бадов
  if (window.innerWidth < 768) {
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
    const filesList = document.querySelector(".reg__file-list");
    console.log(e);
    const html = `
  <div class="reg__file-item" data-file="${filesCount}">
      <img src="./img/reg-icons/reg-file-icon.svg" alt="file icon" class="reg__file-icon" />
      <input type="text" class="reg__file-name" placeholder="Введите название файла" />
  </div>
  `;
    filesList.insertAdjacentHTML("beforeend", html);
    const filesInputs = document.querySelectorAll(".reg__file-name");
    filesInputs[filesInputs.length - 1].value = fileName;
  });

  // удаление файла из интерфейса и объекта
  document.querySelector(".reg__file-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("reg__file-icon")) {
      const item = e.target.parentElement;
      const itemID = e.target.parentElement.dataset.file;
      delete uploadFilesSecondStep[itemID];
      item.remove();
    }
  });
  $(".appointment__datepicker").datepicker({
    showOtherMonths: false,
    weekends: [0],
  });
  $(".appointment__month[data-date='2'] .appointment__datepicker").datepicker({
    showOtherMonths: false,
    weekends: [0],
  });
  // активация календарей
  document.querySelector(".appointment__wrapper").addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("datepicker--cell-day")) {
      // показываем время
      if (document.querySelector(".appointment__month.active")) {
        document.querySelector(".appointment__month.active").classList.remove("active");
      }
      document.querySelector(`.appointment__month[data-date="${3 - e.target.closest(".appointment__month").dataset.date}"`).classList.add("active");
      // заполняем нужной датой
      const day = e.target.innerHTML;
      const monthsList = ["Янаварь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      const daysOfWeekList = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
      const month = monthsList[+e.target.dataset.month + 1];
      const dayOfWeek = daysOfWeekList[+e.target.dataset.date % 7];
      console.log(e.target);
      document.querySelector(`.appointment__month[data-date="${3 - e.target.closest(".appointment__month").dataset.date}"] .appointment__days-title`).innerHTML = month + " " + day + ", " + dayOfWeek;
      console.log(month, dayOfWeek, day);
    }
  });
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
    }
  });
  // загрузка файлов в создании новой болезни
  // загрузка файлов в регистрации пациента (2-ой шаг)
  const uploadFilesDisease = {}; // сюда сохраняем загруженные файлы
  let filesCount = 0;
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
  document.getElementById("cancelNewHistory").addEventListener("click", () => {
    document.querySelector(".general__form--new").classList.remove("active");
    document.getElementById("cancelNewHistory").classList.remove("active");
  });
  // аккордеон для историй болезни
  document.querySelectorAll(".general__history-name").forEach((history) => {
    history.addEventListener("click", function () {
      this.parentElement.classList.toggle("active");
    });
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
      input.parentElement.querySelector("span").style.left = width + 15 + "px";
    })
  );

  function updateSuffix() {
    const width = getTextWidth(input.value, "20px arial");
    console.log(this);
    this.parentElement.querySelector("span").style.left = width + "px";
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

  // добавляем воозможность выбрать уточнение для жалобы (список)
  document.querySelector(".general__symptoms").addEventListener("click", function (e) {
    if (e.target.classList.contains("general__symptom-choose")) {
      e.target.classList.toggle("active");
    }
    if (e.target.classList.contains("general__symptom-item")) {
      e.target.closest(".general__symptom-choose").classList.toggle("active");
      e.target.closest(".general__symptom-choose").querySelector("span").innerHTML = e.target.innerHTML;
    }
  });

  // переключение на все задачи по ссылке
  if (document.querySelector(".tasks__all")) {
    document.querySelector("#allTasks").addEventListener("click", function () {
      document.querySelector(".tabs__item.active").classList.remove("active");
      document.querySelector(".general__tabs-content.active").classList.remove("active");
      document.querySelector(".general__tabs-btns.active").classList.remove("active");
      document.querySelector(".tasks__all").classList.add("active");
      document.querySelector(".tasks__tabs-btn[data-tasks='1']").classList.add("active");
      document.querySelector(".tasks__list[data-tasks='1']").classList.add("active");
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
    });
    // слайдер бадов на мобилке
    $(".recommendations__buds-list").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: false,
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
        settings: "unslick",
      },
    ],
  });
  document.querySelectorAll(".slick-dots button").forEach((btn) => (btn.innerHTML = " "));
  // accordeon for doctor-info
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
      document.querySelectorAll(".doctor__clients-item").forEach((client) => {
        client.classList.add("block");
      });
    }
    if (e.target.classList.contains("list")) {
      e.target.classList.remove("active");
      document.querySelector(".doctor__clients-view .block").classList.add("active");
      document.querySelectorAll(".doctor__clients-item").forEach((client) => {
        client.classList.remove("block");
      });
    }
  });
}

if (document.querySelector(".tests__add")) {
  // выбираем что назаначить пациенту
  document.querySelectorAll(".tests__add").forEach((add) =>
    add.addEventListener("click", function (e) {
      add.classList.toggle("active");
      if (e.target.classList.contains("tests__add-option")) {
        add.querySelector(" span").innerHTML = e.target.innerHTML;
        if (e.target.closest(".tests__card").querySelector("div.active")) {
          e.target.closest(".tests__card").querySelector("div.active").classList.remove("active");
        }
        add.closest(".tests__card").querySelector(`div[data-add="${e.target.dataset.add}"]`).classList.add("active");
      }
    })
  );
  // добавляем рекомендации по питанию
  document.querySelector(".tests__meals-choosed").addEventListener("click", function (e) {
    document.querySelector(".tests__meals-choosed").classList.toggle("active");
    document.querySelector(".tests__meals-list").classList.toggle("active");
    if (e.target.classList.contains("tests__meals-option")) {
      document.querySelector(".tests__meals-input").value = e.target.innerHTML;
      const recommendation = `<div class="tests__meals-item">${e.target.innerHTML}<span class="delete"></span></div>`;
      document.querySelector(".tests__meals-recommendations").insertAdjacentHTML("beforeend", recommendation);
      document.querySelector(".tests__meals-input").value = "";
    }
  });
  // добавляем рекомендацию не из списка а по нажатию Enter
  document.querySelector(".tests__meals-input").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      document.querySelector(".tests__meals-choosed").classList.remove("active");
      document.querySelector(".tests__meals-list").classList.remove("active");
      const recommendation = `<div class="tests__meals-item">${document.querySelector(".tests__meals-input").value}<span class="delete"></span></div>`;
      document.querySelector(".tests__meals-recommendations").insertAdjacentHTML("beforeend", recommendation);
      document.querySelector(".tests__meals-input").value = "";
    }
  });
  // удаляем элементы при нажатии на крестик
  document.querySelector(".tests__meals-recommendations").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
    }
  });
  // выбор анализов
  document.querySelector(".tests__analyzes-choosed").addEventListener("click", function (e) {
    document.querySelector(".tests__analyzes-choosed ul").classList.toggle("active");
    if (e.target.classList.contains("tests__analyzes-option")) {
      document.querySelector(".tests__analyzes-choosed span").innerHTML = e.target.innerHTML;
      document.querySelector(`.tests__analyzes-list.active`).classList.remove("active");
      document.querySelector(`.tests__analyzes-list[data-analyze="${e.target.dataset.analyze}"]`).classList.add("active");
    }
  });
  // добавляем Назначено при выборе ckeckbox
  document.querySelector(".tests__analyzes-btn").addEventListener("click", function (e) {
    document.querySelectorAll(".tests__analyzes-selected span").forEach((span) => span.remove());
    document.querySelectorAll(".tests__analyzes-checkbox:checked").forEach((box) => {
      document.querySelector(".tests__analyzes-selected").insertAdjacentHTML("beforeend", `<span>${box.parentElement.querySelector("span").innerHTML}</span>`);
    });
  });
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
      switch (curTab) {
        case 5:
          document.querySelector(".appointment__tabs-btn.active").classList.remove("active");
          document.querySelector(".appointment__tabs-content.active").classList.remove("active");
          document.querySelector(".appointment__tabs").classList.remove("active");
          document.querySelector(".appointment__date").classList.add("active");
          document.querySelector(".appointment__tabs").classList.remove("active");
          document.querySelector(".appointment__date").classList.add("active");
          break;
        case 6:
          document.querySelector(".appointment__tabs").classList.remove("active");
          document.querySelector(".appointment__date").classList.remove("active");
          document.querySelector(".appointment__finish").classList.add("active");
          document.querySelector(".appointment__finish-title").classList.add("active");
          document.querySelector(".appointment__preview").classList.remove("active");
          document.querySelector(".appointment").classList.add("appointment--blue");
          break;
        default:
          document.querySelector(".appointment__tabs-btn.active").classList.remove("active");
          document.querySelector(".appointment__tabs-content.active").classList.remove("active");
          document.querySelector(`.appointment__tabs-btn[data-tab="${curTab}"]`).classList.add("complete");
          document.querySelector(`.appointment__tabs-btn[data-tab="${curTab + 1}"]`).classList.add("active");
          document.querySelector(`.appointment__tabs-content[data-tab="${curTab + 1}"]`).classList.add("active");
          break;
      }
    }
    if (e.target.classList.contains("appointment__return")) {
      document.querySelector(".appointment__tabs").classList.add("active");
      document.querySelector(".appointment__date").classList.remove("active");
      document.querySelector(".appointment__tabs-btn[data-tab='5']").classList.add("active");
      document.querySelector(".appointment__tabs-content[data-tab='5']").classList.add("active");
      document.querySelector(".appointment__month.active").classList.remove("active");
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

if (document.querySelector(".contacts__contact") || document.querySelector(".popup")) {
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
        document.querySelector(`.popup__slide[data-popup="3"]`).classList.add("active");
      } else if (+curTab != 2) {
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
