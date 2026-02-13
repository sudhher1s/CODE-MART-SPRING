import React, { useCallback, useEffect, useState } from 'react';
import '../styles/Refreshments.css';

const Refreshments = () => {
  const [query, setQuery] = useState('batman');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_OMDB_API_KEY;

  const searchMovies = useCallback(async (searchText) => {
    if (!apiKey) {
      setError('OMDB API key is missing in environment variables.');
      return;
    }

    setLoading(true);
    setError('');
    setSelectedMovie(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchText)}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search || []);
      } else {
        setMovies([]);
        setError(data.Error || 'No movies found');
      }
    } catch (err) {
      console.error('Movie search failed:', err);
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const loadMovieDetails = useCallback(async (imdbId) => {
    if (!apiKey) {
      return;
    }

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}&plot=full`);
      const data = await response.json();
      if (data.Response === 'True') {
        setSelectedMovie(data);
      }
    } catch (err) {
      console.error('Movie details fetch failed:', err);
    }
  }, [apiKey]);

  useEffect(() => {
    searchMovies('batman');
  }, [searchMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      setError('Please enter a movie name.');
      return;
    }
    searchMovies(cleanQuery);
  };

  return (
    <div className="refreshments-page">
      <section className="refreshments-hero">
        <h1>Refreshments Zone</h1>
        <p>Take a break and explore movies while you build, buy, and sell projects.</p>
        <form onSubmit={handleSubmit} className="movie-search-form">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies like Interstellar, Batman, Inception..."
          />
          <button type="submit">Search</button>
        </form>
      </section>

      {loading && <div className="movie-info">Searching movies...</div>}
      {error && !loading && <div className="movie-error">{error}</div>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <button
            type="button"
            className="movie-card"
            key={movie.imdbID}
            onClick={() => loadMovieDetails(movie.imdbID)}
          >
            <img
              src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x420?text=No+Poster'}
              alt={movie.Title}
            />
            <div className="movie-meta">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedMovie && (
        <section className="movie-details">
          <h2>{selectedMovie.Title} ({selectedMovie.Year})</h2>
          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
          <p><strong>Language:</strong> {selectedMovie.Language}</p>
          <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </section>
      )}
    </div>
  );
};

export default Refreshments;
