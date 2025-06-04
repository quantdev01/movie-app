import { use, useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import { searchMovies, getPopularMovies } from "../services/api"
import '../css/Home.css'

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [e, setE] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loaddPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies)

            } catch (e) {
                setE("Failed to load movies...");
                
            }
            finally {
                setLoading(false)
            }

        }
        loaddPopularMovies();
    }, [])
    const submitting = async (e)  => {
        e.preventDefault()
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery);  
            setMovies(searchResults)
            setE(null)
        } catch (e) {
            console.log(e)
            setE('Failed to fetch movies')
        } finally {
            setLoading(false)
        }
    }
    return <div className="home">
        
            <form onSubmit={submitting} className="search-form">
                <input type="text" placeholder="Search for movies" className="search-input" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
        </form>
        {e && <div className="error-message">{e}</div>}
        {loading ? <div className="loading">Loading...</div> : <div className="movies-grid">
            {movies.map(movie => <MovieCard movie={movie} key={movie.id} />)}
        </div>}
    </div>


}

export default Home;