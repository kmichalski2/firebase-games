import { createUserWithEmailAndPassword } from "firebase/auth";

export const initRegisterPage = (auth) => {
    const registerForm$ = document.querySelector('#registerForm');

    if (registerForm$) {
        registerForm$.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm$);

            createUserWithEmailAndPassword(auth, formData.get('email'), formData.get('password')).then(userCredential => {
                console.log('Uzytkownik zostal zarejestrowany');
                console.log(userCredential);

                // http://localhost:3000/index.html
                const redirectTo = window.location.origin + '/index.html';

                window.location.href = redirectTo;
            }).catch((error) => {
                console.error(error.code, error.message);
            })
        });
    }

    const signInWithGoogleButton$ = document.querySelector('#signInWithGoogleButton');

    if (signInWithGoogleButton$) {
        signInWithGoogleButton$.addEventListener('click', () => {
                console.log('Sign In with Google');
        });
    }
};

// 1. Dodaj Button Sign In With Google do register.html
// 2. Dodaj obsługę nacisnięcia przycisku w register.js