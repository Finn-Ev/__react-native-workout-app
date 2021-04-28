import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button.component';
import { fontSize, spacing } from '../../constants';
import Colors from '../../constants/Colors';
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
> = ({ route: { params } }) => {
  const selectedPlan = plans.find(plan => params.planId === plan.id);

  if (!selectedPlan) return null;

  const exampleWeek: Workout[] = selectedPlan?.workouts.filter(
    workout => workout.week === 1
  );

  const {
    activePlanId,
    setPlanAsActive,
    increaseCurrentWorkoutIndex,
  } = usePlanContext();

  if (
    activePlanId === undefined ||
    setPlanAsActive === undefined ||
    increaseCurrentWorkoutIndex === undefined
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

  const MainButton = () =>
    activePlanId === selectedPlan.id ? (
      <Button
        title={'Nächstes Workout starten'}
        // TODO: onPress={() => WORKOUT STARTEN}
        onPress={increaseCurrentWorkoutIndex}
      />
    ) : (
      <Button
        title={'Als aktiv festlegen'}
        onPress={handleActivatePlanRequest}
      />
    );

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
    marginTop: -2,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default PlanDetailsScreen;
