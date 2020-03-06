import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, removeOne, addToCart, removeAll} from '../store/cart'

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
            <p>Quantity: {item.quantity}</p>

            <button
              type="button"
              onClick={() => this.props.removeOne(item.pickle)}
            >
              - Remove One
            </button>

            <button
              type="button"
              onClick={() => this.props.addToCart(item.pickle)}
            >
              + Add One
            </button>

            <button
              type="button"
              onClick={() => this.props.removeAll(item.pickle)}
            >
              Remove Pickle From Cart
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadCart: () => dispatch(fetchCart()),
  removeOne: item => dispatch(removeOne(item)),
  addToCart: item => dispatch(addToCart(item)),
  removeAll: item => dispatch(removeAll(item))
})

export default connect(mapState, mapDispatch)(Cart)
