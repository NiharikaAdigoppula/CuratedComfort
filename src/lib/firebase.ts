import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "AIzaSyC4-TNIS-L_1I9ZNek5YBw2tkoJuy7n7z8",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "sage-bolt-kdckx.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "sage-bolt-kdckx",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "sage-bolt-kdckx.firebasestorage.app",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "848592950219",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || "1:848592950219:web:03e88e096c1e61f3f31c4e"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with the custom database ID exactly as documented in the Firebase integration guide
export const db = getFirestore(app, (import.meta as any).env.VITE_FIREBASE_DATABASE_ID || "ai-studio-00d724da-2a64-4c05-a07b-9b456f0551c4");

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error("Firestore Error wrapped:", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
