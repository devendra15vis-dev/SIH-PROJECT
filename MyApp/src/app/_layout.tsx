import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthScreen } from '@/components/auth-screen';
import AppTabs from '@/components/app-tabs';
import { isAuthenticated, loadAuthentication, subscribeToAuth } from '@/constants/auth-store';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    void loadAuthentication().then(() => setAuthenticated(isAuthenticated()));
    return subscribeToAuth(() => setAuthenticated(isAuthenticated()));
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {authenticated === null ? null : authenticated ? <AppTabs /> : <AuthScreen onAuthenticated={() => setAuthenticated(true)} />}
    </ThemeProvider>
  );
}
