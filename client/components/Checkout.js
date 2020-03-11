import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const Checkout = props => {
  const total = props.cart.reduce((acc, item) => {
    return acc + item.qty * item.price / 100
  }, 0)

  const onToken = async token => {
    try {
      const {status} = await axios.post('/api/orders/checkout', {token, total})
      if (status === 200) {
        props.history.push('/success')
      } else {
        props.history.push('/fail')
      }
    } catch (err) {
      console.log(err)
    }
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

        {cart.map(item => (
          <div key={item.id}>
            <Link to={`/pickles/${item.pickle.id}`}>{item.pickle.title}</Link>
            <p>Quantity: {item.qty}</p>
            <p>Price per item: ${(item.pickle.price / 100).toFixed(2)} </p>
            <br />
            Total: $
            {total.toFixed(2)}
          </div>
        ))}
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_ixYHMYf83vAdUAFX2jYPfg9u00Jk5sO3XV"
          billingAddress
          shippingAddress
          amount={total * 100}
        />
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

export default connect(mapState)(Checkout)
