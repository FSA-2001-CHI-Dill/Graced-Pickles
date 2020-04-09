import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, updateCart, removeAll, checkout} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.checkoutClick = this.checkoutClick.bind(this)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  checkoutClick = () => {
    if (this.props.isLoggedin) {
      this.props.checkout()
    }
  }

  render() {
    const {cart} = this.props
    if (!cart || cart === undefined || cart.length === 0) {
      return (
        <div>
          <h1>Your Shopping Cart is Empty!</h1>
          <h2>
            <Link to="/pickles">Check out the Pickle Store!</Link>
          </h2>
        </div>
      )
    } else
      return (
        <div>
          {cart.map(item => (
            <div key={item.pickle.id}>
              <Link to={`/pickles/${item.pickle.id}`}>{item.pickle.title}</Link>
              <p>Quantity: {item.qty}</p>
              <p>Price per item: ${(item.pickle.price / 100).toFixed(2)} </p>
              <button
                type="button"
                onClick={() => this.props.updateCart(item.pickle, -1)}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => this.props.updateCart(item.pickle, 1)}
              >
                +
              </button>

              <button
                type="button"
                onClick={() => this.props.removeAll(item.pickle)}
              >
                x
              </button>
            </div>
          ))}
          <br />
          <h5>
            Total: $
            {cart
              .reduce((acc, item) => {
                return acc + item.qty * item.price / 100
              }, 0)
              .toFixed(2)}
          </h5>
          <br />
          <br />
          <p>
            <Link to="/checkout" onClick={this.checkoutClick}>
              Proceed to Checkout
            </Link>
          </p>
        </div>
      )
  }
}

const mapState = state => ({
  isLoggedin: !!state.user.id,
  cart: state.cart.items
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  updateCart: (item, qty) => dispatch(updateCart(item, qty)),
  removeAll: item => dispatch(removeAll(item)),
  checkout: () => dispatch(checkout())
})

export default connect(mapState, mapDispatch)(Cart)
