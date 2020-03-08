import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, updateCart, removeAll} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const cart = this.props.cart

    if (cart.length === 0 || cart.length === undefined) {
      return (
        <div>
          <h1>Your Shopping Cart is Empty!</h1>
          <h2>
            <Link to="/pickles">Check out the Pickle Store!</Link>
          </h2>
        </div>
      )
    }
    return (
      <div>
        {cart.map(item => (
          <div key={item.pickle.id}>
            <Link to={`/pickles/${item.pickle.id}`}> {item.pickle.title} </Link>
            <p>Quantity: {item.qty}</p>
            <p>Price: ${(item.pickle.price / 100).toFixed(2)} </p>
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
        Total: ${cart
          .reduce((acc, item) => {
            return acc + item.qty * item.price / 100
          }, 0)
          .toFixed(2)}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  updateCart: (item, qty) => dispatch(updateCart(item, qty)),
  removeAll: item => dispatch(removeAll(item))
})

export default connect(mapState, mapDispatch)(Cart)
