import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';

firebase.initializeApp({
    apiKey: "AIzaSyBdIwRV9GYHWfxCoPKMmSzamSmRP3EpJLg",
    authDomain: "perfil-costamilam.firebaseapp.com",
    databaseURL: "https://perfil-costamilam.firebaseio.com",
    projectId: "perfil-costamilam",
    storageBucket: "perfil-costamilam.appspot.com",
    messagingSenderId: '399477884691'
});

export const auth = firebase.auth();
export const persistence = firebase.auth.Auth.Persistence;
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const database = firebase.database();

export const messaging = firebase.messaging();
