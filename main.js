import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap/dist/js/bootstrap';
import './style.css';

import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initAddPage } from './add';
import { firebaseConfig } from './config';
import { initIndexPage } from './index';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initRegisterPage } from './register';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gamesCollection = collection(db, 'games');

const storage = getStorage(app);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log
  if (user) {
    initIndexPage(db, gamesCollection, storage);
    initAddPage(gamesCollection, storage);
  } else {
    if (window.location.pathname === '/register.html') {
      return;
    }

    alert('Jesteś niezalogowany!');

    window.location.href = window.location.origin + '/register.html';
  }
})

initRegisterPage(auth);

console.log(window.location);

// TODO 2:
// 1. Dodaj plik login.html
// 2. Utwórz formularz rejestracji, posiadający dwa pola
// EMAIL i PASSWORD
// 3. Dodaj plik login.js, w którym obsłuzysz wysylanie formularza
