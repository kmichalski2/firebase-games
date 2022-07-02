import { signInWithEmailAndPassword } from "firebase/auth";

export const initLoginPage = (auth) => {
    const loginForm$ = document.querySelector('#loginForm');

    if (loginForm$) {
        loginForm$.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(loginForm$);

            signInWithEmailAndPassword(auth, formData.get('email'), formData.get('password')).then(userCredential => {
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
};