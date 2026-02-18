import React from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { lightTheme, darkTheme } from './src/theme/theme';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

// Start: Fix NavigationContainer import which was missing in original App.tsx or implied
// Actually, AppNavigator probably contains it? No, AppNavigator is inside NavigationContainer in previous steps.
// Let's check App.tsx original content from previous steps. 
// Step 479: Wrapped NavigationContainer. 
// I need simple NavigationContainer import.
import { NavigationContainer } from '@react-navigation/native';

export default App;
