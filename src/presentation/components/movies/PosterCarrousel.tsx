import React from 'react';
import {ScrollView, View} from 'react-native';
import {Movie} from '../../../core/entities';
import {MoviePoster} from '..';

type Props = {
  movies: Movie[];
  height?: number;
};

export const PosterCarrousel = ({height = 440, movies}: Props) => {
  return (
    <View style={{height}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map(movie => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
};
