import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { setAuthenticated } from '@/constants/auth-store';
import { getProfile, saveProfile } from '@/constants/profile-store';
import { MaxContentWidth } from '@/constants/theme';

export function AuthScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState(() => getProfile().ownerName);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entrance, { toValue: 1, duration: 550, useNativeDriver: true }),
    ]).start();
  }, [entrance]);

  function completeAuth() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      saveProfile({ ...getProfile(), ownerName: name.trim(), mobile: phone.trim() });
      setAuthenticated(true);
      onAuthenticated();
    }, 350);
  }

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Animated.View style={[styles.animatedContent, { opacity: entrance, transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }]}>
              <View style={styles.logo}><ThemedText style={styles.logoLeaf}>⌁</ThemedText></View>
              <ThemedText style={styles.brand}>Vyapar Setu</ThemedText>
              <ThemedText style={styles.tagline}>Your Digital Business Advisor</ThemedText>
              <ThemedText style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</ThemedText>
              <ThemedText style={styles.subtitle}>{mode === 'login' ? 'Log in to grow your business with confidence.' : 'Create your account and get practical business guidance.'}</ThemedText>

              <View style={styles.card}>
                <View style={styles.switcher}><Pressable style={[styles.switch, mode === 'login' && styles.activeSwitch]} onPress={() => setMode('login')}><ThemedText style={[styles.switchText, mode === 'login' && styles.activeSwitchText]}>Login</ThemedText></Pressable><Pressable style={[styles.switch, mode === 'signup' && styles.activeSwitch]} onPress={() => setMode('signup')}><ThemedText style={[styles.switchText, mode === 'signup' && styles.activeSwitchText]}>Sign up</ThemedText></Pressable></View>
                <Pressable style={styles.googleButton} onPress={completeAuth}><ThemedText style={styles.googleIcon}>G</ThemedText><ThemedText style={styles.googleText}>{mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}</ThemedText></Pressable>
                <View style={styles.divider}><View style={styles.dividerLine} /><ThemedText style={styles.or}>OR</ThemedText><View style={styles.dividerLine} /></View>
                <ThemedText style={styles.label}>Your name</ThemedText>
                <TextInput value={name} onChangeText={setName} placeholder="Enter your name" placeholderTextColor="#8B9691" autoCapitalize="words" style={styles.input} />
                <ThemedText style={styles.label}>Phone number</ThemedText>
                <TextInput value={phone} onChangeText={setPhone} placeholder="Enter 10-digit mobile number" placeholderTextColor="#8B9691" keyboardType="phone-pad" maxLength={10} style={styles.input} />
                <Pressable style={styles.phoneButton} onPress={completeAuth}><ThemedText style={styles.phoneButtonText}>{isSubmitting ? 'Please wait...' : mode === 'login' ? 'Continue with phone  →' : 'Create account  →'}</ThemedText></Pressable>
                <ThemedText style={styles.terms}>By continuing, you agree to our <ThemedText style={styles.legalLink} onPress={() => router.push('/terms')}>Terms</ThemedText> and <ThemedText style={styles.legalLink} onPress={() => router.push('/privacy')}>Privacy Policy</ThemedText>.</ThemedText>
              </View>
              <ThemedText style={styles.trust}>🔒 Your information is safe and secure</ThemedText>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAF9' },
  safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  keyboard: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingBottom: 30 },
  animatedContent: { alignItems: 'center' },
  logo: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#0B4D45', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoLeaf: { color: '#BCECD4', fontSize: 42, transform: [{ rotate: '-35deg' }] },
  brand: { color: '#16211E', fontSize: 24, fontWeight: '800' },
  tagline: { color: '#687570', fontSize: 12, marginTop: 2 },
  title: { color: '#16211E', fontSize: 28, fontWeight: '800', marginTop: 30 },
  subtitle: { color: '#697671', fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 7, marginBottom: 18 },
  card: { width: '100%', maxWidth: 440, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, shadowColor: '#16362E', shadowOpacity: 0.08, shadowRadius: 14, elevation: 3 },
  switcher: { flexDirection: 'row', backgroundColor: '#F0F5F2', borderRadius: 9, padding: 3, marginBottom: 18 },
  switch: { flex: 1, alignItems: 'center', borderRadius: 7, paddingVertical: 9 },
  activeSwitch: { backgroundColor: '#FFFFFF', shadowColor: '#16362E', shadowOpacity: 0.08, shadowRadius: 4, elevation: 1 },
  switchText: { color: '#7A8580', fontSize: 13, fontWeight: '700' },
  activeSwitchText: { color: '#0B4D45' },
  googleButton: { height: 48, borderWidth: 1, borderColor: '#D6E1DB', borderRadius: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  googleIcon: { color: '#4285F4', fontSize: 18, fontWeight: '800' },
  googleText: { color: '#263630', fontSize: 13, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 18 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E8EFEB' },
  or: { color: '#9AA59F', fontSize: 10, fontWeight: '800' },
  label: { color: '#33443E', fontSize: 13, fontWeight: '700', marginBottom: 7 },
  input: { height: 48, borderWidth: 1, borderColor: '#D6E1DB', borderRadius: 9, paddingHorizontal: 14, color: '#17221F', fontSize: 14, backgroundColor: '#FBFCFB' },
  phoneButton: { backgroundColor: '#064A42', borderRadius: 10, alignItems: 'center', paddingVertical: 14, marginTop: 16 },
  phoneButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  terms: { color: '#9AA59F', textAlign: 'center', fontSize: 10, lineHeight: 15, marginTop: 16 },
  legalLink: { color: '#16805E', fontWeight: '800' },
  trust: { color: '#8A9690', fontSize: 11, marginTop: 18 },
});
