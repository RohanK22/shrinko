const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Get URL from shortened URL ID

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
