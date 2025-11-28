import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUserStore } from '../store/useStore';
import { OnboardingScreen } from '../screens/Onboarding';
import { LoginScreen } from '../screens/Login';
import { HomeScreen } from '../screens/Home';
import { ReaderScreen } from '../screens/Reader';
import { colors } from '../theme/colors';
import { Home, Search, Bookmark, User } from 'lucide-react-native';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Placeholder = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name}</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text.muted,
    }}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeScreen} 
      options={{ 
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => <Home color={color} size={24} />
      }} 
    />
    <Tab.Screen 
      name="Search" 
      component={() => <Placeholder name="Search" />} 
      options={{ 
        tabBarIcon: ({ color }) => <Search color={color} size={24} />
      }} 
    />
    <Tab.Screen 
      name="Bookmarks" 
      component={() => <Placeholder name="Bookmarks" />} 
      options={{ 
        tabBarIcon: ({ color }) => <Bookmark color={color} size={24} />
      }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={() => <Placeholder name="Profile" />} 
      options={{ 
        tabBarIcon: ({ color }) => <User color={color} size={24} />
      }} 
    />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { isAuthenticated, isOnboarded } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="SubjectDetails" 
              component={() => <Placeholder name="Subject Details" />} 
              options={{ headerShown: true, title: 'Subject' }}
            />
            <Stack.Screen 
              name="Reader" 
              component={ReaderScreen} 
              options={{ headerShown: true, title: 'Reader' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
