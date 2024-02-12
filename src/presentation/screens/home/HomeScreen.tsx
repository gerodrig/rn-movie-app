/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  FullScreenLoader,
  HorizontalCarrousel,
  PosterCarrousel,
} from '../../components';
import {useMovies} from '../../hooks/useMovies';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, upcoming, topRated, popularNextPage} =
    useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        <PosterCarrousel movies={nowPlaying} />

        {/* Popular movies */}
        <HorizontalCarrousel
          movies={popular}
          title="Populars"
          loadNextPage={popularNextPage}
        />

        {/* Top Rated movies */}
        <HorizontalCarrousel movies={topRated} title="Top Rated Movies" />

        {/* Coming soon movies */}
        <HorizontalCarrousel movies={upcoming} title="Coming Soon" />
      </View>
    </ScrollView>
  );
};
