import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../components/Button.component';
import { fontSize, spacing } from '../constants';
import { useActiveWorkoutContext } from '../context/activeWorkout.context';
import { usePlanContext } from '../context/plan.context';
import data from '../data';
import { HomeTabParamList } from '../types/navigation.types';
import { Text } from '../utils/styles/DefaultComponents';
import { defaultScreenStyles } from '../utils/styles/mixins';
import WorkoutTile from './PlanDetails/WorkoutTile.component';

interface HomeScreenProps {}

const HomeScreen: React.FC<
  HomeScreenProps & StackScreenProps<HomeTabParamList, 'Home'>
> = ({ navigation }) => {
  const { activePlanId, currentWorkoutIndex, isLoading } = usePlanContext();

  const { startWorkout, activeWorkoutData } = useActiveWorkoutContext();

  const activePlan = data.find(plan => plan.id === activePlanId);

  const upcomingWorkout = activePlan?.workouts[currentWorkoutIndex!];

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (activeWorkoutData?.name) {
    return (
      <View style={styles.container}>
        <Button
          title={'Zum aktiven Training'}
          buttonStyles={{ marginBottom: 30 }}
          onPress={() => navigation.navigate('ActiveWorkout')}
        />
      </View>
    );
  } else if (!activePlan) {
    return (
      <View style={styles.container}>
        <Text>Kein aktiver Plan</Text>
        <Button
          title={'Zu den Plänen'}
          buttonStyles={{ marginBottom: 30 }}
          onPress={() => navigation.navigate('Plans')}
        />
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.declarativeHeadline}>Aktiver Plan:</Text>
        <Text style={styles.planName}> {activePlan.name}</Text>
        <Text style={styles.declarativeHeadline}>Anstehendes Workout:</Text>
        {upcomingWorkout && <WorkoutTile workout={upcomingWorkout} />}
        <Button
          buttonStyles={{ marginBottom: 30 }}
          title={'Training starten'}
          onPress={() => {
            startWorkout!(activePlan.id, currentWorkoutIndex!);
            navigation.navigate('ActiveWorkout');
          }}
        />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
  declarativeHeadline: {
    marginTop: spacing.lg,
    textAlign: 'center',
    fontSize: fontSize.md,
  },
  planName: {
    fontSize: fontSize.xl,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});

export default HomeScreen;
