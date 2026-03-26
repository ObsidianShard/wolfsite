/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_IPINFO_API_KEY: string
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_COINGECKO_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
