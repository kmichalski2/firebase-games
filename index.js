

import { getGamesByName, getGamesByPrice, deleteGame } from "./games";


const addItemToList = (gamesList$, doc) => {
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

const displayGamesByName = (gamesList$, gamesCollection, givenName) => {
  getGamesByName(gamesCollection, givenName).then(snapshot => {
    snapshot.docs.forEach(doc => {
      addItemToList(gamesList$, doc);
    })
  })
}

const displayGamesByPrice = (gamesList$, gamesCollection, priceFrom, priceTo) => {
  getGamesByPrice(gamesCollection, priceFrom, priceTo).then(snapshot => {
    snapshot.docs.forEach(doc => {
      addItemToList(gamesList$, doc);
    })
  })
}

export const initIndexPage = (gamesCollection) => {
    const gamesList$ = document.querySelector('#gamesList');
    const searchForm$ = document.querySelector('#searchForm');
  
    if (searchForm$) {
      searchForm$.addEventListener('submit', (event) => {
        event.preventDefault();
      
        gamesList$.innerHTML = '';
      
        const formData = new FormData(searchForm$);
      
        displayGamesByName(gamesList, gamesCollection, formData.get('searchPhrase'));
      })
    }
  
    const filterForm$ = document.querySelector('#filterForm');
  
    if (filterForm$) {
      filterForm$.addEventListener('submit', (event) => {
        event.preventDefault();
      
        gamesList$.innerHTML = '';
      
        const formData = new FormData(filterForm$);
      
        displayGamesByPrice(gamesList, gamesCollection, formData.get('priceFrom'), formData.get('priceTo'));
      });
    }

    if (gamesList$) {
        displayGamesByName(gamesList, gamesCollection);
      }
  }