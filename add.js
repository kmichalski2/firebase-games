import { addGame } from "./games";

export const initAddPage = (gamesCollection) => {
    const addGameForm$ = document.querySelector('#addGameForm');

    if (!addGameForm$) {
        return;
    }

    addGameForm$.addEventListener('submit', (event) => {
        event.preventDefault();
      
        const formData = new FormData(addGameForm$);
      
        addGame(gamesCollection, formData.get('name'), formData.get('price'), formData.get('type')).then(result => {
          console.log('Nowa gra została dodana');
        })
      });
}