import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';
import { fontSize } from '../constants';
import Colors from '../constants/Colors';
import { useActiveWorkoutContext } from '../context/activeWorkout.context';
import plans from '../data';
import ActiveWorkoutScreen from '../screens/ActiveWorkout.screen';
import AllPlansScreen from '../screens/AllPlans/index.screen';
import FinishedWorkoutScreen from '../screens/FinishedWorkout.screen';
import HomeScreen from '../screens/Home.screen';
import PlanDetailsScreen from '../screens/PlanDetails/index.screen';
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
            <Ionicons name="home" size={30} color={color} />
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
            <FontAwesome5 name="dumbbell" size={28} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator<HomeTabParamList>();

function HomeNavigator() {
  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
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
            headerRight: () => (
              <Ionicons
                name={'settings-outline'}
                color={'white'}
                style={{ right: 10, paddingLeft: 50 }}
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
    </View>
  );
}

const PlansTabStack = createStackNavigator<PlansTabParamList>();

function PlansNavigator() {
  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
      <PlansTabStack.Navigator
        initialRouteName={'AllPlans'}
        screenOptions={{ headerBackTitle: 'Zurück' }}
      >
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
    </View>
  );
}

const ActiveWorkoutTabStack = createStackNavigator<ActiveWorkoutTabParamList>();

function ActiveWorkoutNavigator() {
  const { activeWorkoutData } = useActiveWorkoutContext();
  return (
    <View style={{ backgroundColor: Colors.background, flex: 1 }}>
      <ActiveWorkoutTabStack.Navigator>
        <ActiveWorkoutTabStack.Screen
          name="ActiveWorkout"
          component={ActiveWorkoutScreen}
          options={{
            headerTitle: activeWorkoutData?.name || 'Workout App',
          }}
        />
        <ActiveWorkoutTabStack.Screen
          name="FinishedWorkout"
          component={FinishedWorkoutScreen}
          options={{
            headerTitle: 'Workout App',
          }}
        />
      </ActiveWorkoutTabStack.Navigator>
    </View>
  );
}
