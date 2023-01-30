import './searchPage.scss';
import { movieService } from '../../services/film';
import { IGenrer } from '../../interface/interface';

const listGenrer = document.querySelector<HTMLDivElement>('.items')
 const movieGenrerList=async()=>{
    const movieGenrer:IGenrer[] = await (await movieService.getGenrerList()).data.genres;     
     movieGenrer.forEach((item) => {
     let genrer = document.createElement('a');
     genrer.setAttribute("data-id",item.id.toString()) 
     genrer.textContent = item.name;
     genrer.href="#"
     listGenrer?.appendChild(genrer)
     });
}  

    movieGenrerList();

