const fixedNav = document.querySelector(".header"),
  scrollBtn = document.querySelector(".scrollBtn");
window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");

  window.scrollY > 500
    ? scrollBtn.classList.add("active")
    : scrollBtn.classList.remove("active");
});

// Btb To Top
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Explore Button
const exploreBtn = document.querySelector(".main .title .btn"),
  hadithSection = document.querySelector(".hadith");

exploreBtn.addEventListener("click", () => {
  hadithSection.scrollIntoView({
    behavior: "smooth",
  });
});

// Hadith Changer
const hadithContainer = document.querySelector(".hadith_container"),
  next = document.querySelector(".buttons .next"),
  prev = document.querySelector(".buttons .prev"),
  number = document.querySelector(".buttons .number");
hadithChanger();
function hadithChanger() {
  let hadithIndex = 0;
  fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then((response) => response.json())
    .then((data) => {
      let = hadithss = data.data.hadiths;
      changeHadith();
      next.addEventListener("click", () => {
        hadithIndex == 299 ? (hadithIndex = 0) : hadithIndex++;
        changeHadith();
      });
      prev.addEventListener("click", () => {
        hadithIndex == 0 ? (hadithIndex = 299) : hadithIndex--;
        changeHadith();
      });
      function changeHadith() {
        hadithContainer.innerText = hadithss[hadithIndex].arab;
        number.innerText = `300 - ${hadithIndex + 1}`;
      }
    });
}

// Link Section
let sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li");
links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Surha Api
const surhasContainer = document.querySelector(".surha_container");
getSurah();
function getSurah() {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((response) => response.json())
    .then((data) => {
      surhasContainer.innerHTML = "";
      for (let i = 0; i < 114; i++) {
        let surhas = data.data[i].name;
        surhasContainer.innerHTML += `
        <div class="surha">
          <p>${surhas.long}</p>
          <p>${surhas.transliteration.en}</p>
        </div>`;
      }

      const surahTitles = document.querySelectorAll(".surha");
      const popup = document.querySelector(".surah_popup"),
        ayatContainer = document.querySelector(".ayat");
      surahTitles.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              ayatContainer.innerHTML = "";
              let surahAyat = data.data.ayahs;
              surahAyat.forEach((aya) => {
                popup.classList.add("active");
                ayatContainer.innerHTML += `
                <p>(${aya.numberInSurah}) - ${aya.text}</p>
                `;
              });
            });
        });
      });
      let closePopup = document.querySelector(".close_popup");
      closePopup.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    });
}

// Pray Time Api
const cards = document.querySelector(".cards");
getPrayTimes();
function getPrayTimes() {
  fetch(
    "http://api.aladhan.com/v1/timingsByCity?city=gaza&country=palestine&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerHTML = "";
      for (time in times) {
        cards.innerHTML += `
        <div class="card">
            <div class="circle">
              <svg>
                <Circle cx="100" cy="100" r="100"></Circle>
              </svg>
              <div class="pray_time">${times[time]}</div>
            </div>
            <p>${time}</p>
          </div>
          `;
      }
    });
}

// Active SideBar
const bars = document.querySelector(".bars"),
  sideBar = document.querySelector(".header ul");

bars.addEventListener("click", () => {
  sideBar.classList.toggle("active");
});
