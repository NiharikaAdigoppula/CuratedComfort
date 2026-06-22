import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4-TNIS-L_1I9ZNek5YBw2tkoJuy7n7z8",
  authDomain: "sage-bolt-kdckx.firebaseapp.com",
  projectId: "sage-bolt-kdckx",
  storageBucket: "sage-bolt-kdckx.firebasestorage.app",
  messagingSenderId: "848592950219",
  appId: "1:848592950219:web:03e88e096c1e61f3f31c4e"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with the custom database ID exactly as documented in the Firebase integration guide
export const db = getFirestore(app, "ai-studio-00d724da-2a64-4c05-a07b-9b456f0551c4");

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
