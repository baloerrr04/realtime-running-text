import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../../style";
import { useMinuteTextData } from "@/hooks/useMinuteTextData";
import { useFontData } from "@/hooks/useFontData";

export default function App() {
  const {
    currentData,
    handleUpdate,
    isLoading,
    status,
    fadeAnim,
    scaleAnim,
    newData,
    setNewData,
    updateSuccess,
  } = useMinuteTextData();

  const { fontsLoaded } = useFontData();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#113B7A" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            colors={["#113B7A", "#3066BE"]} // biru muda tema pendidikan
            style={styles.headerGradient}
          >
            <Text style={styles.headerText}>Editor Teks Berjalan</Text>
            <FontAwesome5 name="scroll" size={20} color="white" />
          </LinearGradient>

          <View style={styles.dataSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="article" size={18} color="#113B7A" /> Teks Saat Ini
            </Text>

            <View style={styles.currentDataContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#2F80ED" />
              ) : (
                <Text style={styles.currentDataText}>{currentData}</Text>
              )}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="edit" size={18} color="#113B7A" /> Perbarui Teks
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Masukkan materi baru..."
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
                colors={
                  updateSuccess
                    ? ["#4CAF50", "#2E7D32"]
                    : ["#113B7A", "#2F80ED"]
                }
                style={styles.buttonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>
                      {updateSuccess ? "Berhasil Diperbarui!" : "Perbarui Teks"}
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
                <Text
                  style={[
                    styles.statusText,
                    status.includes("Error")
                      ? styles.errorText
                      : styles.successText,
                  ]}
                >
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
