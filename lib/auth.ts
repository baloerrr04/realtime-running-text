import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, deleteUser } from "firebase/auth";
import { database } from "./firebase";
import { ref, set } from "firebase/database";

const auth = getAuth();

export async function adminLogin(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function createAdminAccount(email: string, password: string, name: string) {
  // Hanya bisa dijalankan manual dari backend/firebase console
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  await updateProfile(userCredential.user, { displayName: name });
  
  const adminRef = ref(database, `admins/${userCredential.user.uid}`);
  await set(adminRef, {
    email,
    name,
    createdAt: Date.now(),
    lastLogin: Date.now()
  });
  
  return userCredential;
}

export async function adminLogout() {
  return await signOut(auth);
}

export function getCurrentAdmin() {
  return auth.currentUser;
}