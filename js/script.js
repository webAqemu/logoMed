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

if (document.querySelector(".reg")) {
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
  });

  // добавляем функционал для кнопки Далее и Пропустить шаг
  console.log("kk");
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
  });
}
