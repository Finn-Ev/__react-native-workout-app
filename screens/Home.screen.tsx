import React from 'react';
import { Text } from '../utils/DefaultComponents';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeTabParamList } from '../types/navigation.types';
import Colors from '../constants/Colors';

interface HomeScreenProps {}

const HomeScreen: React.FC<
  HomeScreenProps & StackScreenProps<HomeTabParamList, 'Home'>
> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
