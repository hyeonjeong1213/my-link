"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMtiL8RJuSHoADVWdDxCYRYd6rfZrHu4Q",
  authDomain: "my-hy-link-3f0b3.firebaseapp.com",
  projectId: "my-hy-link-3f0b3",
  storageBucket: "my-hy-link-3f0b3.firebasestorage.app",
  messagingSenderId: "935228024412",
  appId: "1:935228024412:web:9f2b403a4c48d490726899",
  measurementId: "G-LPPJ1TEGEV",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(firebaseApp) : (null as unknown as Analytics);
export const auth = getAuth(firebaseApp);

export default firebaseApp;

