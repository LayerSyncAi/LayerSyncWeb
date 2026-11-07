/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** LayerSync Supabase project URL (set once the project exists). */
  readonly VITE_SUPABASE_URL?: string;
  /** LayerSync Supabase publishable/anon key. */
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** LayerSync's WhatsApp number, digits only (default 263775187682). See lib/contact.ts. */
  readonly VITE_WHATSAPP_NUMBER?: string;
  /** Where the Get in touch form saves (default: the SyncEstate Convex /website-enquiry route). */
  readonly VITE_ENQUIRY_ENDPOINT?: string;
  /** The SyncEstate product site (default https://syncrm.vercel.app). */
  readonly VITE_SYNC_ESTATE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
