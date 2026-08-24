import { LegalPage } from '@/components/legal-page';

export default function PrivacyScreen() {
  return <LegalPage title="Privacy Policy" updated="Last updated: August 2026" sections={[
    { title: '🔐 Privacy & Data Safety', text: 'Your personal and business information will be stored securely.\n\nYour information will not be shared with third parties without your permission, except where legally required.\n\nYour data will be used only to provide and improve AI Business Advisor services and recommendations.\n\nYour password and login credentials will be protected using appropriate security measures.\n\nYou may request access to or deletion of your personal data, subject to applicable requirements.\n\nBy creating an account, you agree to our Terms & Conditions and Privacy Policy.' },
    { title: 'Information we collect', text: 'We may collect the name, phone number, email, location and business details that you choose to enter in your profile.' },
    { title: 'How we use your information', text: 'Your information helps personalize the Home greeting, business suggestions, AI Advisor replies and profile experience.' },
    { title: 'Your control', text: 'You can edit your profile details at any time. You can also log out from the Profile page to end your current session.' },
    { title: 'Data safety', text: 'We aim to protect the information you provide. Do not enter passwords, bank PINs, OTPs or other highly sensitive information into business guidance chats.' },
  ]} />;
}
