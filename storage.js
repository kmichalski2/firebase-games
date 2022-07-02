import { uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";

export const uploadImage = async (storage, file) => {
    const fileRefInStorage = ref(storage, 'images/' + file.name);

    return uploadBytes(fileRefInStorage, file);
} 

// Dodaj pole file do formularza Add Product
// Formularz powinien zarowno dodac Produkt 
// i wgrać plik do folderu images