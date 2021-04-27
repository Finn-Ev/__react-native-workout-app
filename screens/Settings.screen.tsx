import React from 'react';
import { Text } from '../utils/styles/DefaultComponents';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeTabParamList } from '../types/navigation.types';
import Colors from '../constants/Colors';
import { defaultScreenStyles } from '../utils/styles/mixins';

interface HomeScreenProps {}

const HomeScreen: React.FC<
  HomeScreenProps & StackScreenProps<HomeTabParamList, 'Settings'>
> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Einstellungen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
});

export default HomeScreen;
