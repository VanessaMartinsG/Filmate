import './login.scss';
import Toastify from 'toastify-js'
import '../../scss/tooltip.scss'

setTimeout(function () {
}, 4500);
const buttonLogin = <HTMLElement>(document.body.querySelector(".SingInButton"));
buttonLogin?.addEventListener("click", function () {
  Toastify({
    text: "Erro ao logar!",
    //duration: 3000,
    className: 'toastify',
    gravity: 'bottom',
    newWindow: false,
  }).showToast();
});