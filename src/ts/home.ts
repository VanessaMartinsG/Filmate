import '../scss/home.scss';
import heart from '../img/heart.svg';
import heartFilled from '../img/heart-filled.svg';
import { ShowToastify } from './helper/helper';

const heartBestFilm = document.querySelector<HTMLImageElement>(".heart")

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
