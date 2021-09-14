const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { PORT, HOST, db, apiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');

const app = express();

app.get('/test', (req, res) => {
    res.send('auth API works!');
});


app.get('/currentUser', (req, res) => {
    res.json({
        id: '123',
        email: 'foo@gmail.com'
    })
});


app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata')
        .then(response => {
            res.json({
                testapidata: response.data.testapidata,
            })
        })
        .catch(e => console.log(e));
});
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`The auth server is running on ${HOST}:${PORT}`);
        console.log(`The host is ${HOST}`);
        console.log(`Database URL is ${db}`)
        console.log(`auth api url is ${ apiUrl }`);
    });
}

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);


