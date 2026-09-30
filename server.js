const express = require("express");

const app = express();

app.use(express.json());

const APP_ENV = process.env.APP_ENV || "DEV";
const DB_HOST = process.env.DB_HOST || "localhost";
const APP_PORT = process.env.APP_PORT || 8080;

let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Mobile",
        price: 25000,
        category: "Electronics"
    }
];

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        environment: APP_ENV
    });
});

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// Add product
app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length
            ? products[products.length - 1].id + 1
            : 1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// Update product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;

    res.json(product);
});

// Delete product
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted",
        product: deletedProduct[0]
    });
});

// Start application
app.listen(APP_PORT, () => {
    console.log(`Product API running on port ${APP_PORT}`);
    console.log(`Environment: ${APP_ENV}`);
    console.log(`Database Host: ${DB_HOST}`);
});