import { deleteObject, uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";

export const uploadImage = async (storage, file) => {
    const fileRefInStorage = ref(storage, 'images/' + file.name);

    return uploadBytes(fileRefInStorage, file);
} 

export const deleteImage = async (storage, fullPath) => {
    // images/506072-god-of-war-playstation-4-front-cover.jpeg
    
    const imageRef = ref(storage, fullPath);

    return deleteObject(imageRef);
}

// TODO: Usun obrazek po usunieciu produktu z bazy danych