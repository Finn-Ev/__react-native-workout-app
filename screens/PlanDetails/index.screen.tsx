import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import plans from '../../data';
import { PlansTabParamList } from '../../types/navigation.types';
import { Text } from '../../utils/styles/DefaultComponents';
import { Button } from 'react-native-elements';
import { fontSize, spacing } from '../../constants';
import { defaultScreenStyles } from '../../utils/styles/mixins';
import { Workout } from '../../types/data.types';
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

  function setActivePlan() {
    console.log(`${selectedPlan?.id} Plan is selected`);
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>{selectedPlan.name}</Text>
        <Text style={styles.description}>{selectedPlan.description}</Text>
        <View style={styles.spacer} />
        <Text style={styles.hint}>Eine Typische Trainingswoche:</Text>
        {exampleWeek.map(workout => (
          <WorkoutTile key={workout.name} workout={workout} />
        ))}
      </View>

      <Button
        titleStyle={{ color: Colors.text }}
        containerStyle={{
          marginTop: spacing.lg,
          marginBottom: spacing.xl + 10,
        }}
        buttonStyle={{
          backgroundColor: Colors.accent,
        }}
        title={'Als aktiv festlegen | Nächstes Workout starten'}
        onPress={setActivePlan}
      />
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
  hint: {},
});

export default PlanDetailsScreen;
