/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly NODE_ENV?: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY?: string;
  readonly VITE_DEVICE_ID_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
