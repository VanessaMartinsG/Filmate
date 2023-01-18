import '../scss/home.scss';
import heart from '../img/heart.svg';
import heartFilled from '../img/heart-filled.svg';
import starIcon from '../img/star.png';
import { movieService } from '../services/film';
import { IMovie } from '../interface/interface';
import { ShowToastify } from './helper/helper';

const heartBestFilm = document.querySelector<HTMLImageElement>(".heart")
const baseURlImg = 'https://image.tmdb.org/t/p/original';

const changeHeart = () => {
  let favoriteFilm = false;
  heartBestFilm?.addEventListener("click", () => {
    favoriteFilm = !favoriteFilm;
    favoriteFilm ? heartBestFilm!.src = heartFilled : heartBestFilm!.src = heart
  })


  heartBestFilm?.addEventListener("click", function () {
    if (favoriteFilm == true) {
      ShowToastify({
        text: 'Você não está logado!',
        background: 'linear-gradient(to right, rgb(82 3 14), rgb(8 1 2))',
        position: 'right'
      })
    }
  });




}

heartBestFilm ? changeHeart() : '';



const requestMovieList = async () => {
  const movieList: IMovie[]  = (await movieService.getListMovies()).data.results;
  const listFilmRecents = document.querySelector<HTMLDivElement>('.list-film-recents')
  
  movieList.forEach((item) => {
    let card = document.createElement('div');
    let cardTitleBox = document.createElement('div');
    let title = document.createElement('p');
    let cardBoxVote = document.createElement('div');
    let cardBoxVoteTitle = document.createElement('p');
    let cardBoxVoteStar = document.createElement('div');
    let cardBoxVoteStarImg = document.createElement('img');
    let cardBoxVoteStarImgNumber = document.createElement("span");





    card.classList.add("card-film-list");
    cardTitleBox.classList.add("card-film-list-title");
    cardBoxVote.classList.add("card-film-box");
    cardBoxVoteStar.classList.add("card-film-box-star");



    card.style.backgroundImage = `url(${baseURlImg + item.backdrop_path})`;
    title.textContent = item.title;
    cardBoxVoteTitle.textContent = 'IMDb';
    cardBoxVoteStarImg.src = starIcon;
    cardBoxVoteStarImgNumber.textContent = String(item.vote_average);
    




    cardBoxVoteStar.appendChild(cardBoxVoteStarImg)
    cardBoxVoteStar.appendChild(cardBoxVoteStarImgNumber)
    cardBoxVote.appendChild(cardBoxVoteTitle)
    cardBoxVote.appendChild(cardBoxVoteStar)
    cardTitleBox.appendChild(title)
    card.appendChild(cardTitleBox)
    card.appendChild(cardBoxVote)
    listFilmRecents?.appendChild(card)





  });

  (<any>$('.list-film-recents')).slick({
    centerMode: true,
    centerPadding: '73px',
  });


}

requestMovieList()
