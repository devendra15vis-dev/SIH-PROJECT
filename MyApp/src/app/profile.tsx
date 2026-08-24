import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getProfile, saveProfile } from '@/constants/profile-store';
import { setAuthenticated } from '@/constants/auth-store';
import { MaxContentWidth } from '@/constants/theme';

export default function ProfileScreen() {
	const [mobile, setMobile] = useState('');
	const [ownerName, setOwnerName] = useState(() => getProfile().ownerName);
	const [email, setEmail] = useState(() => getProfile().email);
	const [businessName, setBusinessName] = useState(() => getProfile().businessName);
	const [businessCategory, setBusinessCategory] = useState(() => getProfile().businessCategory);
	const [location, setLocation] = useState(() => getProfile().location);
	const [isSaved, setIsSaved] = useState(false);

	return (
		<ThemedView style={styles.page}>
			<SafeAreaView style={styles.safeArea} edges={['top']}>
				<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
					<ThemedText style={styles.eyebrow}>MY PROFILE</ThemedText>
					<View style={styles.profileHeader}>
						<View style={styles.avatar}><ThemedText style={styles.avatarText}>{ownerName.trim().charAt(0).toUpperCase() || '?'}</ThemedText></View>
						<View><ThemedText style={styles.name}>{ownerName || 'Your profile'}</ThemedText><ThemedText style={styles.muted}>Add your personal and business details</ThemedText></View>
					</View>
					<View style={styles.card}>
						<ThemedText style={styles.cardTitle}>Personal details</ThemedText>
						<ProfileField label="Your name" value={ownerName} onChangeText={setOwnerName} placeholder="Enter your name" />
						<ProfileField label="Mobile number" value={mobile} onChangeText={setMobile} placeholder="Enter mobile number" keyboardType="phone-pad" />
						<ProfileField label="Email address" value={email} onChangeText={setEmail} placeholder="Enter email address" keyboardType="email-address" />
					</View>
					<View style={styles.card}>
						<ThemedText style={styles.cardTitle}>Business details</ThemedText>
						<ProfileField label="Business name" value={businessName} onChangeText={setBusinessName} placeholder="e.g. Sharma General Store" />
						<ProfileField label="Business category" value={businessCategory} onChangeText={setBusinessCategory} placeholder="e.g. Retail, dairy, tailoring" />
						<ProfileField label="Business location" value={location} onChangeText={setLocation} placeholder="City, state" />
					</View>
					<Pressable style={styles.saveButton} onPress={() => { saveProfile({ ownerName, mobile, email, businessName, businessCategory, location }); setIsSaved(true); }}><ThemedText style={styles.loginButtonText}>{isSaved ? 'Details saved  ✓' : 'Save profile details  →'}</ThemedText></Pressable>
					<Pressable style={styles.outlineButton} onPress={() => setAuthenticated(false)}><ThemedText style={styles.outlineText}>Log out</ThemedText></Pressable>
				</ScrollView>
			</SafeAreaView>
		</ThemedView>
	);
}

function ProfileField({ label, value, onChangeText, placeholder, keyboardType }: { label: string; value: string; onChangeText: (value: string) => void; placeholder: string; keyboardType?: 'default' | 'email-address' | 'phone-pad' }) {
	return <View style={styles.field}><ThemedText style={styles.detailLabel}>{label}</ThemedText><TextInput value={value} onChangeText={(nextValue) => { onChangeText(nextValue); }} placeholder={placeholder} placeholderTextColor="#8B9691" keyboardType={keyboardType} style={styles.profileInput} /></View>;
}

const styles = StyleSheet.create({
	page: { flex: 1, backgroundColor: '#F8FAF9' },
	safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
	keyboardView: { flex: 1 },
	content: { padding: 22, paddingBottom: 40, gap: 16 },
	loginContent: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingBottom: 42 },
	eyebrow: { color: '#16805E', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
	profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 2, marginBottom: 4 },
	avatar: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#0B4D45', alignItems: 'center', justifyContent: 'center' },
	avatarText: { color: '#BCECD4', fontSize: 30, fontWeight: '800' },
	name: { color: '#17221F', fontSize: 22, fontWeight: '800' },
	muted: { color: '#687570', fontSize: 13, marginTop: 3 },
	card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, shadowColor: '#16362E', shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
	cardTitle: { color: '#16211E', fontSize: 16, fontWeight: '800', marginBottom: 4 },
	field: { borderTopWidth: 1, borderColor: '#EDF1EF', paddingTop: 11, marginTop: 8 },
	detailLabel: { color: '#77827D', fontSize: 12 },
	profileInput: { height: 40, paddingHorizontal: 0, color: '#1B2925', fontSize: 15, fontWeight: '700' },
	saveButton: { backgroundColor: '#064A42', borderRadius: 11, alignItems: 'center', paddingVertical: 14, marginTop: 2 },
	outlineButton: { borderWidth: 1, borderColor: '#0B4D45', borderRadius: 11, alignItems: 'center', paddingVertical: 13, marginTop: 2 },
	outlineText: { color: '#0B4D45', fontSize: 14, fontWeight: '800' },
	loginMark: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#0B4D45', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 20 },
	loginMarkText: { color: '#BCECD4', fontSize: 40, transform: [{ rotate: '-35deg' }] },
	title: { color: '#16211E', textAlign: 'center', fontSize: 28, fontWeight: '800' },
	subtitle: { color: '#697671', textAlign: 'center', fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 22 },
	formCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, shadowColor: '#16362E', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
	formTitle: { color: '#16211E', fontSize: 18, fontWeight: '800', marginBottom: 20 },
	label: { color: '#33443E', fontSize: 13, fontWeight: '700', marginBottom: 7, marginTop: 12 },
	input: { height: 48, borderWidth: 1, borderColor: '#D8E1DD', borderRadius: 9, paddingHorizontal: 14, color: '#17221F', fontSize: 14, backgroundColor: '#FBFCFB' },
	forgot: { color: '#16805E', textAlign: 'right', fontSize: 12, fontWeight: '700', marginTop: 12 },
	loginButton: { backgroundColor: '#064A42', borderRadius: 10, alignItems: 'center', paddingVertical: 14, marginTop: 22 },
	loginButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
	signup: { color: '#687570', textAlign: 'center', fontSize: 12, marginTop: 20 },
	signupLink: { color: '#16805E', fontWeight: '800' },
	secure: { color: '#8A9690', textAlign: 'center', fontSize: 11, marginTop: 18 },
});
