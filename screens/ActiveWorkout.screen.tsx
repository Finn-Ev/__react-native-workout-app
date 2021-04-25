import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Text } from '../utils/Themed';
import { ActiveWorkoutTabParamList, PlansTabParamList } from '../types';
import Colors from '../constants/Colors';

interface ActiveWorkoutScreenProps {}

const ActiveWorkoutScreen: React.FC<
  ActiveWorkoutScreenProps &
    StackScreenProps<ActiveWorkoutTabParamList, 'ActiveWorkout'>
> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ActiveWorkout</Text>

      <Button
        onPress={() => navigation.navigate('Home')}
        title={'Home'}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default ActiveWorkoutScreen;
