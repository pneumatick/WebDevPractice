const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const morgan = require('morgan');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 8080;
const users = {};

app.use(morgan('dev'));
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
app.set('view engine', 'ejs');

// Authentication middleware
function verifyAuthentication(req, res, next) {
    if (req.session.authenticated) {
        return next();
    }
    else {
        res.status(403).json({ msg: "User is not authorized to view this page" });
    }
}

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/landingpage', verifyAuthentication, (req, res) => {
    res.render('landingpage');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (users[username]) { return res.status(403).json({ msg: `User ${username} already exists!` }) }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        users[username] = { password: hashedPass };
        console.log(`New user ${username} created!`);

        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!users[username]) { return res.status(403).json({ msg: `User ${username} not found` }) }

        const matchedPass = await bcrypt.compare(password, users[username].password);
        if (matchedPass) {
            req.session.authenticated = true;
            req.session.user = { username: username, password: password };
            console.log(req.session);
            res.redirect('/landingpage');
        }
        else {
            res.status(403).json({ msg: "Bad Credentials" });
        }
    }
    catch (err) {
        res.status(500).json({ msg: err.msg });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})