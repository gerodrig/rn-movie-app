import React from 'react';
import {Cast} from '../../../core/entities/cast.entity';
import {Image, StyleSheet, Text, View} from 'react-native';

type Props = {
  actor: Cast;
};

export const CastActor = ({actor}: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.actorImage} source={{uri: actor.avatar}} />
      <View style={styles.actorInfo}>
        <Text style={styles.actorInfoText}>{actor.name}</Text>
        <Text style={styles.characterInfoText}>{actor.character}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
  actorImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  actorInfoText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  characterInfoText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
