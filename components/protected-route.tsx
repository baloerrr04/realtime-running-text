import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin, loading, initialized } = useAuth();

  

  if (!initialized) {
    // Menunggu verifikasi persistence auth state
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!admin) {
    // Redirect ke login jika tidak terautentikasi
    return <Redirect href="/(auth)/login" />;
  } 

  // Render children jika terautentikasi
  return <>{children}</>;
}