import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters';
import {Cast, FullMovie} from '../../core/entities';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    loadMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const loadMovie = async () => {
    try {
      setIsLoading(true);
      // const movieResponse = await getMovieByIdUseCase(movieDBFetcher, movieId);
      const [movieResponse, castResponse] = await Promise.all([
        UseCases.getMovieByIdUseCase(movieDBFetcher, movieId),
        UseCases.getMovieCastUseCase(movieDBFetcher, movieId),
      ]);

      setMovie(movieResponse);
      setCast(castResponse);
      setIsLoading(false);
    } catch (error) {
      throw new Error('Error loading movie');
    }
  };

  return {
    isLoading,
    movie,
    cast,
  };
};
