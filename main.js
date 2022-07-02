import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap/dist/js/bootstrap';
import './style.css';

import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initAddPage } from './add';
import { firebaseConfig } from './config';
import { initIndexPage } from './index';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gamesCollection = collection(db, 'games');

const storage = getStorage(app);
const imagesRef = ref(storage, 'image');

const coverRef = ref(storage, 'images/506072-god-of-war-playstation-4-front-cover.jpeg');

console.log(coverRef);

initIndexPage(gamesCollection);
initAddPage(gamesCollection, storage);