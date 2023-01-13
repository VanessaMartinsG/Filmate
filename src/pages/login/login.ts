import './login.scss';

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

  setTimeout(function() {
  }, 4500);
  const buttonLogin =<HTMLElement>(document.body.querySelector(".SingInButton"));
  buttonLogin?.addEventListener("click", function() {
    Toastify({
      text: "Gostaria de Logar?",
      duration: 3000,
      style: {
        background: "black",
        border: "300",
        size:"30px",
      }
    }).showToast();

  });