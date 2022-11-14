const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const PORT = process.env.PORT || 8080;
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
        secret: 'someSecret',
        cookie: { maxAge: 30000000, secure: false },
        saveUninitialized: false,
        resave: false,
        store
    })
);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Routers
const Register = require('./Routers/registerRouter');
const Login = require('./Routers/loginRouter');
const Inventory = require('./Routers/inventoryRouter');
const Store = require('./Routers/storeRouter');
app.use('/register', Register);
app.use('/login', Login);
app.use('/inventory', Inventory);
app.use('/store', Store);

/* Middleware */

// Currently unused
function verifyAuthentication(req, res, next) {
    if (req.session.authenticated) {
        return next();
    }
    else {
        res.status(403).json({ msg: "User is not authenticated, and cannot view this page." });
    }
}

/* Express */

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});