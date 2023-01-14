import './login.scss';
import { Helper } from '../../ts/helper/helper';

setTimeout(function () {
}, 4500);
const buttonLogin = <HTMLElement>(document.body.querySelector(".SingInButton"));
buttonLogin?.addEventListener("click", function () {
  Helper({
    text: 'Falha ao logar',
    background: 'linear-gradient(to right, rgb(82 3 14), rgb(8 1 2))',
    position: 'center',
    className: 'toastify toastifyLogin'
  })
});