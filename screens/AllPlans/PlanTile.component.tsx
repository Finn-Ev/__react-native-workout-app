import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { spacing, fontSize } from '../../constants';
import Colors from '../../constants/Colors';
import { Plan } from '../../types/data.types';
import { Text } from '../../utils/styles/DefaultComponents';

interface PlanOverviewTileProps {
  plan: Plan;
}

const PlanOverviewTile: React.FC<PlanOverviewTileProps> = ({ plan }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PlanDetails', { planId: plan.id })}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{plan.name}</Text>
          <Text>{plan.unitsPerWeek} Einheiten pro Woche </Text>
        </View>
        <Text style={styles.description}>{plan.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
    marginTop: spacing.sm,
    backgroundColor: Colors.contentBackground,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSize.lg,
  },
  description: {
    marginTop: spacing.sm,
  },
});
export default PlanOverviewTile;
