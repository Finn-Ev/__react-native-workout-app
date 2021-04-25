import React from 'react';
import { Text } from '../utils/Themed';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeTabParamList } from '../types';

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
  container: { flex: 1 },
});

export default HomeScreen;
