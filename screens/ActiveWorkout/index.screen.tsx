import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '../../components/Button.component';
import { fontSize, spacing } from '../../constants';
import { useActiveWorkoutContext } from '../../context/activeWorkout.context';
import { usePlanContext } from '../../context/plan.context';
import data from '../../data';
import { ActiveWorkoutTabParamList } from '../../types/navigation.types';
import { Text } from '../../utils/styles/DefaultComponents';
import { defaultScreenStyles } from '../../utils/styles/mixins';
import Exercise from './Exercise.component';

interface ActiveWorkoutScreenProps {}

const ActiveWorkoutScreen: React.FC<
  ActiveWorkoutScreenProps &
    StackScreenProps<ActiveWorkoutTabParamList, 'ActiveWorkout'>
> = ({ navigation }) => {
  const {
    activeWorkoutData,
    wipeActiveWorkoutData,
    startWorkout,
  } = useActiveWorkoutContext();
  const {
    incrementCurrentWorkoutIndex,
    activePlanId,
    currentWorkoutIndex,
    activePlanName,
  } = usePlanContext();

  const finishWorkout = () => {
    wipeActiveWorkoutData!();
    incrementCurrentWorkoutIndex!();
    navigation.navigate('FinishedWorkout');
  };

  const cancelWorkout = () => {
    wipeActiveWorkoutData!();
    navigation.navigate('Home');
  };

  if (!activeWorkoutData?.name) {
    return (
      <View style={styles.container}>
        {activePlanId ? (
          <>
            <Text style={styles.declarativeHeadline}>
              Aktiver Trainingsplan
            </Text>
            <Text style={styles.title}>{activePlanName}</Text>
            <Button
              title="Nächste Trainingseinheit starten"
              onPress={() => startWorkout!(activePlanId!, currentWorkoutIndex!)}
            />
          </>
        ) : (
          <>
            <Text style={styles.declarativeHeadline}>
              Aktuell ist kein Trainingsplan aktiv
            </Text>
            <Button
              title="Zu den Plänen"
              onPress={() => navigation.navigate('Plans')}
            />
          </>
        )}
      </View>
    );
  }

  const { exercises } = data.find(plan => plan.id === activePlanId)?.workouts[
    currentWorkoutIndex!
  ]!;

  return (
    <View style={styles.container}>
      <Text>ActiveWorkout</Text>
      <Text>workout Name: {activeWorkoutData?.name}</Text>
      {exercises.map(exercise => (
        <Exercise key={exercise.name} exercise={exercise} />
      ))}
      <Button
        onPress={() =>
          Alert.alert(
            'Achtung',
            'Möchtest du das Training wirklich speichern und beenden?',
            [
              {
                text: 'Zurück',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Training beenden',
                onPress: finishWorkout,
                style: 'default',
              },
            ]
          )
        }
        title={'Training beenden'}
      />
      <Button
        onPress={() =>
          Alert.alert(
            'Achtung',
            'Möchtest du das Training wirklich abbrechen?',
            [
              {
                text: 'Zurück',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Training abbrechen',
                onPress: cancelWorkout,
                style: 'destructive',
              },
            ]
          )
        }
        type="cancel"
        title={'Training abbrechen'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
  declarativeHeadline: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontSize: fontSize.md,
  },
  title: {
    fontSize: fontSize.xl,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

export default ActiveWorkoutScreen;
