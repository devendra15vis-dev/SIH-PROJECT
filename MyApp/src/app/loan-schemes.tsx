import { InsightPage } from '@/components/insight-page';

export default function LoanSchemesScreen() {
  return <InsightPage icon="▥" color="#334A9B" title="Loans & Schemes" subtitle="Explore government schemes and finance options for your business." actionLabel="Check eligibility" insights={[
    { title: 'PM Mudra Loan', text: 'Collateral-free support across Shishu, Kishor and Tarun categories.', value: 'Up to ₹10L' },
    { title: 'Stand-Up India', text: 'Business finance for women and SC/ST entrepreneurs.', value: '₹10L–₹1Cr' },
    { title: 'Working capital', text: 'Flexible funding for stock, rent and daily operations.', value: 'Custom' },
    { title: 'Keep documents ready', text: 'Aadhaar, PAN, bank statements, address proof and a business plan.', value: 'Required' },
  ]} />;
}
