# Datbase

## Pickles

title: STRING (required, not empty)
description: TEXT (required, not empty)
price: FLOAT (required, validation: min 0)
inventory quantity: INTEGAR (required, not empty)
spice level: ENUM (required, validation: mild, spicy, hot)

<!-- vegetables: ENUM (required, validation: ) -->

vegetarian: BOOLEAN (default: true)

## Users

email: STRING (required, email validation)
password
nickname (optional)
first name
last name

## Orders

RK: user_id
product_array (of objects with keys: 1) RK: productId, 2) price, 3) quantity)
status (created, processing, cancelled, completed)
order_placed_date
(total price)

## Carts

RK: user_id
RK: product_id
quantity

## Reviews

RK: user_id
RK: product_id
content (required, not empty)
(nickname)
(created_at_date)

## Associations

1.  Cart belongs to Product
2.  Product has many Carts
3.  Cart belongs to User
4.  User has many Carts
5.  Order belongs to User
6.  User has many Orders
7.  Review belongs to User
8.  User has many Reviews
9.  Review belongs to Product
10. Product has many Reviews
