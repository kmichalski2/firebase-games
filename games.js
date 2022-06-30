import { doc, deleteDoc, collection, query, getDocs, where } from 'firebase/firestore';

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
    const gamesByNameQuery = query(collection, where('name', '==', givenName));

    // TODO: Zwróc wszystkie produkty jeśli givenName jest niepodane
    // Zwróc produkty o podanej nazwie kiedy jest podany givenName

    return getDocs(gamesByNameQuery);
}