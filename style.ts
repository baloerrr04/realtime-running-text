import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F7FA",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    logo: {
        width: 80,
        height: 80,
    },
    card: {
        width: "100%",
        maxWidth: 450,
        backgroundColor: "white",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: "hidden",
    },
    headerGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        gap: 10,
    },
    headerText: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: "white",
    },
    dataSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E9F0",
    },
    inputSection: {
        padding: 20,
    },
    sectionTitle: {
        flexDirection: "row",
        alignItems: "center",
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        color: "#113B7A",
        marginBottom: 12,
    },
    currentDataContainer: {
        backgroundColor: "#F5F7FA",
        padding: 15,
        borderRadius: 10,
        minHeight: 60,
        justifyContent: "center",
    },
    currentDataText: {
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: "#2C3E50",
    },
    input: {
        backgroundColor: "#F5F7FA",
        borderWidth: 1,
        borderColor: "#E5E9F0",
        borderRadius: 10,
        padding: 15,
        fontFamily: "Poppins-Regular",
        fontSize: 15,
        color: "#2C3E50",
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 16,
    },
    button: {
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 8,
    },
    successButton: {
        borderColor: "#4CAF50",
    },
    buttonGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        gap: 8,
    },
    buttonText: {
        color: "white",
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
        color: "#4CAF50",
    },
    errorText: {
        color: "#E53935",
    },
});