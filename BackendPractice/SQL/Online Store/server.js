const express = require('express');
const app = express();
const session = require('express-session');
const store = new session.MemoryStore();
const PORT = process.env.PORT || 8080;
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const userDB = new sqlite3.Database('./databases/users.sqlite');
const inventoryDB = new sqlite3.Database('./databases/inventory.sqlite');

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

/* Middleware */

function verifyAuthentication(req, res, next) {
    if (req.session.authenticated) {
        return next();
    }
    else {
        res.status(403).json({ msg: "User is not authenticated, and cannot view this page." });
    }
}

/* Express */

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

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
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

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Log in attempted: ${username}: ${password}`);          // for testing
    res.redirect('store');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/store', (req, res) => {
    res.render('store');
});

app.get('/store/products', async (req, res) => {
    const products = await getProducts().catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    res.json(products);
});

// Note: A router should be made for everything below

app.get('/inventory', (req, res) => {
    res.render('inventory');
});

app.post('/inventory/create', async (req, res) => {
    const { product, quantity, price } = req.body;
    await createProduct(product, quantity, price).catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    console.log(`New product ${product} added`);
    res.redirect('/inventory');
});

app.post('/inventory/update', async (req, res) => {
    const { product, quantity, price } = req.body;
    await updateProduct(product, quantity, price).catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    console.log(`${product} updated`);
    res.redirect('/inventory');
});

app.post('/inventory/delete', async (req, res) => {
    const { product } = req.body;
    await deleteProduct(product).catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    console.log(`${product} deleted`);
    res.redirect('/inventory');
});

/* SQLite */

function getProducts() {
    return new Promise((resolve, reject) => {
        inventoryDB.all("SELECT * FROM Inventory", (error, rows) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function createProduct(product, quantity, price) {
    return new Promise((resolve, reject) => {
        inventoryDB.run("INSERT INTO Inventory (product, quantity, price) VALUES ($product, $quantity, $price)", {
            $product: product,
            $quantity: quantity,
            $price: price
        }, (error) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve();
        });
    });
}

function updateProduct(product, quantity, price) {
    return new Promise((resolve, reject) => {
        inventoryDB.run("UPDATE Inventory SET quantity = $quantity, price = $price WHERE product = $product", {
            $product: product,
            $quantity: quantity,
            $price: price
        }, (error) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve();
        });
    });
}

function deleteProduct(product, quantity, price) {
    return new Promise((resolve, reject) => {
        inventoryDB.run("DELETE FROM Inventory WHERE product = $product", {
            $product: product
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
    console.log(`Server listening on port ${PORT}`);
});