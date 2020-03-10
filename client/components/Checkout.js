import React, {Component} from 'react'
import {connect} from 'react-redux'
import {confirmOrder} from '../store/singleOrder'
import {Link} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'
import StripeCheckout from 'react-stripe-checkout'

const Checkout = props => {
  const onToken = (token, addresses) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }
  const {isLoggedin, cart, loading, error} = props

  if (!isLoggedin) {
    return <div>Please log in/sign up to continue!</div>
  }
  if (cart.length === 0) {
    return <div>"Your cart is empty"</div>
  } else {
    return (
      <div>
        <h1>Checkout</h1>
        <CheckoutForm />

        {cart.map(item => (
          <div key={item.id}>
            <Link to={`/pickles/${item.pickle.id}`}>{item.pickle.title}</Link>
            <p>Quantity: {item.qty}</p>
            <p>Price per item: ${(item.pickle.price / 100).toFixed(2)} </p>
            <br />
            Total: $
            {cart
              .reduce((acc, item) => {
                return acc + item.qty * item.price / 100
              }, 0)
              .toFixed(2)}
          </div>
        ))}
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_ixYHMYf83vAdUAFX2jYPfg9u00Jk5sO3XV"
          billingAddress
          shippingAddress
          amount
        />
        <Link to="/confirmation">Confirmation</Link>
      </div>
    )
  }
}

const mapState = state => ({
  isLoggedin: !!state.user.id,
  cart: state.cart.items,
  loading: state.cart.loading,
  error: state.cart.error
})

const mapDispatch = dispatch => ({
  confirmOrder: () => dispatch(confirmOrder())
})

export default connect(mapState, mapDispatch)(Checkout)
