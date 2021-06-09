import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from 'features/Home';
import LoginScreen from 'features/Auth/Login';
import SignupScreen from 'features/Auth/Signup';
import DiscussionRoom from 'features/DiscussionRoom';
import CreateDiscussionRoom from 'features/CreateDiscussionRoom';

const Stack = createStackNavigator();
const loginOptions = { headerShown: false };
const signupOptions = { title: 'Signup' };
const createDiscussionOptions = { title: 'Create Room' };
const discussionOptions = ({ route }) => ({ title: route.params.roomName });
const homeOptions = { gestureEnabled: false, headerShown: false };

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={loginOptions}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={signupOptions}
          />
          <Stack.Screen name="Home" component={Home} options={homeOptions} />
          <Stack.Screen
            name="DiscussionRoom"
            component={DiscussionRoom}
            options={discussionOptions}
          />
          <Stack.Screen
            name="CreateDiscussion"
            component={CreateDiscussionRoom}
            options={createDiscussionOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
