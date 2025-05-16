import EditProfileModal from "@/components/edit-profile-modal";
import { useAuth } from "@/context/AuthContext";
import { database } from "@/lib/firebase";
import { Link, useRouter } from "expo-router";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { ref, update } from "firebase/database";
import { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function ProfileScreen() {
  const { admin, adminData, logout } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  console.log("admin", adminData);
  

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login"); // Redirect ke tabs setelah login
    } catch (err) {
      setError("Login gagal. Email atau password salah.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Profile</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{admin?.email}</Text>

        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>{adminData?.name}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Edit Profile"
          onPress={() => setModalVisible(true)}
          color="#113B7A"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#113B7A" />
      </View>

      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentName={adminData.name}
        currentEmail={admin?.email || ""}
        uid={admin?.uid || ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    color: "#113B7A",
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  value: {
    marginBottom: 15,
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    marginVertical: 20,
  },
  backLink: {
    marginTop: 20,
    color: "#113B7A",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
