import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases/';
import {movieDBFetcher} from '../../config/adapters/';

let popularPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const [nowPlayingMovies, topRatedMovies, popularMovies, upcomingMovies] =
        await Promise.all([
          UseCases.moviesNowPlayingUseCase(movieDBFetcher),
          UseCases.moviesTopRatedUseCase(movieDBFetcher),
          UseCases.moviesPopularUseCase(movieDBFetcher),
          UseCases.moviesUpcomingUseCase(movieDBFetcher),
        ]);

      setNowPlaying(nowPlayingMovies);
      setTopRated(topRatedMovies);
      setPopular(popularMovies);
      setUpcoming(upcomingMovies);
      setIsLoading(false);
    } catch (error) {
      // Handle error
      console.error(error);
      throw new Error('Error loading movies');
    }
  };

  return {
    isLoading,
    nowPlaying,
    topRated,
    popular,
    upcoming,

    //? Methods
    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher,
        {page: popularPageNumber},
      );
      setPopular(prev => [...prev, ...popularMovies]);
    },
  };
};
