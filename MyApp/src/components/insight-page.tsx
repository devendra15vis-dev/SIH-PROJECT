import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth } from '@/constants/theme';

type Insight = { title: string; text: string; value?: string };

type InsightPageProps = {
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  insights: Insight[];
  actionLabel: string;
};

export function InsightPage({ icon, color, title, subtitle, insights, actionLabel }: InsightPageProps) {
  const router = useRouter();

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>←  Home</ThemedText></Pressable>
          <View style={[styles.icon, { backgroundColor: color }]}><ThemedText style={styles.iconText}>{icon}</ThemedText></View>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          <View style={styles.list}>{insights.map((insight) => <View key={insight.title} style={styles.insight}><View style={styles.check}><ThemedText style={styles.checkText}>✓</ThemedText></View><View style={styles.insightCopy}><ThemedText style={styles.insightTitle}>{insight.title}</ThemedText><ThemedText style={styles.insightText}>{insight.text}</ThemedText></View>{insight.value && <ThemedText style={styles.value}>{insight.value}</ThemedText>}</View>)}</View>
          <Pressable style={styles.actionButton}><ThemedText style={styles.actionText}>{actionLabel}  →</ThemedText></Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAF9' },
  safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  content: { padding: 22, paddingBottom: 44 },
  back: { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 18 },
  backText: { color: '#17654F', fontSize: 14, fontWeight: '800' },
  icon: { width: 62, height: 62, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  iconText: { color: '#FFFFFF', fontSize: 32, fontWeight: '800' },
  title: { color: '#16211E', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#697671', fontSize: 14, lineHeight: 21, marginTop: 7, marginBottom: 22 },
  list: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, shadowColor: '#16362E', shadowOpacity: 0.07, shadowRadius: 12, elevation: 2 },
  insight: { flexDirection: 'row', alignItems: 'flex-start', borderBottomWidth: 1, borderColor: '#EDF1EF', paddingVertical: 15, gap: 11 },
  check: { width: 25, height: 25, borderRadius: 13, backgroundColor: '#DDF4EA', alignItems: 'center', justifyContent: 'center' },
  checkText: { color: '#16805E', fontWeight: '800' },
  insightCopy: { flex: 1 },
  insightTitle: { color: '#1B2925', fontSize: 15, fontWeight: '800' },
  insightText: { color: '#697671', fontSize: 12, lineHeight: 18, marginTop: 3 },
  value: { color: '#16805E', fontSize: 13, fontWeight: '800' },
  actionButton: { backgroundColor: '#064A42', borderRadius: 11, alignItems: 'center', paddingVertical: 14, marginTop: 22 },
  actionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
