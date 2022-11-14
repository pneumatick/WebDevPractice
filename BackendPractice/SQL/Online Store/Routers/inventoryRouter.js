const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const inventoryDB = new sqlite3.Database('./databases/inventory.sqlite');

const HIGH_PERMISSIONS = ['admin', 'employee'];

function validateHighPermission(req, res, next) {
    try {
        const authenticated = req.session.authenticated;
        const permissionGranted = HIGH_PERMISSIONS.includes(req.session.user.permission);
        if (authenticated && permissionGranted) {
            return next();
        }
        else {
            res.status(403).json({ msg: 'User either lacks permissions or authentication required to view this page.' });
        }
    }
    catch (err) {
        res.status(500).json({ msg: 'An error has occured, likely because the user hasn\'t logged in.' });
    }
}

router.get('/', validateHighPermission, (req, res) => {
    res.render('inventory');
});

router.post('/create', async (req, res) => {
    const { product, quantity, price } = req.body;
    await createProduct(product, quantity, price).catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    console.log(`New product ${product} added`);
    res.redirect('/inventory');
});

router.post('/update', async (req, res) => {
    const { product, quantity, price } = req.body;
    await updateProduct(product, quantity, price).catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    console.log(`${product} updated`);
    res.redirect('/inventory');
});

router.post('/delete', async (req, res) => {
    const { product } = req.body;
    await deleteProduct(product).catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    console.log(`${product} deleted`);
    res.redirect('/inventory');
});

/* SQLite functions */

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

module.exports = router;