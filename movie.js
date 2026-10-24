// SÍÐA FYRIR EINN TITIL
// Spjöldin hlekkja hingað, t.d. movie.html?id=12
// #movie-page er tómur <main>. Þið fyllið hann. Útlitið er frjálst.

// Verkefni: skrifið loadMovie() og kallið á það neðst.
// 1. Lesið id úr slóðinni:
//      const id = Number(new URLSearchParams(location.search).get("id"))
// 2. fetch("./data.json"), breytið í JSON og console.log á listann.
//    Finnið rétt atriði: allItems.find(item => item.id === id)
// 3. Ef ekkert fannst: setjið skilaboð í #movie-page með hlekk á index.html og hættið.
// 4. Lágmark í #movie-page:
//      - titillinn, item.title (settið hann líka í document.title)
//      - <iframe> með src sem notar videoId
//
// Til að birta trailer notið:
//   const videoId = new URL(item.trailerUrl).searchParams.get("v")
//   <iframe src="https://www.youtube.com/embed/${videoId}"></iframe>
