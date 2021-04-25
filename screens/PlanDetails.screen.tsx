import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import plans from '../data';
import { PlansTabParamList } from '../types/navigation.types';
import { Text } from '../utils/DefaultComponents';

interface PlanDetailsScreenProps {}

const PlanDetailsScreen: React.FC<
  PlanDetailsScreenProps & StackScreenProps<PlansTabParamList, 'PlanDetails'>
> = ({ route: { params } }) => {
  const selectedPlan = plans.find(plan => params.planId === plan.id);
  return (
    <View style={styles.container}>
      <Text>{selectedPlan?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default PlanDetailsScreen;
