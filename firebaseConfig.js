import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuracion
const firebaseConfig = {
  apiKey: "AIzaSyAbZOv0e3uMPCxhbcjY3q59w4dkfG798lE",
  authDomain: "registrocuentas-ccede.firebaseapp.com",
  projectId: "registrocuentas-ccede",
  storageBucket: "registrocuentas-ccede.firebasestorage.app",
  messagingSenderId: "821777681604",
  appId: "1:821777681604:web:001574f6d61a8ccf5b4d91"
};

// Inicializa firebase
const app = initializeApp(firebaseConfig);

// Inicializa firebase auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) //Permite que Firebase utilice librerías de almacenamiento compatibles con React Native para guardar información como el token de autenticación del usuario.
});

const db = getFirestore(app);
export { auth, db};

