import type { Metadata } from "next";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase";

export async function generateMetadata({ params }: { params: { displayName: string } }): Promise<Metadata> {
  const displayName = decodeURIComponent(params.displayName);
  
  let profileName = displayName;
  let introduction = "마이링크 프로필입니다.";

  try {
    const db = getFirestore(firebaseApp);
    const usersRef = collection(db, "user");
    const q = query(usersRef, where("displayName", "==", displayName));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      profileName = data.displayName || displayName;
      introduction = data.introduction || introduction;
    }
  } catch (error) {
    console.error("Metadata generation error:", error);
  }

  return {
    title: `${profileName}님의 프로필`,
    description: introduction,
    openGraph: {
      title: `${profileName}님의 프로필 | MYLINK`,
      description: introduction,
      type: "profile",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
