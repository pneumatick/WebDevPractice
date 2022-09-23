const productsDiv = document.getElementById('products');

fetch('http://localhost:8080/store/products')
    .then((response) => response.json())
    .then((products) => {
        products.forEach(product => {
            let productListing = document.createElement('p');
            productListing.innerHTML = `${product.product}: $${product.price} (${product.quantity} available)`;
            productsDiv.append(productListing);
        });
    });