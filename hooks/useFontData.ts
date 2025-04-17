import { useFonts } from "expo-font";

export function useFontData() {
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    return {
        fontsLoaded
    }
}