// src/lib/FirebaseProvider.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import { firebaseApp, analytics } from "./firebase";
import { AuthProvider } from "./AuthContext";
import type { FirebaseApp } from "firebase/app";
import type { Analytics } from "firebase/analytics";

interface FirebaseContextProps {
  app: FirebaseApp;
  analytics: Analytics | null;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ app: firebaseApp, analytics }}>
      <AuthProvider>{children}</AuthProvider>
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
