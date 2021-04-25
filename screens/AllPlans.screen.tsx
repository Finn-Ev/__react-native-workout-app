import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlanOverviewTile from '../components/PlanOverviewTile.component';
import plans from '../data';
import { PlansTabParamList } from '../types/navigation.types';
import Colors from '../constants/Colors';
import { Text } from '../utils/DefaultComponents';
import { fontSize, spacing } from '../constants';

interface AllPlansScreenProps {}

const AllPlansScreen: React.FC<
  AllPlansScreenProps & StackScreenProps<PlansTabParamList, 'AllPlans'>
> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wähle einen Plan aus</Text>
      {plans.map(plan => (
        <PlanOverviewTile key={plan.name} plan={plan} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.content,
    backgroundColor: Colors.background,
  },
  heading: {
    fontSize: fontSize.md,
  },
});

export default AllPlansScreen;
