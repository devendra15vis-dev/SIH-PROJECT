import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth } from '@/constants/theme';
import { getProfile, subscribeToProfile } from '@/constants/profile-store';

const actions = [
  { icon: '✦', title: 'Business\nIdeas', hint: 'Explore new opportunities', color: '#D8F5E9', iconColor: '#E6A900', route: '/business-idea' as const },
  { icon: '▥', title: 'Loans &\nSchemes', hint: 'Find the right financial support', color: '#E9ECFA', iconColor: '#334A9B', route: '/loan-schemes' as const },
  { icon: '◔', title: 'Market\nAnalysis', hint: 'Track trends and local prices', color: '#E0F1F7', iconColor: '#1760A5', route: '/market-analysis' as const },
  { icon: '●', title: 'AI Advisor', hint: 'Get instant business advice', color: '#FFF0D1', iconColor: '#152E2A', route: '/advisor' as const },
];

const metrics = [
  ['▣', 'Total Investment', '₹10,00,000', '#16805E'], ['⌁', 'Expected Revenue', '₹15,00,000', '#3979C7'],
  ['↗', 'Estimated Profit', '₹5,00,000', '#16805E'], ['▥', 'Loan Eligibility', '₹9,00,000', '#7558B6'],
];

export default function HomeScreen() {
  const router = useRouter();
  const [ownerName, setOwnerName] = useState(() => getProfile().ownerName);

  useEffect(() => subscribeToProfile(() => setOwnerName(getProfile().ownerName)), []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.brandMark}><ThemedText style={styles.leaf}>⌁</ThemedText></View>
            <View style={styles.brandCopy}><ThemedText style={styles.brand}>Vyapar Setu</ThemedText><ThemedText style={styles.tagline}>Your Digital Business Advisor</ThemedText></View>
            <Pressable style={styles.headerIcon}><ThemedText style={styles.bell}>♧</ThemedText><View style={styles.notificationDot} /></Pressable>
            <Pressable style={styles.profile}><ThemedText style={styles.profileIcon}>●</ThemedText></Pressable>
          </View>
          <ThemedText style={styles.greeting}>{ownerName ? `Hello, ${ownerName}!` : 'Hello!'} <ThemedText style={styles.wave}>⌁</ThemedText></ThemedText>
          <ThemedText style={styles.subGreeting}>Wishing you a successful business day.</ThemedText>
          <View style={styles.heroCard}><View style={styles.heroCopy}><ThemedText style={styles.heroTitle}>Build your dream business{'\n'}with the right guidance{'\n'}and support.</ThemedText><ThemedText style={styles.heroBody}>Get business plans, loan guidance, market{'\n'}insights and scheme information with AI.</ThemedText><Pressable style={styles.primaryButton}><ThemedText style={styles.primaryButtonText}>Create a Business Plan  →</ThemedText></Pressable></View><View style={styles.heroArt}><ThemedText style={styles.chartArrow}>↗</ThemedText><ThemedText style={styles.shop}>▰</ThemedText><ThemedText style={styles.coins}>● ●</ThemedText></View></View>
          <View style={styles.sectionHeading}><ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText><ThemedText style={styles.viewAll}>View All</ThemedText></View>
          <View style={styles.actionsRow}>{actions.map((action) => <Pressable key={action.title} onPress={() => router.push(action.route)} style={({ pressed }) => [styles.actionCard, { backgroundColor: action.color }, pressed && styles.pressed]}><ThemedText style={[styles.actionIcon, { color: action.iconColor }]}>{action.icon}</ThemedText><ThemedText style={styles.actionTitle}>{action.title}</ThemedText><ThemedText style={styles.actionHint}>{action.hint}</ThemedText></Pressable>)}</View>
          <View style={styles.sectionHeading}><ThemedText style={styles.sectionTitle}>My Business Overview</ThemedText><ThemedText style={styles.viewAll}>This Month ⌄</ThemedText></View>
          <View style={styles.metricsCard}>{metrics.map(([icon, label, value, color]) => <View key={label} style={styles.metric}><ThemedText style={[styles.metricIcon, { color }]}>{icon}</ThemedText><View><ThemedText style={styles.metricLabel}>{label}</ThemedText><ThemedText style={styles.metricValue}>{value}</ThemedText></View></View>)}</View>
          <View style={styles.chartCard}><View style={styles.chartHeader}><ThemedText style={styles.cardTitle}>Revenue vs Profit</ThemedText><ThemedText style={styles.legend}><ThemedText style={styles.greenDot}>●</ThemedText> Revenue   <ThemedText style={styles.blueDot}>●</ThemedText> Profit</ThemedText></View><View style={styles.chart}><View style={styles.gridLine} /><View style={[styles.line, styles.revenueLine]} /><View style={[styles.line, styles.profitLine]} />{[0, 1, 2, 3, 4, 5].map((point) => <View key={point} style={[styles.point, { left: `${point * 20}%`, top: `${[76, 57, 46, 34, 35, 12][point]}%` }]} />)}{[0, 1, 2, 3, 4, 5].map((point) => <View key={`profit-${point}`} style={[styles.point, styles.profitPoint, { left: `${point * 20}%`, top: `${[92, 77, 68, 58, 48, 35][point]}%` }]} />)}</View><View style={styles.axis}><ThemedText>Week 1</ThemedText><ThemedText>Week 2</ThemedText><ThemedText>Week 3</ThemedText><ThemedText>Week 4</ThemedText></View></View>
          <Pressable onPress={() => router.push('/advisor')} style={({ pressed }) => [styles.advisorCard, pressed && styles.pressed]}><View style={styles.bot}><ThemedText style={styles.botFace}>•ᴗ•</ThemedText></View><View style={styles.advisorCopy}><ThemedText style={styles.advisorTitle}>Vyapar Saathi</ThemedText><ThemedText style={styles.advisorText}>Planning to start a dairy business with a ₹5 lakh budget? I can help you create a business plan.</ThemedText></View><View style={styles.askButton}><ThemedText style={styles.askText}>Ask now  →</ThemedText></View></Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAF9' },
  safeArea: { flex: 1, maxWidth: MaxContentWidth, width: '100%', alignSelf: 'center' },
  content: { padding: 20, paddingBottom: 40, gap: 14 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  brandMark: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0B4D45', alignItems: 'center', justifyContent: 'center' },
  leaf: { color: '#BCECD4', fontSize: 29, transform: [{ rotate: '-35deg' }] },
  brandCopy: { marginLeft: 10, flex: 1 }, brand: { fontSize: 21, fontWeight: '800', color: '#17221F' }, tagline: { fontSize: 11, color: '#61706B', marginTop: 2 },
  headerIcon: { width: 34, height: 40, alignItems: 'center', justifyContent: 'center' }, bell: { fontSize: 27, color: '#17221F' }, notificationDot: { position: 'absolute', right: 4, top: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#E44B42' }, profile: { width: 35, alignItems: 'center' }, profileIcon: { fontSize: 25, color: '#17221F' },
  greeting: { fontSize: 27, fontWeight: '800', color: '#14201D', marginTop: 12 }, wave: { color: '#E7A52A', fontSize: 28 }, subGreeting: { color: '#65706D', fontSize: 13, marginTop: -6, marginBottom: 8 },
  heroCard: { minHeight: 244, borderRadius: 18, backgroundColor: '#064A42', padding: 22, flexDirection: 'row', overflow: 'hidden' }, heroCopy: { flex: 1, zIndex: 1 }, heroTitle: { color: '#FFFFFF', fontSize: 20, lineHeight: 27, fontWeight: '800' }, heroBody: { color: '#B9D8D0', fontSize: 13, lineHeight: 20, marginTop: 8 }, primaryButton: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', paddingVertical: 13, paddingHorizontal: 17, borderRadius: 10, marginTop: 18 }, primaryButtonText: { color: '#17302B', fontSize: 13, fontWeight: '700' }, heroArt: { width: '34%', alignItems: 'center', justifyContent: 'center' }, chartArrow: { fontSize: 70, color: '#F2BB42', transform: [{ rotate: '-15deg' }] }, shop: { color: '#F4A15B', fontSize: 72, marginTop: -27 }, coins: { color: '#F3BE39', fontSize: 22, marginTop: -13 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 11 }, sectionTitle: { fontSize: 18, fontWeight: '800', color: '#16211E' }, viewAll: { color: '#53625E', fontSize: 13 }, actionsRow: { flexDirection: 'row', gap: 10 }, actionCard: { flex: 1, minHeight: 168, borderRadius: 15, padding: 12, alignItems: 'center', justifyContent: 'center' }, actionIcon: { fontSize: 42, fontWeight: '700', marginBottom: 7 }, actionTitle: { color: '#1B2925', fontSize: 16, lineHeight: 20, fontWeight: '800', textAlign: 'center' }, actionHint: { color: '#4E5E58', fontSize: 10, lineHeight: 14, textAlign: 'center', marginTop: 6 },
  metricsCard: { backgroundColor: '#FFFFFF', borderRadius: 15, flexDirection: 'row', flexWrap: 'wrap', shadowColor: '#16362E', shadowOpacity: 0.08, shadowRadius: 10, elevation: 2 }, metric: { width: '50%', minHeight: 88, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderColor: '#EEF1EF' }, metricIcon: { fontSize: 30, width: 31, textAlign: 'center' }, metricLabel: { color: '#6C7672', fontSize: 12 }, metricValue: { color: '#18221F', fontSize: 17, fontWeight: '800', marginTop: 4 },
  chartCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 15, marginTop: 1 }, chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, cardTitle: { color: '#16211E', fontSize: 14, fontWeight: '800' }, legend: { color: '#69746F', fontSize: 11 }, greenDot: { color: '#4CB681' }, blueDot: { color: '#3979C7' }, chart: { height: 120, marginTop: 12, position: 'relative', borderBottomWidth: 1, borderColor: '#E4EAE7' }, gridLine: { position: 'absolute', top: '48%', width: '100%', borderTopWidth: 1, borderColor: '#EFF2F0' }, line: { position: 'absolute', width: '100%', borderTopWidth: 3, transformOrigin: 'left center' }, revenueLine: { top: '60%', transform: [{ rotate: '-12deg' }], borderColor: '#4CB681' }, profitLine: { top: '76%', transform: [{ rotate: '-9deg' }], borderColor: '#3979C7' }, point: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CB681', marginLeft: -4, marginTop: -4 }, profitPoint: { backgroundColor: '#3979C7' }, axis: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 9, paddingHorizontal: 12 },
  advisorCard: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 1 }, bot: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#DDF4EA', alignItems: 'center', justifyContent: 'center' }, botFace: { backgroundColor: '#173D38', color: '#B8F0D7', padding: 8, borderRadius: 14, fontSize: 13 }, advisorCopy: { flex: 1 }, advisorTitle: { color: '#18221F', fontSize: 15, fontWeight: '800' }, advisorText: { color: '#4D5A56', fontSize: 12, lineHeight: 16, marginTop: 2 }, askButton: { backgroundColor: '#064A42', paddingVertical: 12, paddingHorizontal: 13, borderRadius: 10 }, askText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pressed: { opacity: 0.78 },
});
