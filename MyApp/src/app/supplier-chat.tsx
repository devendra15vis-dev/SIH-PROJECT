import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Linking, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getProfile } from '@/constants/profile-store';
import { MaxContentWidth } from '@/constants/theme';

type Message = { id: number; text: string; fromUser: boolean };

export default function SupplierChatScreen() {
  const router = useRouter();
  const profile = getProfile();
  const item = profile.businessCategory || 'your products';
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, fromUser: true, text: `Hello, do you have fresh stock available for ${item}?` },
    { id: 2, fromUser: false, text: 'Hello! I am checking the latest stock for you. Please share the quantity you need and your preferred delivery time.' },
  ]);

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => [...current, { id: Date.now(), fromUser: true, text }]);
    setDraft('');
  }

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.header}><Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>←</ThemedText></Pressable><View style={styles.supplierAvatar}><ThemedText style={styles.avatarText}>S</ThemedText></View><View style={styles.headerCopy}><ThemedText style={styles.title}>Fresh Stock Supplier</ThemedText><ThemedText style={styles.online}>● Online • Usually replies quickly</ThemedText></View></View>
          <View style={styles.info}><ThemedText style={styles.infoIcon}>✓</ThemedText><ThemedText style={styles.infoText}>Ask about availability, quantity, quality and delivery.</ThemedText></View>
          <View style={styles.contactCard}><View style={styles.contactCopy}><ThemedText style={styles.contactName}>Rajesh Kumar</ThemedText><ThemedText style={styles.contactDetail}>Fresh stock supplier</ThemedText><ThemedText style={styles.contactDetail}>📍 Jaipur, Rajasthan  •  +91 98765 43210</ThemedText></View><Pressable style={styles.callButton} onPress={() => { void Linking.openURL('tel:+919876543210'); }}><ThemedText style={styles.callText}>☎  Call</ThemedText></Pressable></View>
          <ScrollView style={styles.chat} contentContainerStyle={styles.chatContent} showsVerticalScrollIndicator={false}>
            {messages.map((message) => <View key={message.id} style={[styles.message, message.fromUser ? styles.userMessage : styles.supplierMessage]}><ThemedText style={[styles.messageText, message.fromUser && styles.userMessageText]}>{message.text}</ThemedText></View>)}
          </ScrollView>
          <View style={styles.quick}><Pressable onPress={() => { setDraft('Is fresh stock available today?'); }} style={styles.quickButton}><ThemedText style={styles.quickText}>Ask about today&apos;s stock</ThemedText></Pressable><Pressable onPress={() => { setDraft('What is the price and minimum quantity?'); }} style={styles.quickButton}><ThemedText style={styles.quickText}>Ask price & quantity</ThemedText></Pressable></View>
          <View style={styles.composer}><TextInput value={draft} onChangeText={setDraft} onSubmitEditing={sendMessage} placeholder="Type your message..." placeholderTextColor="#84918B" style={styles.input} returnKeyType="send" /><Pressable style={styles.sendButton} onPress={sendMessage}><ThemedText style={styles.sendText}>→</ThemedText></Pressable></View>
          <ThemedText style={styles.note}>Never share your OTP, PIN or password with anyone.</ThemedText>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAF9' }, safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' }, keyboard: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E8EFEB' }, back: { padding: 8, marginRight: 4 }, backText: { color: '#17654F', fontSize: 23 }, supplierAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#D8F5E9', alignItems: 'center', justifyContent: 'center' }, avatarText: { color: '#17654F', fontSize: 20, fontWeight: '800' }, headerCopy: { flex: 1, marginLeft: 11 }, title: { color: '#16211E', fontSize: 17, fontWeight: '800' }, online: { color: '#16805E', fontSize: 11, marginTop: 3 },
  info: { flexDirection: 'row', alignItems: 'center', gap: 9, margin: 16, padding: 12, borderRadius: 10, backgroundColor: '#E4F4EC' }, infoIcon: { color: '#16805E', fontWeight: '800' }, infoText: { color: '#4C6D60', fontSize: 12, flex: 1 }, chat: { flex: 1 }, chatContent: { padding: 18, paddingBottom: 8 }, message: { maxWidth: '84%', borderRadius: 15, padding: 13, marginBottom: 12 }, userMessage: { alignSelf: 'flex-end', backgroundColor: '#064A42', borderTopRightRadius: 4 }, supplierMessage: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderTopLeftRadius: 4 }, messageText: { color: '#35443E', fontSize: 14, lineHeight: 21 }, userMessageText: { color: '#FFFFFF' },
  contactCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 8, padding: 14, borderRadius: 13, backgroundColor: '#FFFFFF', shadowColor: '#16362E', shadowOpacity: 0.05, shadowRadius: 7, elevation: 1 }, contactCopy: { flex: 1 }, contactName: { color: '#16211E', fontSize: 15, fontWeight: '800' }, contactDetail: { color: '#697671', fontSize: 11, marginTop: 3 }, callButton: { backgroundColor: '#DDF4EA', borderRadius: 9, paddingVertical: 10, paddingHorizontal: 12 }, callText: { color: '#17654F', fontSize: 12, fontWeight: '800' },
  quick: { flexDirection: 'row', gap: 7, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF' }, quickButton: { flex: 1, borderWidth: 1, borderColor: '#BBD9CC', borderRadius: 16, paddingVertical: 8, alignItems: 'center' }, quickText: { color: '#17654F', fontSize: 10, fontWeight: '700' }, composer: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 12, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E8EFEB' }, input: { flex: 1, height: 46, borderWidth: 1, borderColor: '#D6E1DB', borderRadius: 10, paddingHorizontal: 13, color: '#17221F', fontSize: 13 }, sendButton: { width: 46, height: 46, borderRadius: 11, backgroundColor: '#064A42', alignItems: 'center', justifyContent: 'center' }, sendText: { color: '#FFFFFF', fontSize: 25 }, note: { color: '#9AA59F', textAlign: 'center', fontSize: 10, backgroundColor: '#FFFFFF', paddingBottom: 10 },
});
