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
  if (text.length > 0) {
    document.getElementById("search-results").hidden = false;
    // Verkefni: filterið allItems með text og setjið <li> í searchResults°
    const resultList = allItems
      .filter((item) => item.title.toLowerCase().trim().includes(text))
      .map(
        (item) =>
          `<li><a href="movie.html?id=${item.id}">${item.title}</a></li>`,
      )
      .join("");
    document.getElementById("search-results").innerHTML = resultList;
  } else {
    document.getElementById("search-results").hidden = true;
  }
});
