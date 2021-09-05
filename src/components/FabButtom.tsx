import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text} from 'react-native';

type Props = {
  text: string;
  onPress: any;
};

export const FabButtom = ({onPress, text}: Props) => {
  return (
    <TouchableOpacity style={styles.fabCont} onPress={onPress}>
      <Text testID={'Text'} style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 18},
  fabCont: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5555ff',
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    borderRadius: 120,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 1,
    elevation: 5,
  },
});
