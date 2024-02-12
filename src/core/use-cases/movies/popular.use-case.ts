import {HttpAdapter} from '../../../config/adapters';
import {PopularResponse} from '../../../infrastructure/interfaces';
import {Movie} from '../../entities';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

type Options = {
  page?: number;
  limit?: number;
};

export const moviesPopularUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<PopularResponse>('/popular', {
      params: {
        page: options?.page ?? 1,
      },
    });

    return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching popular movies');
  }
};
