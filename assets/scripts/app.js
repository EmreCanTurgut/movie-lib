const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteModal = document.getElementById('delete-modal');




// const deleteModal_no =document.querySelector("#armut")
 

const movies = [];

console.log(addMovieModal);


const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieDeletionModal= () => {
toggleBackdrop();
deleteModal.classList.remove('visible');

}

const closeMovieModal = () => {
  toggleBackdrop();
  addMovieHandler.classList.remove('visible')
}

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();

}

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1); // o indexteki değeri arrayden siler
  console.log(movies);

  const listRoot = document.getElementById("movie-list");

  listRoot.children[movieIndex].remove(); // o indextekideğeri html listesinden siler
};

const showDeleteMovieModal = (id) => {
  deleteModal.classList.add('visible');
  toggleBackdrop();

  let deleteModal_yes =deleteModal.querySelector('#elma')
  
  deleteModal_yes.replaceWith(deleteModal_yes.cloneNode(true));

  deleteModal_yes=deleteModal.querySelector('#elma')

  deleteModal_yes.addEventListener('click',deleteMovie.bind(null,id));


  const deleteModal_no = deleteModal.querySelector('.btn--passive');

  deleteModal_no.removeEventListener('click',closeMovieDeletionModal);
  deleteModal_no.addEventListener('click',closeMovieDeletionModal);
  deleteModal_yes.addEventListener("click",closeMovieDeletionModal);
}



const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>
    `;
  newMovieElement.addEventListener("click", showDeleteMovieModal.bind(null,id)); //  addeventlistener fonksiyon çalışıtırılmasa bile çalışabilir
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = ""; //  inputn içindeki değere erişme için .value yazılır
  }
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

// const toggleMovieModal = () => {
//   addMovieModal.classList.toggle("visible");
//   toggleBackdrop();
// };
const cancelAddMovieHandler = () => {
  addMovieModal.classList.remove('visible');
  toggleBackdrop();
  clearMovieInput();
};
const backdropClickHandler = () => {
  toggleBackdrop();
  deleteModal.classList.remove('visible')
  addMovieModal.classList.remove('visible');
};
const addMovieHandler = () => {
  const titleValue = userInputs[0].value; // query selector array oluşşturdugu için [] kullanılır
  const imageUrlValue = userInputs[1].value; //.value yazılması sebebi 0. sıradaki inputun değerine ulaşmak için
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const newMovie = {
    id: Math.random().toString,
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);

  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
  addMovieModal.classList.remove('visible');
  toggleBackdrop();
  clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);


