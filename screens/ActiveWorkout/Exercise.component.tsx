import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Exercise as ExerciseType } from '../../types/data.types';
import { Text } from '../../utils/styles/DefaultComponents';

interface ExerciseProps {
  exercise: ExerciseType;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Text>{exercise.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Exercise;
