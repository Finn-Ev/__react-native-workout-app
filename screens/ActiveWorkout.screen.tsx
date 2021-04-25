import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { ActiveWorkoutTabParamList } from '../types/navigation.types';
import { Text } from '../utils/DefaultComponents';

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
