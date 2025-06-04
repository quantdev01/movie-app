import '../css/Favorites.css'
import { useMoviecontext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorite() {
    const { favorites } = useMoviecontext();
    if (favorites) {
        return <div className='favorites'>
            <h2>Your favorites movies</h2>
            <div className="movies-grid">
        {favorites.map(movie => <MovieCard movie={movie} key={movie.id} />)}
        </div>
            </div>
    }
    return <div className="favorites-empty">
        <h2>No liked movie</h2>
        <p>Add something</p>
    </div>
}

export default Favorite