import {Result, FullMovieResponse} from '../interfaces';
import {FullMovie, Movie} from '../../core/entities';

export class MovieMapper {
  static fromMovieDBResultToEntity(result: Result): Movie {
    return {
      id: result.id ?? 0,
      title: result.title ?? '',
      description: result.overview ?? '',
      releaseDate: new Date(result.release_date) ?? new Date(),
      rating: result.vote_average ?? 0,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }

  static fromMovieDBToEntity(movie: FullMovieResponse): FullMovie {
    return {
      id: movie.id ?? 0,
      title: movie.title ?? '',
      description: movie.overview ?? '',
      releaseDate: new Date(movie.release_date) ?? new Date(),
      rating: movie.vote_average ?? 0,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      genres: movie.genres.map(genre => genre.name) ?? [],
      duration: movie.runtime ?? 0,
      budget: movie.budget ?? 0,
      originalTitle: movie.original_title ?? '',
      productionCompanies:
        movie.production_companies.map(company => company.name) ?? [],
    };
  }
}
