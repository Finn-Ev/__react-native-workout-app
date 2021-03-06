import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from './constants/Colors';
import { AppContextProvider } from './context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style={'light'} />
        </AppContextProvider>
      </SafeAreaProvider>
    );
  }
}
