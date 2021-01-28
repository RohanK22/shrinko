const express = require('express');
const path = require('path');
const app = express();
var firebase = require('firebase/app');
require('firebase/realtimedatabase');
const firebaseConfig = {
    apiKey: 'AIzaSyDUmnl3WBEt0b8PInWjPVXCUzc3WVS4Nsw',
    authDomain: 'shrinko-c4232.firebaseapp.com',
    projectId: 'shrinko-c4232',
    storageBucket: 'shrinko-c4232.appspot.com',
    messagingSenderId: '548651755093',
    appId: '1:548651755093:web:e239c2390900bff82696dc'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

app.use(express.json());

database.ref('users/' + userId).set(
    {
        username: name,
        email: email,
        profile_picture: imageUrl
    },
    (error) => {
        if (error) {
            // The write failed...
        } else {
            // Data saved successfully!
        }
    }
);

// Get URL from shortened URL ID
app.get('/short/:id', (req, res, next) => {
    res.json({
        message: 'Hello /short/:id'
    });
});
// Create a Shrotened URL

// Check stats  from shrotened URl ID

app.get('/ping', (req, res) => {
    console.log('got a /ping request');
    res.json({
        message: 'Pong'
    });
});

app.use(express.static(path.join(__dirname, 'public')));

let port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
