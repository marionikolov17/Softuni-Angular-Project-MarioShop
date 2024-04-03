<h1>Mario's Shop</h1>

This is an e-commerce web platform which includes shop for customers and administration panel for managing products and available orders. It is easy to use with simple and clean UI/UX.

Administrator account:<br />
email - mario@abv.bg<br />
password - 1234

<strong>NOTE: You can't use the shop functionalities with the administrator account and vice versa!</strong>

## Shop(user part) features

### All users can:

    - Access the home page and view all available products
    - Search, filter and sort to get to the product/s they want

### Guest users can:

    - Access the register and login page
    - Create new user account
    - Log in into exsisting account

### Logged-in users can:

    - Add different products to cart
    - Access the cart page
    - Manage the cart (add, remove, update, delete)
    - Order

## Admin panel features (admin user only)

    - Create new products
    - Edit existing products
    - Activate/Deactivate products
    - Delete products
    - Get orders from customers
    - Manage orders

## Tech stack

Front-end: Angular v16 + Bootstrap v5 <br/>
Back-end: Node.js + Express.js <br/>
Database: MongoDB

## Getting started

1. **Clone the repository** <br/>
2. **Install the required dependencies** <br/>
3. **Install 'MongoDBCompass' and create database 'marioshop'**
4. **Download the collections files from https://drive.google.com/drive/folders/1wXtOlxtW3XVoxCcUAteD_uWaCJVfozJh?usp=sharing**
5. **Create 'users', 'carts', 'orders' and 'products' collections and follow this guideline to import the data: https://www.mongodb.com/docs/compass/current/import-export/**
6. **Open terminal in 'server' folder and run 'npm start'**
7. **Open terminal in 'client' folder and run 'npm start'**
8. **Now you can access the application on http://localhost:4200/shop**