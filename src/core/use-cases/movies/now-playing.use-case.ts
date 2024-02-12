import {HttpAdapter} from '../../../config/adapters';
import {NowPlayingResponse} from '../../../infrastructure/interfaces';
import {Movie} from '../../entities';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');

    return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity);
  } catch (error) {
    throw new Error('Error fetching now playing movies');
  }
};
