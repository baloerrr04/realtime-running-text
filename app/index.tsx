// app/index.js
import { useState, useEffect } from "react";
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
import { ref, onValue, set } from "firebase/database";
import { database } from "@/lib/firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../style";
import { useRunningTextData } from "@/hooks/useRunningTextData";
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
    updateSuccess
  } = useRunningTextData();
  
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
            colors={["#113B7A", "#3066BE"]}
            style={styles.headerGradient}
          >
            <Text style={styles.headerText}>Education Data Editor</Text>
            <FontAwesome5 name="graduation-cap" size={20} color="white" />
          </LinearGradient>

          <View style={styles.dataSection}>
            <Text style={styles.sectionTitle}>
              <MaterialIcons name="article" size={18} color="#113B7A" /> Current
              Lesson Material
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
              <MaterialIcons name="edit" size={18} color="#113B7A" /> Update
              Lesson Material
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
                colors={
                  updateSuccess
                    ? ["#4CAF50", "#2E7D32"]
                    : ["#113B7A", "#3066BE"]
                }
                style={styles.buttonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>
                      {updateSuccess ? "Updated!" : "Update Material"}
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
