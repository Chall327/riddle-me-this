import { db } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

export async function saveScore(score, user) {
    await setDoc(doc(db, "scores", user), { score });
}

export async function getScore(user) {
    const ref = doc(db, "scores", user)
    const snapShot = await getDoc(ref)
    if (snapShot.exists()) {
        return snapShot.data().score
    }
    else {
        return 0
    }
}