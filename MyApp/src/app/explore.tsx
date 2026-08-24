import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getProfile, subscribeToProfile } from '@/constants/profile-store';
import { MaxContentWidth } from '@/constants/theme';

type CategoryContent = {
  match: string[];
  title: string;
  summary: string;
  focus: string[];
  products: string[];
  color: string;
};

const categoryContent: CategoryContent[] = [
  { match: ['dairy', 'milk', 'food'], title: 'Dairy & Food Business', summary: 'Grow your dairy and food business with better stock, delivery and customer planning.', focus: ['Track fresh stock daily', 'Offer monthly customer subscriptions', 'Promote delivery in nearby areas'], products: ['Fresh milk subscription', 'Paneer and curd', 'Home delivery'], color: '#16805E' },
  { match: ['retail', 'shop', 'store', 'general'], title: 'Retail Business', summary: 'Manage your store, discover fast-moving products and bring customers back.', focus: ['Track your best-selling products', 'Create weekly local offers', 'Maintain healthy stock levels'], products: ['Daily-use products', 'Local delivery', 'Festival offers'], color: '#334A9B' },
  { match: ['tailor', 'clothing', 'fashion', 'boutique'], title: 'Fashion & Tailoring Business', summary: 'Build a stronger customer base with custom orders, quality work and local marketing.', focus: ['Record measurements and orders', 'Showcase new designs online', 'Plan seasonal collections'], products: ['Custom tailoring', 'Alteration service', 'Ready-made clothing'], color: '#A54E75' },
  { match: ['service', 'repair', 'salon', 'digital'], title: 'Local Service Business', summary: 'Turn your skills into repeat business with simple bookings and great service.', focus: ['Create a clear service menu', 'Collect customer reviews', 'Offer repeat-visit packages'], products: ['Home service', 'Digital bookings', 'Monthly packages'], color: '#1760A5' },
];

function getCategoryContent(category: string) {
  const normalized = category.toLowerCase();
  return categoryContent.find((item) => item.match.some((keyword) => normalized.includes(keyword))) ?? {
    match: [], title: `${category || 'Your'} Business`, summary: `Plan and grow your ${category || 'business'} with practical daily insights.`, focus: ['Understand your local customers', 'Track sales and expenses', 'Create a simple growth plan'], products: ['Popular products', 'Customer service', 'Local promotions'], color: '#064A42',
  };
}

