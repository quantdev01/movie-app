import '../css/MovieCard.css'
import { useMoviecontext } from '../contexts/MovieContext';

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMoviecontext();
    const favorite = isFavorite(movie.id);

    function onLicked(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
    let redHeart = '&#10084;&#65039;';
    let whiteHeart = "&#129293;";
    return <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie.title" />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onLicked}>&#129293;</button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>

    </div>
}

export default MovieCard