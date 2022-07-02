import { deleteObject, uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";

export const uploadImage = async (storage, file) => {
    const fileRefInStorage = ref(storage, 'images/' + file.name);

    return uploadBytes(fileRefInStorage, file);
} 

export const deleteImage = async (storage, fullPath) => {
    const imageRef = ref(storage, fullPath);

    return deleteObject(imageRef);
}