/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {FullMovie, Cast} from '../../../core/entities';
import {Formatter} from '../../../config/helpers/formatter';
import {CastActor} from '../';

type Props = {
  movie: FullMovie;
  cast: Cast[];
};

export const MovieDetails = ({movie, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{movie.rating}</Text>

          <Text style={{marginLeft: 5}}>- {movie.genres.join(', ')}</Text>
        </View>
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Summary
        </Text>
        <Text style={{fontSize: 16}}>{movie.description}</Text>
        <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          Budget
        </Text>
        <Text style={{fontSize: 18}}>{Formatter.currency(movie.budget)}</Text>
      </View>
      {/* Casting */}
      <View style={{marginTop: 10, marginBottom: 100}}>
        <Text
          style={{
            fontSize: 23,
            marginVertical: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
          }}>
          Casting
        </Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CastActor actor={item} />}
        />
      </View>
    </>
  );
};
