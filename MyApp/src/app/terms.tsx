import { LegalPage } from '@/components/legal-page';

export default function TermsScreen() {
  return <LegalPage title="Terms & Conditions" updated="Last updated: August 2026" sections={[
    { title: 'Using Vyapar Setu', text: 'Vyapar Setu helps small business owners explore ideas, schemes, market information and business planning tools. Use the app responsibly and provide accurate information.' },
    { title: 'Account access', text: 'You are responsible for keeping your phone number and account access secure. Do not share verification details with anyone.' },
    { title: 'Business guidance', text: 'Suggestions, loan information and market insights are for general guidance. Always confirm eligibility, rates and official scheme details with the relevant provider.' },
    { title: 'AI Advisor', text: 'AI responses are generated suggestions and may not always be complete or current. Review them before making financial or business decisions.' },
  ]} />;
}
