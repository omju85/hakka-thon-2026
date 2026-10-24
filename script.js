// Listinn er geymdur hér svo hver síða og leitin geti notað hann
let allItems = [];

// 1. SÆKTU GÖGNIN
// Skrifið loadData sjálf, eins og á glærunum.
// Notið fetch("./data.json"), breytið svarinu í JSON og console.log á listann
// svo þið sjáið gögnin í DevTools (F12).
// Kallið svo á renderHero(items) og renderRows(items).
// Vistið listann líka í allItems, því síðurnar og leitin þurfa hann aftur.
// Þegar fallið er tilbúið skuluð þið kalla á loadData() neðst í skránni.

// 2. FORSÍÐA (HERO)
function renderHero(items) {
  // Verkefni: notið .filter() til að halda aðeins eftir atriðum þar sem featured er true.
  // Á movies.html og series.html á hero-Swiper líka aðeins að sýna þann type, sjá lið 4.
  const featured = items;

  // Verkefni: notið .map() til að breyta hverju atriði í eina glæru.
  // Hver glæra þarf klasana "swiper-slide hero-slide".
  // Sýnið titil, lýsingu og item.backdrop sem background-image.
  // "Play trailer" á að vera hlekkur á movie.html?id=${item.id}
  const slidesHtml = featured
    .map(
      (item) => `
    <div class="swiper-slide hero-slide" style="background-image: url('${item.backdrop}')">
      <h1>${item.title}</h1>
    </div>
  `
    )
    .join("");

  document.querySelector("#hero-slides").innerHTML = slidesHtml;

  // Ræsið Swiper EFTIR að glærurnar eru komnar á síðuna. Prófið að breyta stillingunum!
  new Swiper(".hero", {
    loop: true,
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
function renderRows(items) {
  const rows = document.querySelector("#rows");

  // Verkefni: ákveðið hvaða atriði eiga að sjást og setjið raðirnar á síðuna
  rows.innerHTML = "";
}

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

// 5. LEITARLISTI
// #search er inputið. #search-results er tómt <ul> fyrir neðan það.
// Listinn er falinn með hidden þangað til eitthvað passar.
//
// Verkefni: hlustið á "input". Þið eigið bara að gera tvennt:
//   1. Filterið allItems út frá textanum í inputinu.
//      Notið toLowerCase() og trim(), og haldið titlum sem innihalda textann.
//   2. Setjið niðurstöðurnar í #search-results, eitt <li> fyrir hvern titil.
//
// Ef textinn er tómur: tæmið listann og felið hann aftur (hidden = true).
// Ef eitthvað fannst: takið hidden af og sýnið listann.
// Takmarkið fjöldann, t.d. fyrstu 8.
//
// Eitt <li> er hlekkur svo smellt opni rétta mynd:
// <li><a href="movie.html?id=${item.id}">${item.title}</a></li>
//
// allItems verður að vera vistaður í loadData, annars er listinn tómur.

const searchInput = document.querySelector("#search");
const searchResults = document.querySelector("#search-results");

searchInput.addEventListener("input", (event) => {
  const text = event.target.value.toLowerCase().trim();

  // Verkefni: filterið allItems með text og setjið <li> í searchResults
});
