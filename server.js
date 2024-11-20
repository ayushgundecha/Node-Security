const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');


const PORT = 8000;

const app = express();

app.use(helmet());

function checkLoggedIn(req, res, next){
    const isLoggedIn = true; //todo
    if(!isLoggedIn){
        res.status(401).join({
            error : 'You must log In!',
        });
    }
}

app.get('/secret', checkLoggedIn, (req, res)=> {
    return res.send('your personal secert data is 33');
});

app.get('/auth/google', (req, res)=> {});

app.get('/auth/google/callback', (req, res) => {});

app.get('/auth/logout', (req, res) => {});

app.get('/',(req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https.createServer({
    key : fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () =>{
    console.log(`listening to the PORT ${PORT}...`);
});

