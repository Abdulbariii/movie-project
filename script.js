"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const PROFILE_MAIN_URL = "http://image.tmdb.org/t/p/w585";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container1");
const genreContainer = document.querySelector(".con-genre");
const getActorCon = document.getElementById("actor-con");
const actors = document.getElementById("actors-list");
const actorsFooter = document.getElementById("actors-footer");
const homeNavbar = document.getElementById("home-navbar");
const homeFooter = document.getElementById("home-footer");
const dropdown_con = document.getElementById("dropdown-menu-con");
const aboutNavbar = document.getElementById("about-navbar");
const logoNavbar = document.getElementById("logo-navbar");
const logoFooter = document.getElementById("logo-footer");
logoNavbar.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  changeGenre(12);
});

logoFooter.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  changeGenre(12);
});
homeNavbar.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  changeGenre(12);
});
homeFooter.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  changeGenre(12);
});

actors.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  renderActorLits();
});

actorsFooter.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  renderActorLits();
});

aboutNavbar.addEventListener("click", function () {
  CONTAINER.innerHTML = " ";
  renderAbout();
});
const genre_id = 12;
// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies(12);
  renderMovies(movies.results);
};

//About section
const renderAbout = () => {
  CONTAINER.innerHTML = `
<div class="flex flex-col about-con gap-10  ml-20">
<h1 class="text-4xl font-bold">About</h1>
<p class="text-2xl">Holly View is a movie website that provides best movies in full HD. Each movie has been classified upon different genres based on their content and each has its own list of actors along with details on each actor. We, a group of four fresh developers, wish to bring our designing ideas and coding comprehensions to life through the Holly View website. Enjoy it!</p>
</div>

<div class="flex flex-col mx-20 gap-10 items-start mb-20 justify-start">

<h1 class="text-4xl font-bold">Team members</h1>
          <a class="flex items-center gap-2" href="https://github.com/Abdulbariii">
            <img class="w-20 h-20 object-cover" src="./github-logo.png" />
            <p class="text-3xl font-bold">Abdulbari</p>
          </a>

          <a class="flex items-center gap-2" href="https://github.com/Nma-sh98">
            <img class="w-20 h-20 object-cover" src="./github-logo.png" />
            <p class="text-3xl font-bold">Nma</p>
          </a>
          <a class="flex items-center gap-2" href="https://github.com/shadmustafa">
            <img class="w-20 h-20 object-cover" src="./github-logo.png" />
            <p class="text-3xl font-bold">Shad</p>
          </a>
          <a class="flex items-center gap-2" href="https://github.com/MariaDaya">
            <img class="w-20 h-20 object-cover" src="./github-logo.png" />
            <p class="text-3xl font-bold">Maria</p>
          </a>
        </div>
  `;
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

//genres in navbar
const renderGenreInNavbar = (genres) => {
  console.log(genres);
  genres.genres.map((genre) => {
    console.log(genre.name);
    const liGenre = document.createElement("a");
    liGenre.innerHTML = `${genre.name}`;
    liGenre.addEventListener("click", function () {
      changeGenre(genre.id);
    });
    dropdown_con.appendChild(liGenre);
  });
};

const fetchGenerNavbar = async (gener) => {
  const url = constructUrl(gener);
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  renderGenreInNavbar(data);
};

fetchGenerNavbar("genre/movie/list");

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
    conActor.innerHTML = ` 
    <img  class="actor-profile__img" src=${
      PROFILE_BASE_URL + actor.profile_path
    }>
<p class="actorname">

${actor.name}</p>`;
    conActor.addEventListener("click", function () {
      CONTAINER.innerHTML = " ";
      renderSingleActorPage(actor.id);
    });
    //
    conActors.appendChild(conActor);
  });

  CONTAINER.innerHTML = `
    <div class="row gap-10">

        <div ">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>

        <div class="flex flex-col gap-5">
            <h2 id="movie-title" class="text-4xl">${movie.title}</h2>
            <p id="movie-release-date "  class="text-xl"><b class="font-bold text-2xl">Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime " class="text-xl"><b class="font-bold text-2xl">Runtime:</b> ${
              movie.runtime
            } Minutes</p>
            <h3 class="font-bold text-2xl">Overview:</h3>
            <p class="text-xl" id="movie-overview ">${movie.overview}</p>
        </div>
   </div>
        <div class="actors-con">
        <h1 class="text-5xl"> Actors </h1>
     
           
    </div>`;

  CONTAINER.appendChild(conActors);
};

// render action,comedy,war ... movie type texts in the footer with
//giving them functionaility to it by calling changeGenre function
const renderGenerInFooter = (genres) => {
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
    conActor.innerHTML = `<div class="bg-indigo-800 mb-10 hover:scale-105 transition-all">
  <img class=" w-80 h-80 object-cover" src=${
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
