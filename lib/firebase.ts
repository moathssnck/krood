// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyBSBQlPHwbrkBxeQ54RZw6jGUkfcBAeI-0",
  authDomain: "moror-7892f.firebaseapp.com",
  databaseURL: "https://moror-7892f-default-rtdb.firebaseio.com",
  projectId: "moror-7892f",
  storageBucket: "moror-7892f.firebasestorage.app",
  messagingSenderId: "644937901522",
  appId: "1:644937901522:web:e9fcf90e8d6d187f7b140b",
  measurementId: "G-FEC36WC9S7"
};

const app =  initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export async function addData(data: any) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = await doc(db, 'pays', data.id!);
    await setDoc(docRef, {...data,createdDate:new Date().toISOString()},{merge:true});

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(
        docRef,
        { ...paymentInfo, status: 'pending' },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
export { db,database };
