import { storage } from 'util/firebase';
// Create a root reference

import { collection, addDoc } from 'firebase/firestore';
import { db } from 'util/firebase';
import Button from 'components/Button';
import newFilmData from './new-film-data';

// Usage:

// Create a reference to 'mountains.jpg'

const MovieFilmImport = () => {
  async function addFilmsToCollection(filmArray) {
    for (const film of filmArray) {
      try {
        const docRef = await addDoc(collection(db, 'films'), film);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  }
  const handleClick = async (e) => {
    e.preventDefault();

    // Create a reference to 'images/mountains.jpg'

    // While the file names are the same, the references point to different files
    //const urls = await addFilmsToCollection()
    // await addFilmsToCollection(newFilmData.slice(0,5))
    await addFilmsToCollection(newFilmData);
  };

  return (
    <>
      {' '}
      <div style={{ marginTop: '5em', marginBottom: '5em' }}>
        <Button type="button" variant="gradient" color="info" onClick={handleClick}>
          Update Films!
        </Button>
      </div>
    </>
  );
};

export default MovieFilmImport;
