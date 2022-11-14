const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const inventoryDB = new sqlite3.Database('./databases/inventory.sqlite');

router.get('/', (req, res) => {
    res.render('store');
});

router.get('/products', async (req, res) => {
    const products = await getProducts().catch(e => { 
        console.log(e); 
        res.status(500).send(); 
    });
    res.json(products);
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

module.exports = router;