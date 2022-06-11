import { deleteObject, listAll, ref } from "firebase/storage";
import { storage } from "./firebaseConfig";

export async function deleteAllFilesInFolder (path: string) {
  const { items } = await listAll(ref(storage, path));
  const desertRefs = items.map(item => ref(storage, item.fullPath))
  await Promise.all(desertRefs.map(desertRef => deleteObject(desertRef)))
}