import { doc, deleteDoc } from 'firebase/firestore';

// TODO: Dodaj wszystkie metody które operują na kolecji "games"
export const deleteGame = async (database, id) => {
    const docRef = await doc(database, 'games', id);
  
    return deleteDoc(docRef);
}