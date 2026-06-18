import "../global.css";
import { useEffect } from 'react';
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { 
  DMSans_400Regular, 
  DMSans_500Medium, 
  DMSans_600SemiBold, 
  DMSans_700Bold, 
  DMSans_800ExtraBold 
} from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({ 
    DMSans_400Regular, 
    DMSans_500Medium, 
    DMSans_600SemiBold, 
    DMSans_700Bold, 
    DMSans_800ExtraBold 
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
