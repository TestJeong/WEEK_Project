import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import {FIRESTORE_API_KEY, FIRESTORE_AuthDomain, FIRESTORE_DatabaseURL, FIRESTORE_ProjectId, FIRESTORE_StorageBucket, FIRESTORE_MessagingSenderId, FIRESTORE_AppId, FIRESTORE_Id} from '@env';

//import "firebase/compat/auth";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: FIRESTORE_API_KEY,
  authDomain: FIRESTORE_AuthDomain,
  databaseURL: FIRESTORE_DatabaseURL,
  projectId: FIRESTORE_ProjectId,
  storageBucket: FIRESTORE_StorageBucket,
  messagingSenderId: FIRESTORE_MessagingSenderId,
  appId: FIRESTORE_AppId,
  measurementId: FIRESTORE_Id,
};

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
