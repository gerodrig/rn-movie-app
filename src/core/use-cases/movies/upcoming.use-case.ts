import {HttpAdapter} from '../../../config/adapters';
import {UpcomingResponse} from '../../../infrastructure/interfaces';
import {Movie} from '../../entities';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

export const moviesUpcomingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<UpcomingResponse>('/upcoming');

    return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching upcoming movies');
  }
};
