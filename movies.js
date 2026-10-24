// Listinn er geymdur hér svo hver síða og leitin geti notað hann
let allItems = [];
let movies = [];

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
  console.log(items);
  movies = items.filter((item) => item.type === "movie");
  renderHero(movies);
  console.log(movies);
  renderRows(movies);
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

function renderRows(items) {
  const rows = document.querySelector("#rows");
  rows.innerHTML = items.map((item) => cardHtml(item)).join("");

  // Verkefni: ákveðið hvaða atriði eiga að sjást og setjið raðirnar á síðuna
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

// Formats minutes into hours and remaining minutes string
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
