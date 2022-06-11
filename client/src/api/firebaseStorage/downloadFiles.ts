import { getDownloadURL, uploadBytes } from "firebase/storage";
import { createNewRefs } from "./createNewRefs";

export async function downloadFiles(files: File[], path: (string| null)[]) {
  const newRefs = createNewRefs({ files, path: path.join('/') });
  await Promise.all(
    newRefs.map(([storageRef, file]) => uploadBytes(storageRef, file)),
  );
  return await Promise.all(
    newRefs.map(([storageRef]) => getDownloadURL(storageRef)),
  );
}