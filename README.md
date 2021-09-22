# eMart API

The eMart API consists of five main end points/paths:

> Base URL: /api

- /users
- /products
- /categories
- /orders
- /cart

## /users

```
POST - /users/signin
POST - /users/signup
POST - /users/changepassword
```

## /products

```
GET  - /products
GET  - /products/:id
GET  - /products/search?q=<query>
POST - /products
PUT  - /products/:id
DELETE - /products/:id
PATCH - /products/:id
```

## /categories

```
GET  - /categories
POST - /categories
PUT  - /categories/:id
DELETE - /categories/:id
```

## /orders

```
GET  - /orders
GET  - /orders/:id
POST - /orders
DELETE - /orders:id
```

## /cart

```
GET  - /cart
POST - /cart
POST - /cart/checkout
DELETE - /cart
```

> The website made using this API is: https://emart2shop.netlify.app/
