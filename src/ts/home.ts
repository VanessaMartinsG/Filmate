import '../scss/home.scss';

import heart from '../img/heart.svg';
import heartFilled from '../img/heart-filled.svg';

import Toastify from 'toastify-js'

import "../../node_modules/toastify-js/src/toastify.css"
const heartBestFilm = document.querySelector<HTMLImageElement>(".heart")

const changeHeart = () => {
  let favoriteFilm = false;
  heartBestFilm?.addEventListener("click", () => {
    favoriteFilm = !favoriteFilm;
    favoriteFilm ? heartBestFilm!.src = heartFilled : heartBestFilm!.src = heart
  })

  setTimeout(function() {
  }, 4500);
  heartBestFilm?.addEventListener("click", function() {
    if(favoriteFilm == true){
    Toastify({
      text: "Você não está logado!!",
      duration: 3000,
      
    }).showToast();

  }});

  

  
}

heartBestFilm ? changeHeart() : '';
