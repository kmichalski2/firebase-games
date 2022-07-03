import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap/dist/js/bootstrap';
import './style.css';

import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initAddPage } from './add';
import { firebaseConfig } from './config';
import { initIndexPage } from './index';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { initRegisterPage } from './register';
import { initLoginPage} from './login';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gamesCollection = collection(db, 'games');

const storage = getStorage(app);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    const allowedUrls = [
      '/register.html',
      '/login.html'
    ]

    if (allowedUrls.includes(window.location.pathname)) {
      return;
    }

    window.location.href = window.location.origin + '/login.html';
  }
})

initIndexPage(db, gamesCollection, storage);
initAddPage(gamesCollection, storage);

const signOutLink$ = document.querySelector('#signOutLink');

if (signOutLink$) {
  signOutLink$.addEventListener('click', event => {
    event.preventDefault();

    signOut(auth).then(() => {
      window.location.href = window.location.origin + '/login.html';
    });
  })
}

initRegisterPage(auth);
initLoginPage(auth);

