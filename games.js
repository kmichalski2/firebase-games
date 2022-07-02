import { addDoc, doc, deleteDoc, collection, query, getDocs, where, orderBy, limit, getDoc } from 'firebase/firestore';
import { deleteImage } from './storage';

// TODO: Dodaj wszystkie metody które operują na kolecji "games"
export const deleteGame = async (database, id, storage) => {
    const docRef = await doc(database, 'games', id);

    return getDoc(docRef).then(doc => {
        return deleteDoc(docRef).then(result => {
            deleteImage(storage, doc.data().imagePath)
        });
    })
}

export const addGame = async (collection, name, price, type, url, imagePath) => {
    const newGame = {
      name: name,
      price: price,
      type: type,
      url: url,
      imagePath: imagePath
    }
  
    return addDoc(collection, newGame);
  }

export const getGamesByName = async (collection, givenName) => {
    if (givenName !== undefined && givenName !== '') {
        const gamesByNameQuery = query(collection, where('name', '==', givenName));
        return getDocs(gamesByNameQuery);
    } 

    return getDocs(collection);
}

export const getGamesByPrice = async (collection, priceFrom, priceTo) => {
    const gamesToPriceQuery = query(collection, 
        where('price', '<=', parseInt(priceTo)),
        where('price', '>=', parseInt(priceFrom)),
        orderBy('price', 'desc')
        );

    return getDocs(gamesToPriceQuery);
}