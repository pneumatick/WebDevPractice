const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const users = {username: 'test', password: 'pass'};

app.use(morgan('dev'));
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'someSecret',
        cookie: { maxAge: 300000000, secure: false },
        saveUninitialized: false,
        resave: false,
        store
    })
);
//app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/landingpage', (req, res) => {
    res.render('landingpage');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users.username !== username) { return res.status(403).json({ msg: `User ${username} not found`}) };
    if (users.password === password) {
        req.session.authenticated = true;
        req.session.user = { username: username, password: password };
        console.log(req.session);
        res.redirect('/landingpage');
    }
    else {
        res.status(403).json({ msg: "Bad Credentials" });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})