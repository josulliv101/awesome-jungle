import admin from "firebase-admin"
// import { authConfig } from "../config/server-config";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

const initializeApp = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  })
}

export const getFirebaseAdminApp = () => {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App
  }

  // admin.firestore.setLogFunction(console.log);

  return initializeApp()
}

export const db = admin.firestore(getFirebaseAdminApp())
