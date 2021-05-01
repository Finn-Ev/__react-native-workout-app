import React from 'react';
import { Text } from '../utils/styles/DefaultComponents';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeTabParamList } from '../types/navigation.types';
import Colors from '../constants/Colors';
import { defaultScreenStyles } from '../utils/styles/mixins';
import Button from '../components/Button.component';
import { useActiveWorkoutContext } from '../context/activeWorkout.context';
import { usePlanContext } from '../context/plan.context';
import { fontSize } from '../constants';

interface HomeScreenProps {}

const HomeScreen: React.FC<
  HomeScreenProps & StackScreenProps<HomeTabParamList, 'Settings'>
> = ({}) => {
  const { wipeActiveWorkoutData } = useActiveWorkoutContext();
  const { resetPlanData } = usePlanContext();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>

      <Button
        type={'cancel'}
        title={'Wipe data'}
        onPress={() => {
          resetPlanData!(), wipeActiveWorkoutData!();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ...defaultScreenStyles,
  title: {
    fontSize: fontSize.lg,
  },
});

export default HomeScreen;
