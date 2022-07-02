

import { getGamesByName, getGamesByPrice, deleteGame } from "./games";
import { deleteImage } from "./storage";


const addItemToList = (db, gamesList$, doc, storage) => {
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

    deleteGame(db, target.id, storage).then(result => {
      console.log(`Gra o numerze ${target.id} została usunięta!`);
    })

  });

  item.append(deleteButton);

  gamesList$.append(item);
}

const displayGamesByName = (db, gamesList$, gamesCollection, givenName, storage) => {
  getGamesByName(gamesCollection, givenName).then(snapshot => {
    snapshot.docs.forEach(doc => {
      addItemToList(db, gamesList$, doc, storage);
    })
  })
}

const displayGamesByPrice = (db, gamesList$, gamesCollection, priceFrom, priceTo, storage) => {
  getGamesByPrice(gamesCollection, priceFrom, priceTo).then(snapshot => {
    snapshot.docs.forEach(doc => {
      addItemToList(db, gamesList$, doc, storage);
    })
  })
}

export const initIndexPage = (db, gamesCollection, storage) => {
    const gamesList$ = document.querySelector('#gamesList');
    const searchForm$ = document.querySelector('#searchForm');
  
    if (searchForm$) {
      searchForm$.addEventListener('submit', (event) => {
        event.preventDefault();
      
        gamesList$.innerHTML = '';
      
        const formData = new FormData(searchForm$);
      
        displayGamesByName(db, gamesList$, gamesCollection, formData.get('searchPhrase'), storage);
      })
    }
  
    const filterForm$ = document.querySelector('#filterForm');
  
    if (filterForm$) {
      filterForm$.addEventListener('submit', (event) => {
        event.preventDefault();
      
        gamesList$.innerHTML = '';
      
        const formData = new FormData(filterForm$);
      
        displayGamesByPrice(db, gamesList$, gamesCollection, formData.get('priceFrom'), formData.get('priceTo'), storage);
      });
    }

    if (gamesList$) {
        displayGamesByName(db, gamesList$, gamesCollection, '', storage);
      }
  }