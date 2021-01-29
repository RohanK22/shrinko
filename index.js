const express = require('express');
const path = require('path');
const app = express();
var randtoken = require('rand-token');
var firebase = require('firebase/app');
require('firebase/database');
const firebaseConfig = {
    apiKey: 'AIzaSyDUmnl3WBEt0b8PInWjPVXCUzc3WVS4Nsw',
    authDomain: 'shrinko-c4232.firebaseapp.com',
    databaseURL:
        'https://shrinko-c4232-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'shrinko-c4232',
    storageBucket: 'shrinko-c4232.appspot.com',
    messagingSenderId: '548651755093',
    appId: '1:548651755093:web:e239c2390900bff82696dc'
};
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

app.use(express.json());

// Get URL from shortened URL ID
app.get('/:id', (req, res, next) => {
    let userId = req.params.id;
    if (userId) {
        database
            .ref('/urls/' + userId)
            .once('value')
            .then((snapshot) => {
                const data = snapshot.val();
                console.log(data.url);
                if (data.url != null) {
                    res.status(301).redirect(data.url);
                } else {
                    res.json({
                        message: 'URL not found'
                    });
                }
            });
    } else {
        res.json({
            message: 'Invalid URL'
        });
    }
});

// Create a Shrotened URL
app.post('/short/', (req, res, next) => {
    const url = req.body.url;
    if (url) {
        var suid = require('rand-token').suid;
        const id = suid(16);
        database.ref('urls/' + id).set(
            {
                url: url
            },
            (error) => {
                if (error) {
                    res.json(error);
                } else {
                    res.json({
                        id: id
                    });
                }
            }
        );
    } else {
        res.json({
            message: 'Invalid URL'
        });
    }
});
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
