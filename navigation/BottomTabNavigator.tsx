/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { fontSize } from '../constants';
import Colors from '../constants/Colors';
import plans from '../data';
import ActiveWorkoutScreen from '../screens/ActiveWorkout.screen';
import AllPlansScreen from '../screens/AllPlans.screen';
import HomeScreen from '../screens/Home.screen';
import PlanDetailsScreen from '../screens/PlanDetails.screen';
import SettingsScreen from '../screens/Settings.screen';
import {
  ActiveWorkoutTabParamList,
  BottomTabParamList,
  HomeTabParamList,
  PlansTabParamList,
} from '../types/navigation.types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors.tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={30}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Plans"
        component={PlansNavigator}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              size={30}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ActiveWorkout"
        component={ActiveWorkoutNavigator}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="dumbbell"
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeNavigator() {
  return (
    <HomeTabStack.Navigator
      screenOptions={() => ({
        headerBackTitle: 'Zurück',
        headerTitleStyle: { fontSize: fontSize.lg },
      })}
    >
      <HomeTabStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Workout-App',
          headerRight: ({ tintColor }) => (
            <Ionicons
              name={'settings-outline'}
              color={'white'}
              style={{ right: 10 }}
              size={24}
              onPress={() => navigation.navigate('Settings')}
            />
          ),
        })}
      />
      <HomeTabStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Einstellungen',
        }}
      />
    </HomeTabStack.Navigator>
  );
}

const PlansTabStack = createStackNavigator<PlansTabParamList>();

function PlansNavigator() {
  return (
    <PlansTabStack.Navigator screenOptions={{ headerBackTitle: 'Zurück' }}>
      <PlansTabStack.Screen
        name="AllPlans"
        component={AllPlansScreen}
        options={{
          headerTitle: 'Trainingspläne',
          headerTitleStyle: { fontSize: fontSize.lg },
        }}
      />
      <PlansTabStack.Screen
        name="PlanDetails"
        component={PlanDetailsScreen}
        options={({ route: { params } }) => ({
          headerTitle: plans.find(plan => params.planId === plan.id)?.name,
        })}
      />
    </PlansTabStack.Navigator>
  );
}

const ActiveWorkoutTabStack = createStackNavigator<ActiveWorkoutTabParamList>();

function ActiveWorkoutNavigator() {
  return (
    <ActiveWorkoutTabStack.Navigator>
      <ActiveWorkoutTabStack.Screen
        name="ActiveWorkout"
        component={ActiveWorkoutScreen}
        options={{ headerTitle: 'Legs #1' }}
      />
    </ActiveWorkoutTabStack.Navigator>
  );
}
