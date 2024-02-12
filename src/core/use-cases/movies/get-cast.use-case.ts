import {HttpAdapter} from '../../../config/adapters';
import {MovieDBCastResponse} from '../../../infrastructure/interfaces';
import {CastMapper} from '../../../infrastructure/mappers/cast.mapper';
import {Cast} from '../../entities';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movideId: number,
): Promise<Cast[]> => {
  try {
    const {cast} = await fetcher.get<MovieDBCastResponse>(
      `/${movideId}/credits`,
    );

    const actors = cast.map(actor => CastMapper.fromMovieDBCastToEntity(actor));

    return actors;
  } catch (error) {
    throw new Error('Error fetching movie cast');
  }
};
