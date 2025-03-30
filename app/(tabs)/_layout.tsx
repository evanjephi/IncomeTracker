// _layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { IncomeProvider } from '../IncomeContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Image } from 'react-native';

const ICON_SIZE = 30; // Set a constant size for all icons

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <IncomeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#009fff',
          tabBarInactiveTintColor: '#004d80',
          tabBarStyle: { backgroundColor: '#000916' }, // Set tab bar background color to gray
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? '#009fff' : '#004d80'} size={ICON_SIZE} />
            ),
          }}
        />
        <Tabs.Screen
          name="BusinessIncomeScreen"
          options={{
            title: 'Business Income',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/images/business.png')} // Use a relevant icon for business income
                style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: focused ? '#009fff' : '#004d80' }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="SalaryIncomeScreen"
          options={{
            title: 'Salary Income',
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../../assets/images/salary.png')} // Use a relevant icon for salary income
                style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: focused ? '#009fff' : '#004d80' }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Setting"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={focused ? '#009fff' : '#004d80'} />
            ),
          }}
        />
      </Tabs>
    </IncomeProvider>
  );
}
