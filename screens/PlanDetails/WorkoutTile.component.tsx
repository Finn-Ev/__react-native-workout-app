import React from 'react';
import { StyleSheet, View } from 'react-native';
import { fontSize, spacing } from '../../constants';
import Colors from '../../constants/Colors';
import { Workout } from '../../types/data.types';
import { Text } from '../../utils/styles/DefaultComponents';

interface WorkoutTileProps {
  workout: Workout;
}

const WorkoutTile: React.FC<WorkoutTileProps> = ({ workout }) => {
  return (
    <View style={styles.container} key={workout.day + workout.week}>
      <Text style={styles.name}>{workout.name}</Text>
      {workout.exercises.map(exercise => (
        <Text key={exercise.name} style={{ paddingTop: 5 }}>
          {exercise?.name}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.contentBackground,
    padding: spacing.md,
    marginTop: spacing.md,
    borderRadius: 10,
  },
  name: {
    fontSize: fontSize.md + 2,
  },
});

export default WorkoutTile;
