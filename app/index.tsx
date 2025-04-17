// app/index.js
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ref, onValue, set } from 'firebase/database';
import { database } from '@/lib/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [currentData, setCurrentData] = useState('Loading...');
  const [newData, setNewData] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../assets/fonts/SpaceMono-Regular.ttf'),
    // 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.95))[0];

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Connect to Firebase
    const dataRef = ref(database, 'data');
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentData(data ? data.text || 'No data available' : 'No data available');
      setIsLoading(false);
    }, (error) => {
      console.error('Error reading data:', error);
      setCurrentData('Error loading data');
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Handle update button press
  const handleUpdate = async () => {
    if (!newData.trim()) {
      setStatus('Please enter some data!');
      setTimeout(() => setStatus(''), 2000);
      return;
    }

    setIsLoading(true);
    try {
      const dataRef = ref(database, 'data');
      await set(dataRef, { text: newData.trim() });
      setNewData('');
      setStatus('Data updated successfully!');
      setUpdateSuccess(true);
      setTimeout(() => {
        setStatus('');
        setUpdateSuccess(false);
      }, 2000);
    } catch (error:any) {
      console.error('Update error:', error);
      setStatus(`Error: ${error.message}`);
      setTimeout(() => setStatus(''), 3000);
    }
    setIsLoading(false);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#113B7A" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            {/* <Image
              source={require('../assets/education-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            /> */}
          </View>

          <LinearGradient
            colors={['#113B7A', '#3066BE']}
            style={styles.headerGradient}
          >
            <Text style={styles.headerText}>Education Data Editor</Text>
            <FontAwesome5 name="graduation-cap" size={20} color="white" />
          </LinearGradient>

          <View style={styles.dataSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="article" size={18} color="#113B7A" /> Current Lesson Material
            </Text>
            
            <View style={styles.currentDataContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#3066BE" />
              ) : (
                <Text style={styles.currentDataText}>{currentData}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="edit" size={18} color="#113B7A" /> Update Lesson Material
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Enter new teaching material..."
              placeholderTextColor="#A0A0A0"
              value={newData}
              onChangeText={setNewData}
              multiline
            />

            <TouchableOpacity
              style={[styles.button, updateSuccess && styles.successButton]}
              onPress={handleUpdate}
              disabled={isLoading}
            >
              <LinearGradient
                colors={updateSuccess ? ['#4CAF50', '#2E7D32'] : ['#113B7A', '#3066BE']}
                style={styles.buttonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>
                      {updateSuccess ? 'Updated!' : 'Update Material'}
                    </Text>
                    <MaterialIcons 
                      name={updateSuccess ? "check-circle" : "cloud-upload"} 
                      size={20} 
                      color="white" 
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {status ? (
              <Animated.View style={styles.statusContainer}>
                <Text style={[
                  styles.statusText,
                  status.includes('Error') ? styles.errorText : styles.successText
                ]}>
                  {status}
                </Text>
              </Animated.View>
            ) : null}
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  card: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  dataSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  inputSection: {
    padding: 20,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#113B7A',
    marginBottom: 12,
  },
  currentDataContainer: {
    backgroundColor: '#F5F7FA',
    padding: 15,
    borderRadius: 10,
    minHeight: 60,
    justifyContent: 'center',
  },
  currentDataText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#2C3E50',
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E5E9F0',
    borderRadius: 10,
    padding: 15,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#2C3E50',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
  },
  successButton: {
    borderColor: '#4CAF50',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  statusContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  successText: {
    color: '#4CAF50',
  },
  errorText: {
    color: '#E53935',
  },
});