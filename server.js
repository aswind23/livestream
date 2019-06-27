const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/search', function(req, res) {
    let query = req.query.queryStr;
    let url = `https://glivestreaming.com/api.php?action=getmatch&apiuser=9wsnk&key=sEqw43df6M&format=JSON`;

    axios({
        method:'get',
        url: url
    })
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.listen(port, function () {
    console.log('Intentwise app is running on http://localhost:' + port);
});