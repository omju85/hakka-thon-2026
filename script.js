// Listinn er geymdur hér svo hver síða og leitin geti notað hann
let allItems = [];
let thrillerMovies = [];
let categories = [];

function getCategories() {
  allItems.forEach((item) => {
    item.categories.forEach((category) => {
      if (!categories.includes(category)) {
        categories.push(category);
        console.log(categories);
      }
    });
  });
}

function formatTime(minutes) {
  let hours = 0;
  let remainMinutes = 0;
  let hourText = "";
  let minuteText = "";

  // Less than an hour
  if (minutes < 60) {
    if (minutes > 1) {
      minuteText = " minutes";
    } else {
      minuteText = " minute";
    }
    return minutes + minuteText;
  } else {
    // Greater than an hour
    remainMinutes = minutes % 60;
    hours = (minutes - remainMinutes) / 60;
    if (hours > 1) {
      hourText = " hours";
    } else {
      hourText = " hour";
    }
    if (remainMinutes > 1) {
      minuteText = " minutes";
    } else {
      minuteText = " minute";
    }
    return hours + hourText + " " + remainMinutes + minuteText;
  }
}

// 1. SÆKTU GÖGNIN
// Skrifið loadData sjálf, eins og á glærunum.
// Notið fetch("./data.json"), breytið svarinu í JSON og console.log á listann
// svo þið sjáið gögnin í DevTools (F12).
// Kallið svo á renderHero(items) og renderRows(items).
// Vistið listann líka í allItems, því síðurnar og leitin þurfa hann aftur.
// Þegar fallið er tilbúið skuluð þið kalla á loadData() neðst í skránni.

async function loadData() {
  const response = await fetch("./data.json");
  const items = await response.json();

  allItems = items;
  thrillerMovies = items.filter((item) => item.categories.includes("Thriller"));

  getCategories();
  renderHero(allItems);

  categories.forEach((category) => {
    renderRows(
      allItems.filter((item) => item.categories.includes(category)),
      category,
    );
  });
}
loadData();

// 2. FORSÍÐA (HERO)

function renderHero(items) {
  // Verkefni: notið .filter() til að halda aðeins eftir atriðum þar sem featured er true.
  // Á movies.html og series.html á hero-Swiper líka aðeins að sýna þann type, sjá lið 4.
  const featured = items.filter((item) => item.featured);
  console.log("featured", featured);

  // Verkefni: notið .map() til að breyta hverju atriði í eina glæru.
  // Hver glæra þarf klasana "swiper-slide hero-slide".
  // Sýnið titil, lýsingu og item.backdrop sem background-image.
  // "Play trailer" á að vera hlekkur á movie.html?id=${item.id}
  const slidesHtml = featured
    .map(
      (item) => `
    <div class="swiper-slide hero-slide" style="background-image: url('${item.backdrop}')">
      <div class="hero-banner">
      <h1>${item.title}</h1>
      <p>${item.description}</p>
      <p>Year: ${item.year}</p>
      <p>Duration: ${formatTime(item.duration)}</p>
      <p>Rating: ${item.rating}</p>
      <a href="movie.html?id=${item.id}">Spila stikklu</a>
      </div>
    </div>
  `,
    )
    .join("");

  document.querySelector("#hero-slides").innerHTML = slidesHtml;

  // Ræsið Swiper EFTIR að glærurnar eru komnar á síðuna. Prófið að breyta stillingunum!
  new Swiper(".hero", {
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Verkefni: bætið við autoplay: { delay: 5000, disableOnInteraction: false }
  });
}

// 3. RAÐIR af myndum
// Búið til fallið cardHtml sem tekur við einu item (movie).
// Fallið á að skila HTML fyrir eitt spjald: hlekkur á síðu myndarinnar,
// poster-mynd og titillinn. Swiper-röðin hér fyrir neðan kallar svo á fallið.
//
// Röð (rowHtml). Hver röð er eigin Swiper, svo spjöldin renna án skrunstiku.
// Notið .map() á lista af myndum í völdum flokki og setjið eitt spjald í hverja slide:
// <section class="row">
//   <div class="swiper row-swiper">
//     <div class="swiper-wrapper">
//       ${items.map(item => `
//         <div class="swiper-slide">
//           ${cardHtml(item)}
//         </div>
//       `).join("")}
//     </div>
//     <div class="swiper-button-prev"></div>
//     <div class="swiper-button-next"></div>
//   </div>
// </section>
//
// Verkefni:
//  - EFTIR að HTML-ið er komið á síðuna, búið til einn Swiper fyrir hvern ".row-swiper"
//    með new Swiper(...). Það tengir örvarnar og lætur röðina renna:
//      slidesPerView: "auto"
//      navigation: örvarnar sem eru inni í þessari row, ekki örvarnar á forsíðunni.
//        Sami klasi (swiper-button-next) er á mörgum stöðum. Finnið hnappinn
//        með element.querySelector, þar sem element er þessi röð.
function renderRows(items, title) {
  const rows = document.querySelector("#rows");

  rows.insertAdjacentHTML(
    "beforeend",
    `<section id="row">
      <h2>${title}</h2>
      <div class="swiper row-swiper">
        <div class="swiper-wrapper">
          ${items.map((item) => `<div class="swiper-slide">${cardHtml(item)}</div>`).join("")}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </section>`,
  );

  const element = rows.lastElementChild.querySelector(".row-swiper");
  new Swiper(element, {
    slidesPerView: auto,
    spaceBetween: 20,
    navigation: {
      nextEl: element.querySelector(".swiper-button-next"),
      prevEl: element.querySelector(".swiper-button-prev"),
    },
  });
}

function cardHtml(item) {
  return `
  <a class="card" href="movie.html?id=${item.id}">
  <div>
  <img src="${item.image}"/>
  <h4>${item.title}</h4>
  </div>
  </a>`;
}
/* Mynd, title, description */

// 4. MOVIES OG SERIES ERU SÉR SÍÐUR
// Home, Movies og Series eru þrjár HTML-síður. Hver síða hleður þessa script.js
// og býr til sinn eigin hero-Swiper og sína eigin row-Swiper þegar hún opnast.
//
// <body data-page="..."> segir hvaða síða þetta er:
//   index.html   →  data-page="all"
//   movies.html  →  data-page="movie"
//   series.html  →  data-page="series"
//
// Bætið <nav> við í HTML-inu, sjá comment þar.
// Þrír <a>, ekki <button> sem filterar sömu síðu:
// Home → index.html, Movies → movies.html, Series → series.html.
//
// Verkefni: lesið síðuna
//   const page = document.body.dataset.page
// og filterið listann áður en Swiper er búinn til:
//   - renderHero: featured er true. Ef page er ekki "all", líka item.type === page.
//   - renderRows: ef page er ekki "all", aðeins atriði þar sem item.type === page.
// index.html sýnir bæði movies og series. movies.html aðeins movies. series.html aðeins series.
