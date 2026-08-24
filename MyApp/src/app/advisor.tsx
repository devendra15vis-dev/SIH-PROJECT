import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getProfile } from '@/constants/profile-store';
import { MaxContentWidth } from '@/constants/theme';

type Message = { id: number; text: string; fromUser: boolean };

const quickQuestions = ['Suggest a business idea', 'How can I get a loan?', 'Share marketing tips'];

function getReply(question: string) {
	const lowerQuestion = question.toLowerCase();
	const profile = getProfile();
	const business = profile.businessCategory || profile.businessName || 'your business';

	if (lowerQuestion.includes('loan') || lowerQuestion.includes('लोन')) {
		return `For a loan, prepare a business plan, Aadhaar/PAN, bank statements and address proof. For ${business}, consider checking Mudra Loan and state schemes. I can create a document checklist for you.`;
	}
	if (lowerQuestion.includes('marketing') || lowerQuestion.includes('मार्केट')) {
		return `For ${business}, create a WhatsApp Business profile, add a Google Maps listing and share three local offers each week. Start by asking 20 regular customers for feedback.`;
	}
	if (lowerQuestion.includes('idea') || lowerQuestion.includes('business')) {
		return `Low-investment options such as home delivery, local subscriptions or niche retail may work in your area. Talk to 10 potential customers first, then test the idea with a small budget.`;
	}
	if (lowerQuestion.includes('price') || lowerQuestion.includes('rate') || lowerQuestion.includes('कीमत')) {
		return 'To set a price, add product cost, delivery, rent and a 10-20% profit margin. Compare three nearby competitors and offer both a basic and a premium option.';
	}
	return `I can help you grow your business. Ask me about business plans, loans, marketing, pricing or daily sales. I found details about ${business} in your profile.`;
}

export default function AdvisorScreen() {
	const profile = getProfile();
	const [draft, setDraft] = useState('');
	const [messages, setMessages] = useState<Message[]>([
		{ id: 1, fromUser: false, text: `Hello ${profile.ownerName || 'there'}! I am Vyapar Saathi. I can help with business planning, loans and marketing.` },
	]);

	function sendMessage(text = draft) {
		const question = text.trim();
		if (!question) return;
		setMessages((current) => [...current, { id: Date.now(), fromUser: true, text: question }, { id: Date.now() + 1, fromUser: false, text: getReply(question) }]);
		setDraft('');
	}

	return (
		<ThemedView style={styles.page}>
			<SafeAreaView style={styles.safeArea} edges={['top']}>
				<KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
					<View style={styles.header}><View style={styles.bot}><ThemedText style={styles.botFace}>•ᴗ•</ThemedText></View><View style={styles.headerCopy}><ThemedText style={styles.title}>Vyapar Saathi</ThemedText><ThemedText style={styles.online}>● Online • Business help</ThemedText></View><ThemedText style={styles.spark}>✦</ThemedText></View>
					<ScrollView style={styles.chat} contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
						<ThemedText style={styles.date}>TODAY</ThemedText>
						{messages.map((message) => <View key={message.id} style={[styles.message, message.fromUser ? styles.userMessage : styles.aiMessage]}><ThemedText style={[styles.messageText, message.fromUser && styles.userMessageText]}>{message.text}</ThemedText></View>)}
						<ThemedText style={styles.promptTitle}>Try asking</ThemedText>
						<View style={styles.quickRow}>{quickQuestions.map((question) => <Pressable key={question} style={styles.quickButton} onPress={() => sendMessage(question)}><ThemedText style={styles.quickText}>{question}</ThemedText></Pressable>)}</View>
					</ScrollView>
					<View style={styles.composer}><TextInput value={draft} onChangeText={setDraft} onSubmitEditing={() => sendMessage()} placeholder="Ask about your business..." placeholderTextColor="#84918B" style={styles.input} returnKeyType="send" /><Pressable style={styles.sendButton} onPress={() => sendMessage()}><ThemedText style={styles.sendText}>→</ThemedText></Pressable></View>
					  <ThemedText style={styles.disclaimer}>Please verify AI suggestions before making business decisions.</ThemedText>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	page: { flex: 1, backgroundColor: '#F8FAF9' },
	safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
	keyboard: { flex: 1 },
	header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E8EFEB' },
	bot: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#DDF4EA', alignItems: 'center', justifyContent: 'center' },
	botFace: { backgroundColor: '#173D38', color: '#B8F0D7', padding: 7, borderRadius: 12, fontSize: 12 },
	headerCopy: { flex: 1, marginLeft: 12 },
	title: { color: '#16211E', fontSize: 19, fontWeight: '800' },
	online: { color: '#16805E', fontSize: 11, marginTop: 3 },
	spark: { color: '#E7A52A', fontSize: 26 },
	chat: { flex: 1 },
	chatContent: { padding: 20, paddingBottom: 14 },
	date: { alignSelf: 'center', color: '#9AA59F', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 18 },
	message: { maxWidth: '84%', borderRadius: 16, padding: 13, marginBottom: 12 },
	aiMessage: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderTopLeftRadius: 4 },
	userMessage: { alignSelf: 'flex-end', backgroundColor: '#064A42', borderTopRightRadius: 4 },
	messageText: { color: '#35443E', fontSize: 14, lineHeight: 21 },
	userMessageText: { color: '#FFFFFF' },
	promptTitle: { color: '#697671', fontSize: 12, fontWeight: '700', marginTop: 8, marginBottom: 9 },
	quickRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
	quickButton: { borderWidth: 1, borderColor: '#BBD9CC', backgroundColor: '#F1FAF5', borderRadius: 18, paddingVertical: 9, paddingHorizontal: 12 },
	quickText: { color: '#17654F', fontSize: 12, fontWeight: '700' },
	composer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E8EFEB', padding: 12, gap: 9 },
	input: { flex: 1, height: 46, borderWidth: 1, borderColor: '#D6E1DB', borderRadius: 11, paddingHorizontal: 13, color: '#17221F', fontSize: 13, backgroundColor: '#FBFCFB' },
	sendButton: { width: 46, height: 46, borderRadius: 11, backgroundColor: '#064A42', alignItems: 'center', justifyContent: 'center' },
	sendText: { color: '#FFFFFF', fontSize: 25, marginTop: -2 },
	disclaimer: { color: '#9AA59F', backgroundColor: '#FFFFFF', textAlign: 'center', fontSize: 10, paddingBottom: 10 },
});
