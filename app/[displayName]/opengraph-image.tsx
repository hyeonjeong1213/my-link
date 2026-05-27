import { ImageResponse } from "next/og";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { displayName: string } }) {
  const displayName = decodeURIComponent(params.displayName);
  
  let profileName = displayName;
  let introduction = "마이링크 프로필입니다.";
  let photoURL = "";

  try {
    const db = getFirestore(firebaseApp);
    const usersRef = collection(db, "user");
    const q = query(usersRef, where("displayName", "==", displayName));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      profileName = data.displayName || displayName;
      introduction = data.introduction || introduction;
      photoURL = data.photoURL || "";
    }
  } catch (error) {
    console.error("OG Image generation error:", error);
  }

  const avatarText = (profileName || "U").slice(0, 2).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage: "linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #f8fafc 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Profile Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "80px 60px",
            background: "rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            borderRadius: "64px",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.08)",
            width: "80%",
            maxWidth: 900,
          }}
        >
          {photoURL ? (
            <img
              src={photoURL}
              width={200}
              height={200}
              style={{
                borderRadius: "50%",
                border: "8px solid white",
                boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                marginBottom: 40,
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "#9333ea", // Tailwind purple-600
                color: "white",
                fontSize: 72,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "8px solid white",
                boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                marginBottom: 40,
              }}
            >
              {avatarText}
            </div>
          )}

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#111827",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            {profileName}
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#4b5563",
              textAlign: "center",
              maxWidth: "90%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {introduction}
          </div>
        </div>

        {/* Branding Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#9ca3af",
          }}
        >
          M Y L I N K
        </div>
      </div>
    ),
    { ...size }
  );
}
