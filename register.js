import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const initRegisterPage = (auth) => {
    const registerForm$ = document.querySelector('#registerForm');

    if (registerForm$) {
        registerForm$.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(registerForm$);

            createUserWithEmailAndPassword(auth, formData.get('email'), formData.get('password')).then(userCredential => {
                console.log('Uzytkownik zostal zarejestrowany');
                console.log(userCredential);

                redirectToHomePage();
            }).catch((error) => {
                console.error(error.code, error.message);
            })
        });
    }

    const signInWithGoogleButton$ = document.querySelector('#signInWithGoogleButton');

    if (signInWithGoogleButton$) {
        signInWithGoogleButton$.addEventListener('click', (event) => {
            event.preventDefault();

            const provider = new GoogleAuthProvider();

            signWithProvider(auth, provider);
        });
    }

    const signInWithGithub$ = document.querySelector('#signInWithGithub');

    if(signInWithGithub$) {
        signInWithGithub$.addEventListener('click', (event) => {
            event.preventDefault();

            const provider = new GithubAuthProvider();

            signWithProvider(auth, provider);
        })
    }
};

const redirectToHomePage = () => {
    const redirectTo = window.location.origin + '/index.html';

    window.location.href = redirectTo;
}

const signWithProvider = (auth, provider) => {
    signInWithPopup(auth, provider).then(result => {
        console.log('Zalogowano z ' + provider.PROVIDER_ID)

        redirectToHomePage();
    }).catch(error => {
        console.error('Wystąpił błąd');
        console.error(error);
    })
}

// Dodaj dowolnego zewnętrznego providera
// 1. Dodaj przycisk dla wybranego providera np Facebook, Apple, Twitter, Github...
// 2. Dodaj obsługę przycisku