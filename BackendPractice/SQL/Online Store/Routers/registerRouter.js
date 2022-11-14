const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const userDB = new sqlite3.Database('./databases/users.sqlite');
const { queryUser, registerUser } = require('./helpers');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await queryUser(username);
        if (user) { return res.status(403).json({ msg: `User ${username} already exists! ` }) }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await registerUser(username, email, hashedPass);

        console.log(`New user created: ${username}`);

        res.redirect('login');
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;