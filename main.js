import './style.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, addDoc, collection, deleteDoc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from './config';
import { deleteGame } from './games';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gamesCollection = collection(db, 'games');

const gamesList$ = document.querySelector('#gamesList');

getDocs(gamesCollection).then(snapshot => {
  snapshot.docs.forEach(doc => {
    const item = document.createElement('li');
    item.innerHTML = doc.data().name;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
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

const addGame = async (name, price, type) => {
  const newGame = {
    name: name,
    price: price,
    type: type
  }

  return addDoc(gamesCollection, newGame);
}

const addGameForm$ = document.querySelector('#addGameForm');

addGameForm$.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(addGameForm$);

  addGame(formData.get('name'), formData.get('price'), formData.get('type')).then(result => {
    console.log('Nowa gra została dodana');
  })
});
