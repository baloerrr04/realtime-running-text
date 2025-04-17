import { useFonts } from "expo-font";

export function useFontData() {
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    });

    return {
        fontsLoaded
    }
}