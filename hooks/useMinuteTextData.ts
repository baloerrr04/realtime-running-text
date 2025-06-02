import { database } from "@/lib/firebase";
import { onValue, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react"
import { Animated } from "react-native";

export function useMinuteTextData() {
    const [currentData, setCurrentData] = useState("Loading...");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [newData, setNewData] = useState("");


    const fadeAnim = useState(new Animated.Value(0))[0];
    const scaleAnim = useState(new Animated.Value(0.95))[0];

    useEffect(() => {
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
        const dataRef = ref(database, "data");

        const unsubscribe = onValue(
            dataRef,
            (snapshot) => {
                const data = snapshot.val();
                setCurrentData(
                    data ? data.minutes : "No data available"
                );
                setIsLoading(false);
            },
            (error: any) => {
                console.error("Error reading data:", error);
                setCurrentData("Error loading data");
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [])


    const handleUpdate = async () => {
        setIsLoading(true);

        if (!newData.trim()) {
            setStatus("Input tidak boleh kosong");
            setIsLoading(false);
            setTimeout(() => setStatus(""), 2000);
            return;
        }

        try {
            const dataRef = ref(database, "data");

            await update(dataRef, {
                minutes: newData.trim() ? parseFloat(newData) : parseFloat(currentData),
            });

            setNewData("");
            setUpdateSuccess(true);
            setTimeout(() => {
                setStatus("");
                setUpdateSuccess(false);
            }, 2000);
        } catch (error: any) {
            console.error("Update error:", error);
            setStatus(`Error: ${error.message}`);
            setTimeout(() => setStatus(""), 3000);
        }

        setIsLoading(false);
    };




    return {
        handleUpdate,
        isLoading,
        setIsLoading,
        currentData,
        setCurrentData,
        status,
        setStatus,
        updateSuccess,
        setUpdateSuccess,
        newData,
        setNewData,
        fadeAnim,
        scaleAnim,
    }
}