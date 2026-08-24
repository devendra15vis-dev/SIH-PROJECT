import { InsightPage } from '@/components/insight-page';

export default function MarketAnalysisScreen() {
  return <InsightPage icon="◔" color="#1760A5" title="Market Analysis" subtitle="Understand your market and make better business decisions." actionLabel="View market report" insights={[
    { title: 'Local demand', text: 'Demand is strong for food, household items and convenient delivery.', value: 'High' },
    { title: 'Customer trend', text: 'Customers increasingly prefer WhatsApp offers and home delivery.', value: '+18%' },
    { title: 'Competition check', text: 'Compare the prices and services of three competitors in your area.', value: '3 steps' },
    { title: 'Growth opportunity', text: 'Focus on digital payments and repeat-customer plans.', value: 'Good' },
  ]} />;
}
