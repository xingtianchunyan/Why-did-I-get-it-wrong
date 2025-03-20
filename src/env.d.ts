/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CKB_NODE_URL: string
  readonly VITE_CKB_INDEXER_URL: string
  readonly VITE_NETWORK: string
  readonly VITE_FIBER_CHANNEL_URL: string
  readonly VITE_FIBER_MIN_DEPOSIT: string
  readonly VITE_FIBER_CHALLENGE_PERIOD: string
  readonly VITE_AI_SERVICE_URL: string
  readonly VITE_AI_MODEL_TYPE: string
  readonly VITE_WS_URL: string
  readonly VITE_GAME_ENTRY_FEE: string
  readonly VITE_MIN_BET_AMOUNT: string
  readonly VITE_MAX_BET_AMOUNT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
