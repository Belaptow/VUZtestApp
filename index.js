const path = require('path');
const express = require('express');
const fs = require('fs');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser')

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* console.log("before func");
setImmediate((args) => {
     console.log("inside func ${args}")
}, "completed");
console.log("after func"); */


/* fs.readFile("readme.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    fs.unlinkSync("readme.txt", (err) => {
        if (err) throw err;
    })
}) */



/* console.log(path.basename(__dirname));
console.log(path.basename(__filename, ".js"));
console.log(path.join(__dirname, 'public', '/news.html')) */

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')), (req, res, next) => {
    let now = new Date();
    let data = dateFormat(now, "yyyy.mm.dd HH:MM") + `${req.method} ${req.headers['user-agent']}`
    console.log(data);
    fs.appendFile("request.log", data + "\n", () => {});
    next();
});

app.get('/', (req, res) => {
    res.sendFile(`/index.html`);
});

app.get('/news', (req, res) => {
    res.sendFile(`${__dirname}/public/news.html`);
});

app.get('/products', (req, res) => {
    res.sendFile(`${__dirname}/public/products.html`);
});

app.get('/info', (req, res) => {
    res.sendFile(`${__dirname}/public/info.html`);
});

app.get('/feedback', (req, res) => {
    res.sendFile(`${__dirname}/public/feedback.html`);
});

app.post('/feedback', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    fs.appendFile("feedback.log", "пользователь " + req.body.name + " оставил следующее предложение/замечание '" + req.body.feedbackText + "'\n", () => {});
    //res.send(`уважаемый ${req.body.name}, ваш запрос был успешно отправлен` + "<br/><a href='/'>На главную</a>");
    res.render("feedback_tmp", {tmpName:req.body.name});
})

app.listen(3333, (err) => {
    if (err) {
        return console.log("Error", err)
    }
    console.log('Application listening on port 3333!');
});



/* let writeStream = fs.createWriteStream('bigFile.json');
for (let i = 0; i <= 1000000; i++) {
    writeStream.write(`${i}:{
                                "Lorem":1234,
                                "Ipsum":4321,
                                "Solemn":0987,
                                "Rathum":12.34,
                                "Grotto":[12, 34, 56, 78, 90],
                                "Tulpa":321.123
                            }\n`);
}
writeStream.on("close", () => {
    console.log("stream closed");
})
writeStream.on("finish", () => {
    console.log("stream finished");
})
writeStream.end(() => {
    console.log("stream ended");
}) */