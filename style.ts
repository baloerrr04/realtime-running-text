import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 90,
    height: 90,
  },
  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    overflow: "hidden",
  },
  headerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    gap: 12,
  },
  headerText: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  dataSection: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  inputSection: {
    padding: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#113B7A",
    marginBottom: 12,
  },
  currentDataContainer: {
    backgroundColor: "#f9fbfc",
    padding: 16,
    borderRadius: 12,
    minHeight: 60,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  currentDataText: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#1f2937",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 16,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#1f2937",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  successButton: {
    borderColor: "#4CAF50",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  statusContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  statusText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  successText: {
    color: "#2e7d32",
  },
  errorText: {
    color: "#d32f2f",
  },
});
