import { addDoc, doc, deleteDoc, collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';

// TODO: Dodaj wszystkie metody które operują na kolecji "games"
export const deleteGame = async (database, id) => {
    const docRef = await doc(database, 'games', id);
  
    return deleteDoc(docRef);
}

export const addGame = async (collection, name, price, type) => {
    const newGame = {
      name: name,
      price: price,
      type: type
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