import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { storage } from '@/config/firebase.config'

export const uploadProductImage = async (file: File) => {
  try {
    const nameFille = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, `products/${nameFille}`)

    const snapshot = await uploadBytes(storageRef, file)

    const url = await getDownloadURL(snapshot.ref)
    return url
  } catch (error) {
    return false
  }
}

export const deleteProductImage = async (url: string) => {
  console.log('url', url)
  try {
    const imageRef = ref(storage, url)
    const response = await deleteObject(imageRef)
    console.log('response', response)

    return true
  } catch (error) {
    return false
  }
}
