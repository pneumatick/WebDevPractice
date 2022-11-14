const sqlite3 = require('sqlite3');
const userDB = new sqlite3.Database('./databases/users.sqlite');

function queryUser(username) {
    return new Promise((resolve, reject) => {
        userDB.get('SELECT * FROM Users WHERE username=$username', {
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

function registerUser(username, email, password) {
    return new Promise((resolve, reject) => {
        userDB.run('INSERT INTO Users (username, email, password, permission) VALUES ($username, $email, $password, $permission)', {
            $username: username,
            $email: email,
            $password: password,
            $permission: 'user'
        }, (error) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve();
        });
    });
}

module.exports = {
    queryUser: queryUser,
    registerUser: registerUser
};