export type ProfileData = {
  ownerName: string;
  mobile: string;
  email: string;
  businessName: string;
  businessCategory: string;
  location: string;
};

let profile: ProfileData = {
  ownerName: '',
  mobile: '',
  email: '',
  businessName: '',
  businessCategory: '',
  location: '',
};

const listeners = new Set<() => void>();

export function getProfile() {
  return profile;
}

export function saveProfile(nextProfile: ProfileData) {
  profile = nextProfile;
  listeners.forEach((listener) => listener());
}

export function subscribeToProfile(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
