import React from 'react';
import { Text } from '../utils/Themed';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

interface PlanDetailsScreenProps {}

const PlanDetailsScreen: React.FC<PlanDetailsScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>PlanDetails</Text>
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
