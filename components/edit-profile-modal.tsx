// components/EditProfileModal.tsx
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import {
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { ref, update } from "firebase/database";
import { auth, database } from "@/lib/firebase/index";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  currentName: string;
  currentEmail: string;
  uid: string;
}

export default function EditProfileModal({
  visible,
  onClose,
  currentName,
  currentEmail,
  uid,
}: EditProfileModalProps) {
  const [newName, setNewName] = useState(currentName);
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      // Reauth
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);

      // Update Firebase Auth
      await updateProfile(user, { displayName: newName });
      if (newEmail !== user.email) await updateEmail(user, newEmail);

      // Update Realtime DB
      const adminRef = ref(database, `admins/${uid}`);
      await update(adminRef, { name: newName, email: newEmail });

      Alert.alert("Berhasil", "Profil berhasil diperbarui");
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Gagal",
        "Gagal memperbarui profil. Pastikan password benar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profil</Text>

          <Text style={styles.noticeText}>
          Untuk alasan keamanan, masukkan password saat ini untuk menyimpan
          perubahan email.
        </Text>

          <TextInput
            placeholder="Nama Baru"
            value={newName}
            onChangeText={setNewName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email Baru"
            value={newEmail}
            onChangeText={setNewEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password Saat Ini"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Button title="Simpan" onPress={handleUpdate} color="#113B7A" />
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  cancelText: {
    color: "#113B7A",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  noticeText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});
