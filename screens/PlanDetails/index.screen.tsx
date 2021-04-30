import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button.component';
import { fontSize, spacing } from '../../constants';
import Colors from '../../constants/Colors';
import { useActiveWorkoutContext } from '../../context/activeWorkout.context';
import { usePlanContext } from '../../context/plan.context';
import plans from '../../data';
import { Workout } from '../../types/data.types';
import { PlansTabParamList } from '../../types/navigation.types';
import { Text } from '../../utils/styles/DefaultComponents';
import { defaultScreenStyles } from '../../utils/styles/mixins';
import WorkoutTile from './WorkoutTile.component';

interface PlanDetailsScreenProps {}

const PlanDetailsScreen: React.FC<
  PlanDetailsScreenProps & StackScreenProps<PlansTabParamList, 'PlanDetails'>
> = ({ navigation, route: { params } }) => {
  const selectedPlan = plans.find(plan => params.planId === plan.id);

  if (!selectedPlan) return null;

  const exampleWeek: Workout[] = selectedPlan?.workouts.filter(
    workout => workout.week === 1
  );

  const {
    activePlanId,
    setPlanAsActive,
    incrementCurrentWorkoutIndex,
    currentWorkoutIndex,
  } = usePlanContext();

  const { activeWorkoutData, startWorkout } = useActiveWorkoutContext();

  if (
    activePlanId === undefined ||
    setPlanAsActive === undefined ||
    incrementCurrentWorkoutIndex === undefined
  ) {
    return null;
  }

  const handleActivatePlanRequest = () => {
    if (activePlanId) {
      Alert.alert(
        'Achtung',
        'Wenn du diesen Plan aktivierst, geht der Fortschritt im aktuellen Plan verloren. Bist du sicher?',
        [
          {
            text: 'Abbrechen',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Plan aktivieren',
            onPress: () => setPlanAsActive(selectedPlan.id),
          },
        ]
      );
    } else {
      setPlanAsActive(selectedPlan.id);
    }
  };

  const MainButton = () => {
    if (activeWorkoutData?.name) {
      return (
        <Button
          title={'Zum aktiven Training'}
          onPress={() => navigation.navigate('ActiveWorkout')}
        />
      );
    } else if (activePlanId == selectedPlan.id) {
      // no activeWorkout but user is on the page of the active plan
      return (
        <Button
          title={'Nächstes Workout starten'}
          onPress={() => startWorkout!(selectedPlan.id!, currentWorkoutIndex!)}
        />
      );
    } else {
      // no activeWorkout and user is not on the page of the active plan
      return (
        <Button
          title={'Als aktiv festlegen'}
          onPress={handleActivatePlanRequest}
        />
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{selectedPlan.name}</Text>
      <Text style={styles.description}>{selectedPlan.description}</Text>
      <MainButton />
      <View style={styles.spacer} />
      <Text>Eine Typische Trainingswoche:</Text>
      {exampleWeek.map(workout => (
        <WorkoutTile key={workout.name} workout={workout} />
      ))}
      <View style={styles.buttonContainer}>
        <MainButton />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
  title: {
    fontSize: fontSize.xl,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.md,
  },
  spacer: {
    height: 0.5,
    width: '100%',
    backgroundColor: Colors.text,
    marginVertical: spacing.md,
  },
  buttonContainer: {
    marginBottom: 30,
  },
});

export default PlanDetailsScreen;
