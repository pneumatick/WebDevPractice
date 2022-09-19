const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./Databases/users.sqlite');

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
        const userExists = await queryUser(username);
        if (userExists) { return res.status(403).json({ msg: `User ${username} already exists!` }) }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await registerUser(username, hashedPass);

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
        const user = await queryUser(username);
        if (!user) { return res.status(403).json({ msg: `User ${username} not found` }) }

        const matchedPass = await bcrypt.compare(password, user.password);
        if (matchedPass) {
            req.session.authenticated = true;
            req.session.user = { username: username, password: password };
            console.log(req.session); // just for testing, obviously insecure
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

// Query the database for a given username, return its row
function queryUser(username) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Users WHERE username=$username', {
            $username: username
        }, (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(row);
        });
    });
}

// Add a new user to the database if the userame is not already taken
function registerUser(username, password) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO Users (username, password) VALUES ($username, $password)", {
            $username: username,
            $password: password,
        }, (error) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve();
        });
    });
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})