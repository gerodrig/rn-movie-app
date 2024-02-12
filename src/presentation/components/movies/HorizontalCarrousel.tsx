/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import {MoviePoster} from './MoviePoster';
import {Movie} from '../../../core/entities';

type Props = {
  movies: Movie[];
  title: string;
  loadNextPage?: () => void;
};

export const HorizontalCarrousel = ({movies, title, loadNextPage}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) {
      return;
    }
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    const isCloseToEdge =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isCloseToEdge) {
      return;
    }

    isLoading.current = true;

    //? Load more movies
    loadNextPage && loadNextPage();
  };
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontWeight: '300',
            marginLeft: 10,
            marginBottom: 10,
          }}>
          {title}
        </Text>
      )}
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={(item, index) => item.id.toString() + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};
