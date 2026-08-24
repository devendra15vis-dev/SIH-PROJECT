import { InsightPage } from '@/components/insight-page';

export default function BusinessIdeaScreen() {
  return <InsightPage icon="✦" color="#E6A900" title="Business Ideas" subtitle="Choose a business idea that fits your area, skills and budget." actionLabel="Start your plan" insights={[
    { title: 'Home food delivery', text: 'Start with homemade snacks, lunch boxes or regional food.', value: '₹25k+' },
    { title: 'Local retail store', text: 'Daily-use products ko nearby customers tak pahunchayein.', value: '₹1L+' },
    { title: 'Dairy subscription', text: 'Offer monthly delivery of fresh milk and dairy products.', value: '₹50k+' },
    { title: 'Digital service center', text: 'Provide online forms, printing and payment services.', value: '₹40k+' },
  ]} />;
}
