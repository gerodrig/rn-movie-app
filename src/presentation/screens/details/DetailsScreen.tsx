import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader, MovieDetails, FullScreenLoader} from '../../components/';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;

  const {isLoading, movie, cast} = useMovie(movieId);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // console.log(movie);

  return (
    <ScrollView>
      {/* Header  */}
      <MovieHeader
        originalTitle={movie!.originalTitle}
        poster={movie!.poster}
        title={movie!.title}
      />

      {/* Details */}
      <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  );
};
