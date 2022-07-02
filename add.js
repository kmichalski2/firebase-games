import { addGame } from "./games";
import { uploadImage } from "./storage";
import { getDownloadURL } from "firebase/storage";

export const initAddPage = (gamesCollection, storage) => {
    const addGameForm$ = document.querySelector('#addGameForm');

    if (addGameForm$) {
        addGameForm$.addEventListener('submit', (event) => {
            event.preventDefault();
          
            const formData = new FormData(addGameForm$);

            uploadImage(storage, formData.get('file')).then(result => {
                getDownloadURL(result.ref).then(downloadUrl => {
                    const imagePath = result.metadata.fullPath;

                    addGame(gamesCollection, formData.get('name'), formData.get('price'), formData.get('type'), downloadUrl, imagePath).then(result => {
                        console.log('Nowa gra została dodana');
                    })
                })
          });
        });
    }
}