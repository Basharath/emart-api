# eMart API

The eMart API consists of five main end points/paths:

| Base URL: /api

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
