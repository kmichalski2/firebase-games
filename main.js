import './style.css'
import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './node_modules/bootstrap/dist/js/bootstrap';

import { initializeApp } from "firebase/app";
import { doc, addDoc, collection, deleteDoc, getDoc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from './config';
import { deleteGame, getGamesByName, getGamesByPrice } from './games';
import { initAddPage } from './add';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gamesCollection = collection(db, 'games');

const gamesList$ = document.querySelector('#gamesList');

const addItemToList = (doc) => {
  const image = document.createElement('img');
  image.src = doc.data().url;
  image.classList.add('img-thumbnail');
  image.style.width = '100px';

  const item = document.createElement('li');
  item.innerHTML = `${doc.data().name} | Cena: ${doc.data().price} PLN`;
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.prepend(image);

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.classList.add('btn', 'btn-warning');
  deleteButton.id = doc.id;

  deleteButton.addEventListener('click', (event) => {
    const target = event.currentTarget;

    deleteGame(db, target.id).then(result => {
      console.log(`Gra o numerze ${target.id} została usunięta!`);
    })

  });

  item.append(deleteButton);

  gamesList$.append(item);
}

const displayGamesByName = (givenName) => {
  getGamesByName(gamesCollection, givenName).then(snapshot => {
    snapshot.docs.forEach(doc => {
      addItemToList(doc);
    })
  })
}

const displayGamesByPrice = (priceFrom, priceTo) => {
  getGamesByPrice(gamesCollection, priceFrom, priceTo).then(snapshot => {
    snapshot.docs.forEach(doc => {
      addItemToList(doc);
    })
  })
}

const initIndexPage = (gamesCollection) => {
  const searchForm$ = document.querySelector('#searchForm');

  if (searchForm$) {
    searchForm$.addEventListener('submit', (event) => {
      event.preventDefault();
    
      gamesList$.innerHTML = '';
    
      const formData = new FormData(searchForm$);
    
      displayGamesByName(formData.get('searchPhrase'));
    })
  }

  const filterForm$ = document.querySelector('#filterForm');

  if (filterForm$) {
    filterForm$.addEventListener('submit', (event) => {
      event.preventDefault();
    
      gamesList$.innerHTML = '';
    
      const formData = new FormData(filterForm$);
    
      displayGamesByPrice(formData.get('priceFrom'), formData.get('priceTo'));
    });
  }
}

initIndexPage(gamesCollection);
initAddPage(gamesCollection);

displayGamesByName();

// Zadania
// Dodaj obrazki dla wszystkich produktów
// Dodaj pole url do formularza, które pozwoli dodać obrazek