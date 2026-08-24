import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth } from '@/constants/theme';

type LegalSection = { title: string; text: string };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  const router = useRouter();

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>←  Back</ThemedText></Pressable>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.updated}>{updated}</ThemedText>
          {sections.map((section) => <ThemedView key={section.title} style={styles.section}><ThemedText style={styles.sectionTitle}>{section.title}</ThemedText><ThemedText style={styles.sectionText}>{section.text}</ThemedText></ThemedView>)}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAF9' },
  safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  content: { padding: 22, paddingBottom: 40 },
  back: { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 18 },
  backText: { color: '#17654F', fontSize: 14, fontWeight: '800' },
  title: { color: '#16211E', fontSize: 29, fontWeight: '800' },
  updated: { color: '#84918B', fontSize: 12, marginTop: 6, marginBottom: 22 },
  section: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 17, marginBottom: 12 },
  sectionTitle: { color: '#16211E', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  sectionText: { color: '#53625C', fontSize: 13, lineHeight: 21 },
});
