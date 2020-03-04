# RESTful Endpoints

## Products

### Customers

- view all products
  GET /products
- view single product (description, photos, reviews)
  GET /product/:id

## Orders

### Cart

- add items to cart (can you use a put request for multiple items)
- update items in cart (change quantity of product, remove items)
  PUT /orders/:id
  GET /orders
  GET /orders/:id

## Order Items

POST /order_items | { productId, quantity }
DELETE /order_items/:id

## React Routes

<Route path="/" component={ProductCatalogue}/>
<Route path="/product/:id" component={ProductDetail}/>
<Route path="/cart" component={OrderReview}/>
<Route path="/checkout" component={Checkout}/>
<Route path="/admin/products/new" component={CreateNewProduct}/>

## DEPLOYMENT

PUT /products/:id

POST /products

### Redux

- stored in store.products as []

### stored in store.singleProduct as {}
