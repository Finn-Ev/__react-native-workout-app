import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../utils/styles/DefaultComponents';
import { defaultScreenStyles } from '../utils/styles/mixins';

interface FinishedWorkoutScreenProps {}

const FinishedWorkoutScreen: React.FC<FinishedWorkoutScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Finished Workout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
});

export default FinishedWorkoutScreen;