export default function BusinessScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState(getProfile());

  useEffect(() => subscribeToProfile(() => setProfile({ ...getProfile() })), []);

  const content = getCategoryContent(profile.businessCategory || profile.businessName);

  return (
    <ThemedView style={styles.page}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText style={styles.eyebrow}>MY BUSINESS</ThemedText>
          <View style={styles.headingRow}><View style={styles.headingCopy}><ThemedText style={styles.title}>{content.title}</ThemedText><ThemedText style={styles.subtitle}>{profile.businessName || 'Add your business name in Profile'}</ThemedText></View><View style={[styles.categoryIcon, { backgroundColor: content.color }]}><ThemedText style={styles.categoryIconText}>▥</ThemedText></View></View>
          {!profile.businessCategory && !profile.businessName ? <View style={styles.setupBanner}><ThemedText style={styles.setupTitle}>Personalize your business page</ThemedText><ThemedText style={styles.setupText}>Add your business name and category in Profile to see recommendations made for your business.</ThemedText><Pressable style={styles.setupButton} onPress={() => router.push('/profile')}><ThemedText style={styles.setupButtonText}>Complete business profile  →</ThemedText></Pressable></View> : null}
          <ThemedText style={styles.sectionTitle}>Your business snapshot</ThemedText>
          <View style={styles.summaryCard}><ThemedText style={styles.summary}>{content.summary}</ThemedText><View style={styles.stats}><View><ThemedText style={styles.statValue}>24</ThemedText><ThemedText style={styles.statLabel}>New customers</ThemedText></View><View><ThemedText style={styles.statValue}>₹18.5k</ThemedText><ThemedText style={styles.statLabel}>This week sales</ThemedText></View><View><ThemedText style={styles.statValue}>4.8</ThemedText><ThemedText style={styles.statLabel}>Customer rating</ThemedText></View></View></View>
          <ThemedText style={styles.sectionTitle}>Recommended focus</ThemedText>
          <View style={styles.card}>{content.focus.map((item, index) => <View key={item} style={styles.listItem}><View style={[styles.number, { backgroundColor: content.color }]}><ThemedText style={styles.numberText}>{index + 1}</ThemedText></View><ThemedText style={styles.listText}>{item}</ThemedText></View>)}</View>
          <ThemedText style={styles.sectionTitle}>Products and services to consider</ThemedText>
          <View style={styles.productRow}>{content.products.map((product) => <View key={product} style={styles.product}><ThemedText style={styles.productIcon}>✦</ThemedText><ThemedText style={styles.productText}>{product}</ThemedText></View>)}</View>
          <Pressable style={styles.supplierButton} onPress={() => router.push('/supplier-chat')}><ThemedText style={styles.supplierButtonText}>Check fresh stock with a supplier  →</ThemedText></Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: content.color }]} onPress={() => router.push('/advisor')}><ThemedText style={styles.actionText}>Ask AI for a {profile.businessCategory || 'business'} plan  →</ThemedText></Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F8FAF9' }, safeArea: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' }, content: { padding: 22, paddingBottom: 42 },
  eyebrow: { color: '#16805E', fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginBottom: 12 }, headingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 }, headingCopy: { flex: 1 }, title: { color: '#16211E', fontSize: 27, lineHeight: 32, fontWeight: '800' }, subtitle: { color: '#687570', fontSize: 13, marginTop: 5 }, categoryIcon: { width: 58, height: 58, borderRadius: 17, alignItems: 'center', justifyContent: 'center' }, categoryIconText: { color: '#FFFFFF', fontSize: 29 },
  setupBanner: { backgroundColor: '#E4F4EC', borderRadius: 15, padding: 16, marginTop: 18 }, setupTitle: { color: '#164D3D', fontSize: 15, fontWeight: '800' }, setupText: { color: '#4C6D60', fontSize: 12, lineHeight: 18, marginTop: 5 }, setupButton: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 9, paddingVertical: 10, paddingHorizontal: 12, marginTop: 12 }, setupButtonText: { color: '#17654F', fontSize: 12, fontWeight: '800' },
  sectionTitle: { color: '#16211E', fontSize: 17, fontWeight: '800', marginTop: 22, marginBottom: 10 }, summaryCard: { backgroundColor: '#064A42', borderRadius: 16, padding: 18 }, summary: { color: '#D4EEE4', fontSize: 14, lineHeight: 21 }, stats: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#3B766B', marginTop: 17, paddingTop: 14 }, statValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' }, statLabel: { color: '#B5D5CB', fontSize: 10, marginTop: 3 }, card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 17 }, listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 11 }, number: { width: 27, height: 27, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, numberText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' }, listText: { color: '#34443E', fontSize: 14, flex: 1 }, productRow: { flexDirection: 'row', gap: 9 }, product: { flex: 1, minHeight: 92, backgroundColor: '#FFFFFF', borderRadius: 13, padding: 12, justifyContent: 'space-between' }, productIcon: { color: '#E6A900', fontSize: 21 }, productText: { color: '#34443E', fontSize: 12, fontWeight: '700', lineHeight: 17 }, supplierButton: { borderWidth: 1, borderColor: '#16805E', borderRadius: 11, alignItems: 'center', paddingVertical: 13, marginTop: 16 }, supplierButtonText: { color: '#17654F', fontSize: 13, fontWeight: '800' }, actionButton: { borderRadius: 11, alignItems: 'center', paddingVertical: 14, marginTop: 12 }, actionText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});
