import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

interface Toastifyprops {
    text: string;
    background: string;
    position?: "right" | "left" | "center";
    className: string;
}

export function Helper({ text, background, position, className }: Toastifyprops) {
    Toastify({
        text: text,
        className: className,
        gravity: 'top',
        position: position,
        style: {
            background: background,
        }
    }).showToast();
}