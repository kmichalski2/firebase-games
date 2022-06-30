import './style.css'
import './node_modules/bootstrap/dist/css/bootstrap.min.css';

import { initializeApp } from "firebase/app";
import { doc, addDoc, collection, deleteDoc, getDoc, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from './config';
import { deleteGame, getGamesByName, getGamesByPrice } from './games';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gamesCollection = collection(db, 'games');

const gamesList$ = document.querySelector('#gamesList');

const displayGamesByName = (givenName) => {
  getGamesByName(gamesCollection, givenName).then(snapshot => {
    snapshot.docs.forEach(doc => {
  
  
      const item = document.createElement('li');
      item.innerHTML = doc.data().name;
      item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  
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
    })
  })
}

// TODO: Dodaj obsługę formularza wyszukiwania, tak aby wyszukiwał i wyświetlał tylko
// produkty o określonej nazwie

const addGameForm$ = document.querySelector('#addGameForm');

addGameForm$.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(addGameForm$);

  addGame(gamesCollection, formData.get('name'), formData.get('price'), formData.get('type')).then(result => {
    console.log('Nowa gra została dodana');
  })
});

const searchForm$ = document.querySelector('#searchForm');

searchForm$.addEventListener('submit', (event) => {
  event.preventDefault();

  gamesList$.innerHTML = '';

  const formData = new FormData(searchForm$);

  displayGamesByName(formData.get('searchPhrase'));
})


const messagesColection = collection(db, 'messages');

onSnapshot(messagesColection, (querySnapshot) => {
  querySnapshot.docs.forEach(doc => {
    console.log(`${doc.data().senderName}: ${doc.data().content}`);
  })
})