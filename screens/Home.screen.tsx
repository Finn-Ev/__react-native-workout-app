import React from 'react';
import { Text } from '../utils/styles/DefaultComponents';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeTabParamList } from '../types/navigation.types';
import Colors from '../constants/Colors';
import { defaultScreenStyles } from '../utils/styles/mixins';
import { fontSize } from '../constants';

interface HomeScreenProps {}

const HomeScreen: React.FC<
  HomeScreenProps & StackScreenProps<HomeTabParamList, 'Home'>
> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: fontSize.lg }}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
});

export default HomeScreen;
