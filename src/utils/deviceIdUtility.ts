// deviceId.utility.ts
import { v4 } from 'uuid';

export function generateDeviceId(): string {
  return v4();
}

export function getDeviceId(): string {
  const existingId = localStorage.getItem(import.meta.env.VITE_API_URL);

  if (existingId) {
    return existingId;
  }

  const deviceId = generateDeviceId();

  localStorage.setItem(import.meta.env.VITE_API_URL, deviceId);

  return deviceId;
}

export function clearDeviceId(): void {
  localStorage.removeItem(import.meta.env.VITE_API_URL);
}
