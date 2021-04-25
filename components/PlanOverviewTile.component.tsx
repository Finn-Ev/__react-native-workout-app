import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Plan } from '../types';
import { fontSize, Text } from '../utils/Themed';

interface PlanOverviewTileProps {
  plan: Plan;
}

const PlanOverviewTile: React.FC<PlanOverviewTileProps> = ({ plan }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('PlanDetails')}>
      <View style={{ ...styles.container }}>
        <View style={styles.header}>
          <Text style={styles.title}>{plan.name}</Text>
          <Text>{plan.unitsPerWeek} Einheiten pro Woche </Text>
        </View>
        <Text style={styles.description}>{plan.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    backgroundColor: Colors.contentBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSize.lg,
  },
  description: { marginTop: 10 },
});
export default PlanOverviewTile;
