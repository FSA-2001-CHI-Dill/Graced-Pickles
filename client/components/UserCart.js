import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, userRemoveOneFromCart} from '../store/userCart'

class UserCart extends React.Component {
  componentDidMount() {
    this.props.loadUserCart()
  }

  render() {
    const cart = this.props.cart

    if (cart.length === 0) {
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
              onClick={() => this.props.removeOnefromCart(item.pickle)}
            >
              - Remove One
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.userCart
})

const mapDispatch = dispatch => ({
  loadUserCart: () => dispatch(fetchCart()),
  removeOnefromCart: item => dispatch(userRemoveOneFromCart(item))
})

export default connect(mapState, mapDispatch)(UserCart)
