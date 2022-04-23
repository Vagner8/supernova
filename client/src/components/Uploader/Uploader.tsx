import { useEffect, useState } from 'react';
import { ChangeHandler } from '../../share/shareTypes';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid';

const firebaseConfig = {
  apiKey: 'AIzaSyDhZ-LsToHMH4zNzb_rDTTfegPrZrG6hzE',
  authDomain: 'vagner-bbf3e.firebaseapp.com',
  projectId: 'vagner-bbf3e',
  storageBucket: 'vagner-bbf3e.appspot.com',
  messagingSenderId: '659172774715',
  appId: '1:659172774715:web:17f115c923c8fdef219d1e',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export function Uploader() {
  const [images, setImages] = useState<any>(null);
  useEffect(() => {

  }, [])

  const onChange: ChangeHandler = ({ target }) => {
    if (target.files) {
      console.log(target.files);
      setImages(target.files);
    }
  };

  async function upload() {
    if (images === null) return;
    for await (let image of images) {
      const imageRef = ref(storage, `img/${image.name}${uniqid()}`)
      await uploadBytes(imageRef, image)
    }
  }

  return (
    <>
      <div className="file-field input-field">
        <div className="btn">
          <span>File</span>
          <input onChange={onChange} type="file" multiple />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            placeholder="Upload one or more files"
          />
        </div>
      </div>

      <button onClick={upload}>button</button>
    </>
  );
}
