import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { db } from "../firebase";
// import { toast } from "react-toastify";

export default function OAuth() {
  const router = useRouter();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      console.log(auth);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for the user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //以下の記述でgoogleアカウントでログインすると、firestoreにuser情報が追加される SnapShotが存在しない場合
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }

      router.push("/");
    } catch (error) {
      // toast.error("Could not authorize with google");
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase rounded text-sm font-mudium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2 " />
      Continue with Google
    </button>
  );
}
