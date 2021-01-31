import { firebase } from '@firebase/app';
import 'firebase/storage';


const config =
    {   
        apiKey: "AIzaSyCAk_ePPMI5L9yb5hfiaZilNWIm8LoDbRk",
        authDomain: "aec-proyectointegrador2.firebaseapp.com",
        projectId: "aec-proyectointegrador2",
        storageBucket: "aec-proyectointegrador2.appspot.com",
        messagingSenderId: "53337456584",
        appId: "1:53337456584:web:b1bb2e04a74ec63bb1cafd",
        measurementId: "G-LZE7DNB8JW"
    };
    var app =firebase.initializeApp(config);

    export default app;