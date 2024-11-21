const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

require('dotenv').config();

const PORT = 8000;

const config = {
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECERT: process.env.CLIENT_SECERT
}

const app = express();

app.use(helmet());

const AUTH_OPTIONS = {
    callbackURL : '/auth/google/callback',
    clientID : config.CLIENT_ID,
    clientSecret : config.CLIENT_SECERT
}

function verifyCallBack(accessToken, refreshToken, profile, done){
    console.log('Google profile', profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallBack));

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

