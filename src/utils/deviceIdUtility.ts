// deviceId.utility.ts
import { v4 } from 'uuid';

export function generateDeviceId(): string {
  return v4();
}

export function getDeviceId(): string {
  const existingId = localStorage.getItem(import.meta.env.VITE_DEVICE_ID_KEY);

  if (existingId) {
    return existingId;
  }

  const deviceId = generateDeviceId();

  localStorage.setItem(import.meta.env.VITE_DEVICE_ID_KEY, deviceId);

  return deviceId;
}

export function clearDeviceId(): void {
  localStorage.removeItem(import.meta.env.VITE_DEVICE_ID_KEY);
}
