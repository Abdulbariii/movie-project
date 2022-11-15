"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const PROFILE_MAIN_URL = "http://image.tmdb.org/t/p/w585";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container1");
const genreContainer = document.querySelector(".con-genre");
const getActorCon = document.getElementById("actor-con");
const actors = document.getElementById("actors-list");

const genre_id = 12;
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies(12);
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

const constructUrlOfActorList = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&query=tom`;
};

// creating the url api link for the get the type of movies like (action , drama , ...so on)

// bas nawi flimakan w listy filmakana law linka dainitawa
const constructGener = (genreId) => {
  return `${TMDB_BASE_URL}/discover/movie?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (id) => {
  const url = constructGener(id);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// list y movies

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = " ";
    movieDiv.innerHTML = `
        <img class="img-movie"  src="${
          BACKDROP_BASE_URL + movie.backdrop_path
        }" alt="${movie.title} poster">
        <h3 class="movie-card__title">${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    CONTAINER.appendChild(movieDiv);
  });
};

//Getting actor list for a specific movie
const fetchCast = async (path) => {
  const url = constructUrl(path);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = async (movie) => {
  console.log(movie);

  // the query for getting list actors(Cast) for a specific movie
  const actors = await fetchCast(`movie/${movie.id}/credits`);
  let cast = [];
  for (let i = 0; i < 6; i++) {
    cast.push(actors.cast[i]);
  }

  console.log(cast);
  const conActors = document.createElement("ul");
  conActors.classList = " list-unstyled cast-con";

  cast.map((actor) => {
    console.log(PROFILE_BASE_URL + actor.profile_path);
    const conActor = document.createElement("li");
    conActor.innerHTML = ` <img  class="actor-profile__img" src=${
      PROFILE_BASE_URL + actor.profile_path
    }>
<p>

${actor.name}</p>`;
    conActor.addEventListener("click", function () {
      CONTAINER.innerHTML = " ";
      renderSingleActorPage(actor.id);
    });

    conActors.appendChild(conActor);
  });

  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div class="actors-con">
            <h3>Actors:</h3>
           
    </div>`;

  CONTAINER.appendChild(conActors);
};

// render action,comedy,war ... movie type texts in the footer with
//giving them functionaility to it by calling changeGenre function
const renderGenerInFooter = (genres) => {
  console.log(genres);
  genres.genres.map((genre) => {
    console.log(genre.name);
    const liGenre = document.createElement("li");
    liGenre.innerHTML = `${genre.name}`;
    liGenre.addEventListener("click", function () {
      changeGenre(genre.id);
    });
    genreContainer.appendChild(liGenre);
  });
};

// re-render movies in the hoem page
const changeGenre = async (id) => {
  const genreRes = await fetchMovies(id);
  CONTAINER.innerHTML = " ";
  renderMovies(genreRes.results);
};

const fetchGener = async (gener) => {
  const url = constructUrl(gener);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  renderGenerInFooter(data);
};

//Fetching information about only one actor
const fetchSingleActor = async (path) => {
  const url = constructUrl(path);
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const renderSingleActorPage = async (actor_id) => {
  const actorInformation = await fetchSingleActor(`person/${actor_id}`);
  console.log(actorInformation.profile_path);
  CONTAINER.innerHTML = `

<img class=" h-96 object-cover " src=${
    PROFILE_BASE_URL + actorInformation.profile_path
  }
}>

<div class=" flex flex-col gap-10 pb-20">
<h1 class="text-2xl"> <span class="text-3xl font-bold">Name:</span> ${
    actorInformation.name
  }</h1>
  <h1 class="text-2xl "> <span class="text-3xl font-bold">Gender: </span>${
    actorInformation.gender === 1 ? "Female" : "Male"
  }</h1>

<h1 class="text-2xl "> <span class="text-3xl font-bold">popularity: </span>${
    actorInformation.popularity
  }</h1>




<p class="text-sm gap-2 flex flex-col"> <span class="text-3xl font-bold">Biography: </span>${
    actorInformation.biography
  }</p
>


</div>

  `;
};

actors.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  renderActorLits();
});

const fetchActorList = async (path) => {
  const url = constructUrlOfActorList(path);
  console.log(url);
  const res = await fetch(url);
  const data = res.json();
  return data;
};

const renderActorLits = async () => {
  const actors = await fetchActorList("search/person");
  console.log(actors);

  actors.results.map((actor) => {
    const conActor = document.createElement("div");
    conActor.innerHTML = `<div class="bg-sky-900 rounded-xl hover:scale-2">
  <img class="rounded-xl w-80 h-80 object-cover" src=${
    PROFILE_BASE_URL + actor.profile_path
  }>

  <h1 class="text-2xl text-white py-2 px-2 ">${actor.name}</h1>
  </div>`;
    CONTAINER.appendChild(conActor);
    conActor.addEventListener("click", function () {
      renderSingleActorPage(actor.id);
    });
  });
};

fetchGener("genre/movie/list");

document.addEventListener("DOMContentLoaded", autorun);
