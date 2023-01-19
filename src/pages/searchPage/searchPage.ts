import { AxiosResponse } from 'axios';
import './searchPage.scss';
import { movieService } from '../../services/film';
import { IGenrer } from '../../interface/interface';

import favIconPath from '../../img/heart.svg';
import imgStarPath from '../../img/star.png';

let buttons = document.querySelector<HTMLDivElement>(".buttons")
let btnBack = document.querySelector<HTMLButtonElement>(".btnBack")
let btnNext = document.querySelector<HTMLButtonElement>(".btnNext")
let page = 1;

const listGenrer = document.querySelector<HTMLDivElement>('.items')
const movieGenrerList = async () => {
   const movieGenrer: IGenrer[] = await (await movieService.getGenrerList()).data.genres;
   movieGenrer.forEach((item) => {
      let genrer = document.createElement('a');
      genrer.setAttribute("data-id", item.id.toString())
      genrer.textContent = item.name;
      genrer.href = "#";
      console.log(listGenrer);

      listGenrer?.appendChild(genrer)
   });
}

async function showMovies() {
   const responseDiscover = await movieService.discoverMovie(page);
   const responseGenre = await movieService.getGenrerList();
   let numberPage: number = responseDiscover.data.page

   createPoster(responseDiscover, responseGenre)


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

function createPoster(responseDiscover: AxiosResponse, responseGenre: AxiosResponse) {
   let baseImgUrl = 'https://image.tmdb.org/t/p/original'
   let allPoster = document.querySelector(".allPoster");
   allPoster!.innerHTML = ''

   for (let i = 0; i < 20; i++) {

      let poster = document.createElement("div")
      poster.classList.add("poster")
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

      let iconFav = document.createElement("img")
      iconFav.classList.add("iconFav")
      iconFav.src = favIconPath
      rowTitleFav!.appendChild(iconFav)

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



showMovies();
movieGenrerList();

