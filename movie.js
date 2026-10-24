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
// Tild að birta trailer notið:
//   const videoId = new URL(item.trailerUrl).searchParams.get("v")
//   <iframe src="https://www.youtube.com/embed/${videoId}"></iframe>
async function loadMovie() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const response = await fetch("./data.json");
  const allItems = await response.json();

  // fetch the specified movie
  const movie = allItems.find((item) => item.id === id);
  const categories = movie.categories;
  console.log(movie);
  if (!movie) {
    // Display an error message with a link back to landing page if no movie is found
    document.getElementById("movie-page").innerHTML =
      "No movie found with id: " + id + "<br><a href='index.html'>Home</a>";
  } else {
    // Creates a list of categories in HTML form
    let categoriesHTML = "<div class='categories'>";
    if (categories.length > 0) {
      categoriesHTML += categories
        .map((category) => "<p>" + category + "</p>")
        .join("");
    }
    categoriesHTML += "</div>";

    // creates a youtube video id and shows a trailer to the movie alongside some information
    const videoId = new URL(movie.trailerUrl).searchParams.get("v");
    let text = `
    <div class="movie-page">
      <h2>${movie.title}</h2>
      <p>${movie.description}</p>
      ${categoriesHTML}
      <p>${movie.duration} minutes</p>
      <p>${formatTime(movie.duration)}</p>
      <iframe class="video" src="https://www.youtube.com/embed/${videoId}"></iframe>
    </div>`;

    document.title = movie.title;
    document.getElementById("movie-page").innerHTML = text;
  }
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

loadMovie();
