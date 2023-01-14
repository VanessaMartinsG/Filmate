import './scss/global.scss';


import searchImage from './img/search.svg';
import searchOrangeImage from './img/search-orange.svg';


const floatingMenu = document.querySelector(".floating-menu");

const clickFloatingMenu = () => {
  const homeIcon = floatingMenu?.querySelector(".home");
  const searchIcon = floatingMenu?.querySelector<HTMLImageElement>(".search img");
  const personIcon = floatingMenu?.querySelector(".person");

  homeIcon?.addEventListener("click", () => {
    homeIcon.classList.add("active");
    searchIcon!.src = searchImage;
    personIcon?.classList.remove("active");
  })

  searchIcon?.addEventListener("click", () => {
    searchIcon!.src = searchOrangeImage;
    homeIcon?.classList.remove("active");
    personIcon?.classList.remove("active");
  })


  personIcon?.addEventListener("click", () => {
    personIcon.classList.add("active");
    searchIcon!.src = searchImage;
    homeIcon?.classList.remove("active");
  })

}

floatingMenu ? clickFloatingMenu() : '';