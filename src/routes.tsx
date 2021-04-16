import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Registration from './pages/Registration';
import SeniorsRegistration from './pages/SeniorsRegistration';
import ComorbidityRegistration from './pages/ComorbidityRegistration';
import VaccinationLocations from './pages/VaccinationLocations';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeniorsRegistration"
          component={SeniorsRegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComorbidityRegistration"
          component={ComorbidityRegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VaccinationLocations"
          component={VaccinationLocations}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
