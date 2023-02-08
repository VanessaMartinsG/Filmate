import { AxiosResponse } from 'axios';
import './searchPage.scss';
import { movieService } from '../../services/film';
import { IGenrer } from '../../interface/interface';

import heart from '../../img/heart.svg';
import heartFilled from '../../img/heart-filled.svg';
import imgStarPath from '../../img/star.png';
import { ShowToastify } from '../../ts/helper/helper';


let buttons = document.querySelector<HTMLDivElement>(".buttons")
let btnBack = document.querySelector<HTMLButtonElement>(".btnBack")
let btnNext = document.querySelector<HTMLButtonElement>(".btnNext")
let page = 1;
let focusGenrer: string;
let moviesFav: string[] = [];

const listGenrer = document.querySelector<HTMLDivElement>('.items')
const movieGenrerList = async () => {
   const movieGenrer: IGenrer[] = await (await movieService.getGenrerList()).data.genres;
   movieGenrer.forEach((item) => {
      let genrer = document.createElement('a');
      genrer.setAttribute("data-id", item.id.toString())
      genrer.textContent = item.name;
      genrer.href = "#";
      listGenrer?.appendChild(genrer)

      genrer?.addEventListener("click", () => {
         focusGenrer = item.id.toString()
         showMovies()
      })

   });
}

const changeHeart = (heartBestFilm: HTMLImageElement) => {
   moviesFav = JSON.parse(localStorage.getItem("moviesFav")!)
   heartBestFilm?.addEventListener("click", () => {
      if (moviesFav.find(item => JSON.parse(item).id.toString() == heartBestFilm.getAttribute('data-id')!.toString())) {
         heartBestFilm!.src = heart
         let index = moviesFav.findIndex(item => JSON.parse(item).id.toString() == heartBestFilm.getAttribute('data-id')!.toString())
         moviesFav.splice(index, 1)


      } else {
         heartBestFilm!.src = heartFilled
         if (heartBestFilm.getAttribute('data-movie')) {
            moviesFav.push(heartBestFilm.getAttribute('data-movie')!)
         }

      }
      localStorage.setItem('moviesFav', JSON.stringify(moviesFav));
   })


   heartBestFilm?.addEventListener("click", function () {
      if (moviesFav.find(item => JSON.parse(item).id.toString() == heartBestFilm.getAttribute('data-id')!.toString())) {
         ShowToastify({
            text: 'Você não está logado!',
            background: 'linear-gradient(to right, rgb(82 3 14), rgb(8 1 2))',
            position: 'right'
         })
      }
   });

}

async function showMovies() {
   const responseDiscover = await movieService.discoverMovie(page);
   const responseGenre = await movieService.getGenrerList();
   const responseMovieGenre = await movieService.genrerMovies(page, focusGenrer)
   let numberPage: number = responseDiscover.data.page

   createPoster(responseDiscover, responseGenre, responseMovieGenre)


   btnBack?.addEventListener("click", () => {
      page--
      showMovies()
   })

   btnNext?.addEventListener("click", () => {
      page++
      showMovies()
   })

   if (numberPage == 1) {
      buttons!.style.justifyContent = "flex-end"
      btnBack!.style.display = "none"
   } else if (numberPage + 1 == null) {
      buttons!.style.justifyContent = "flex-start"
      btnNext!.style.display = "none"
   } else {
      buttons!.style.justifyContent = "space-between"
      btnBack!.style.display = "block"
      btnNext!.style.display = "block"
   }

}

