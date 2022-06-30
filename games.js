import { doc, deleteDoc, collection } from 'firebase/firestore';

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

  