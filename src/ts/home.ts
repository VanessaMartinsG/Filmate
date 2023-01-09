import '../scss/home.scss';

import heart from '../img/heart.svg';
import heartFilled from '../img/heart-filled.svg';

const heartBestFilm = document.querySelector<HTMLImageElement>(".heart")

const changeHeart = () => {
  let favoriteFilm = false;
  heartBestFilm?.addEventListener("click", () => {
    favoriteFilm = !favoriteFilm;
    favoriteFilm ? heartBestFilm!.src = heartFilled : heartBestFilm!.src = heart
  })
  

  
}

heartBestFilm ? changeHeart() : '';
