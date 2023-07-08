import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {db} from "util/firebase";
function MovieDetailPage() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const moviesCollection = collection(db, "films");
      const q = query(moviesCollection, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      // As 'slug' is unique, there should be at most one match
      querySnapshot.forEach((doc) => {
        setMovie(doc.data());
      });
    };

    fetchMovie();
  }, [slug]);

  if (!movie) return "Loading...";

  return (
    // Render movie details
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} />
      {/* Other details */}
    </div>
  );
}

export default MovieDetailPage;
