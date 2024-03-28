import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { storage } from '@/config/firebase.config'

export const uploadImage = async (file: File, storageName: string) => {
  try {
    const nameFille = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, `${storageName}/${nameFille}`)

    const snapshot = await uploadBytes(storageRef, file)

    const url = await getDownloadURL(snapshot.ref)
    return url
  } catch (error) {
    return false
  }
}

export const deleteImage = async (url: string) => {
  try {
    const imageRef = ref(storage, url)
    await deleteObject(imageRef)
    return true
  } catch (error) {
    return false
  }
}

export const uploadProductImage = async (file: File) =>
  await uploadImage(file, 'products')
