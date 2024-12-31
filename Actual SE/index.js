const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');
const sqlite3 = require('sqlite3');
const { json } = require('express');
const bodyParser = require('body-parser');


var db = new sqlite3.Database(".database/databse.db");

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});
app.get("/discography", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/discography.html'));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/about.html'));
});

app.get("/Hybe", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/Hybe.html'));
});

app.get("/JYP", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/JYP.html'));
});

app.get("/YG", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/YG.html'));
});

app.get("/SM", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/SM.html'));
});

app.post("/performsearch", function (req, res) {
    console.log(req.body.search);
    db.all("SELECT * FROM song_source WHERE Artist LIKE ? OR Albums LIKE ? OR Song_name LIKE ?", [`%${req.body.search}%`,`%${req.body.search}%`,`%${req.body.search}%`], function(err, rows) {
        if (err) {
            console.log(err); 
        }
        let results=[];
        for(let i = 0; i < rows.length; i++) {
            results.push([rows[i].Artist, rows[i].Albums, rows[i].Song_name, rows[i].youtube_link,rows[i].image_loc]);
        }
        console.log(results);
        res.json(results);
    });
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Running at Port 3000');
});

