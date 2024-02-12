import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {FullMovie} from '../../entities/movie.entity';
import {FullMovieResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    //? Use fetcher to get movie by id
    const movie = await fetcher.get<FullMovieResponse>(`/${movieId}`);

    //? Map the result to FullMovie
    return MovieMapper.fromMovieDBToEntity(movie);
  } catch (error) {
    throw new Error('Error fetching movie by id');
  }
};
