import { Tabs } from 'expo-router';
import ProtectedRoute from '@/components/protected-route';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#113B7A',
          headerStyle: { backgroundColor: '#113B7A' },
          headerTintColor: '#fff',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Running Text',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="text-fields" size={24} color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="admin"
          options={{
              title: 'Admins',
              tabBarIcon: ({ color }) => (
              <FontAwesome name="users" size={24} color={color} />
            ),
          }}
        /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={24} color={color} />
          ),
        }}
      />
      </Tabs>
    </ProtectedRoute>
  );
}