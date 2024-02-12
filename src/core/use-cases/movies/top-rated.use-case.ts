import {HttpAdapter} from '../../../config/adapters';
import {TopRatedResponse} from '../../../infrastructure/interfaces';
import {Movie} from '../../entities';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<TopRatedResponse>('/top_rated');

    return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching top rated movies');
  }
};
