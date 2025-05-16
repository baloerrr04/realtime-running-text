import { useState } from 'react';
import { View, Modal, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createAdminAccount } from '@/lib/auth';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

interface AddAdminModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess?: () => void; // Tambahkan callback untuk success
  }

export default function AddAdminModal({ visible, onClose, onSuccess }: AddAdminModalProps) {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { admin } = useAuth(); // Dapatkan current admin

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      // Pastikan admin yang sedang login masih valid
      if (!admin) {
        throw new Error('Session expired. Please login again.');
      }

      await createAdminAccount(email, password, name);
      Alert.alert('Success', 'Admin account created successfully');
      
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      
      // Tutup modal
      onClose();
      
      // Panggil callback success jika ada
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Admin</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Cancel" 
            onPress={onClose} 
            color="#999" 
          />
          <Button
            title={loading ? "Creating..." : "Create Admin"}
            onPress={handleSubmit}
            disabled={loading}
            color="#113B7A"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#113B7A',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});