function createPoster(responseDiscover: AxiosResponse, responseGenre: AxiosResponse, responseMovieGenre: AxiosResponse) {
   let baseImgUrl = 'https://image.tmdb.org/t/p/original'
   let allPoster = document.querySelector(".allPoster");
   allPoster!.innerHTML = ''
   moviesFav = JSON.parse(localStorage.getItem("moviesFav")!)

   if (focusGenrer == null) {
      for (let i = 0; i < 20; i++) {

         let poster = document.createElement("div")
         poster.classList.add("poster")
         poster.setAttribute("data-id", responseDiscover.data.results[i].id.toString())
         allPoster!.appendChild(poster)

         let imgFilm = document.createElement("img")
         imgFilm.src = `${baseImgUrl}${responseDiscover.data.results[i].poster_path}`
         imgFilm.classList.add("imgFilm")
         poster!.appendChild(imgFilm)

         let rowTitleFav = document.createElement("div")
         rowTitleFav.classList.add("rowTitleFav")
         poster!.appendChild(rowTitleFav)

         let title = document.createElement("p")
         title.classList.add("title")
         title.textContent = responseDiscover.data.results[i].title
         rowTitleFav!.appendChild(title)

         let heartIcon = document.createElement("img")
         heartIcon.classList.add("heart")
         heartIcon.setAttribute("data-id", responseDiscover.data.results[i].id.toString())
         heartIcon.setAttribute("data-movie", JSON.stringify(responseDiscover.data.results[i]))
         if (moviesFav.find(item => JSON.parse(item).id.toString() == responseDiscover.data.results[i].id.toString())) {
            heartIcon.src = heartFilled
         } else {
            heartIcon.src = heart
         }
         changeHeart(heartIcon);
         rowTitleFav!.appendChild(heartIcon)

         let genreList = document.createElement("div");
         genreList.classList.add("genreList")
         poster!.appendChild(genreList)

         let listGenresIds: [] = responseDiscover.data.results[i].genre_ids
         let listGenresFilms: IGenrer[] = responseGenre.data.genres;

         listGenresFilms.forEach((item) => {
            listGenresIds.forEach((itemId) => {
               if (item.id == itemId) {
                  let genre = document.createElement("div");
                  genre.textContent = item.name
                  genre.classList.add("genre")
                  genre.id = item.name.replace(" ", "_")
                  genreList!.appendChild(genre)
               }
            })
         })

         let pointFilm = document.createElement("div")
         pointFilm.classList.add("pointFilm")
         poster!.appendChild(pointFilm)

         let imgStar = document.createElement("img")
         imgStar.classList.add("imgStar")
         imgStar.src = imgStarPath
         pointFilm!.appendChild(imgStar)

         let numberPoint = document.createElement("div")
         numberPoint.classList.add("numberPoint")
         numberPoint.textContent = String(responseDiscover.data.results[i].vote_average + ' pts');
         pointFilm!.appendChild(numberPoint)
      }
   }
   else {
      allPoster!.innerHTML = ''
      for (let i = 0; i < 20; i++) {
         let listGenresIds: [] = responseMovieGenre.data.results[i].genre_ids
         let listGenresFilms: IGenrer[] = responseGenre.data.genres;


         let poster = document.createElement("div")
         poster.classList.add("poster")
         poster.setAttribute("data-id", responseMovieGenre.data.results[i].id.toString())
         allPoster!.appendChild(poster)

         let imgFilm = document.createElement("img")
         imgFilm.src = `${baseImgUrl}${responseMovieGenre.data.results[i].poster_path}`
         imgFilm.classList.add("imgFilm")
         poster!.appendChild(imgFilm)

         let rowTitleFav = document.createElement("div")
         rowTitleFav.classList.add("rowTitleFav")
         poster!.appendChild(rowTitleFav)

         let title = document.createElement("p")
         title.classList.add("title")
         title.textContent = responseMovieGenre.data.results[i].title
         rowTitleFav!.appendChild(title)

         let heartIcon = document.createElement("img")
         heartIcon.classList.add("heart")
         heartIcon.setAttribute("data-id", responseMovieGenre.data.results[i].id.toString())
         if (moviesFav.find(item => JSON.parse(item).id.toString() == responseDiscover.data.results[i].id.toString())) {
            heartIcon.src = heartFilled
         } else {
            heartIcon.src = heart
         }
         changeHeart(heartIcon);
         rowTitleFav!.appendChild(heartIcon)

         let genreList = document.createElement("div");
         genreList.classList.add("genreList")
         poster!.appendChild(genreList)

         listGenresFilms.forEach((item) => {
            listGenresIds.forEach((itemId) => {
               if (item.id == itemId) {
                  let genre = document.createElement("div");
                  genre.textContent = item.name
                  genre.classList.add("genre")
                  genre.id = item.name.replace(" ", "_")
                  genreList!.appendChild(genre)
               }
            })
         })

         let pointFilm = document.createElement("div")
         pointFilm.classList.add("pointFilm")
         poster!.appendChild(pointFilm)

         let imgStar = document.createElement("img")
         imgStar.classList.add("imgStar")
         imgStar.src = imgStarPath
         pointFilm!.appendChild(imgStar)

         let numberPoint = document.createElement("div")
         numberPoint.classList.add("numberPoint")
         numberPoint.textContent = String(responseMovieGenre.data.results[i].vote_average + ' pts');
         pointFilm!.appendChild(numberPoint)
      }
   }
}



showMovies();
movieGenrerList();

