import AsyncStorage from '@react-native-async-storage/async-storage';

const authStorageKey = 'vyapar-setu-authenticated';
let authenticated = false;
const listeners = new Set<() => void>();

export function isAuthenticated() {
  return authenticated;
}

export function setAuthenticated(value: boolean) {
  authenticated = value;
  if (value) {
    void AsyncStorage.setItem(authStorageKey, 'true');
  } else {
    void AsyncStorage.removeItem(authStorageKey);
  }
  listeners.forEach((listener) => listener());
}

export async function loadAuthentication() {
  authenticated = (await AsyncStorage.getItem(authStorageKey)) === 'true';
  return authenticated;
}

export function subscribeToAuth(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
