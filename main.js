import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap/dist/js/bootstrap';
import './style.css';

import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { initAddPage } from './add';
import { firebaseConfig } from './config';
import { initIndexPage } from './index';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gamesCollection = collection(db, 'games');

initIndexPage(gamesCollection);
initAddPage(gamesCollection);