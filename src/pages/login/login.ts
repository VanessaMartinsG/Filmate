import './login.scss';
import { ShowToastify } from '../../ts/helper/helper';

setTimeout(function () {
}, 4500);
const buttonLogin = <HTMLElement>(document.body.querySelector(".SingInButton"));
buttonLogin?.addEventListener("click", function () {
  ShowToastify({
    text: 'Falha ao logar',
    background: 'linear-gradient(to right, rgb(82 3 14), rgb(8 1 2))',
    position: 'center',
    className: 'toastifyLogin'
  })
});