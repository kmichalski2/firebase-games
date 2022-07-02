import { addGame } from "./games";
import { uploadImage } from "./storage";

export const initAddPage = (gamesCollection, storage) => {
    const addGameForm$ = document.querySelector('#addGameForm');

    if (addGameForm$) {
        addGameForm$.addEventListener('submit', (event) => {
            event.preventDefault();
          
            const formData = new FormData(addGameForm$);

            uploadImage(storage, formData.get('file')).then(result => {
                const firebaseStorageUrl = 'https://firebasestorage.googleapis.com/v0/b';
                const bucketUrl = result.metadata.bucket;
                const fullPath = result.metadata.fullPath;

                const url = `${firebaseStorageUrl}/${bucketUrl}/o/${encodeURIComponent(fullPath)}?alt=media`;

                addGame(gamesCollection, formData.get('name'), formData.get('price'), formData.get('type'), url).then(result => {
                    console.log('Nowa gra została dodana');
                })
            })
          });
    }
}