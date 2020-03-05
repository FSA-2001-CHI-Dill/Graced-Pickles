import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPickles} from '../store/allPickles'
import {addToCart, removeOnePickleFromCart, removeFromCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.loadPickles()
  }

  addOnePickle = id => {
    this.props.addOnePickleToCart(id)
  }

  removeOnePickle = id => {
    this.props.removeOnePickleFromCart(id)
  }

  deleteFromCart = id => {
    this.props.removePickleFromCart(id)
  }

  render() {
    const {pickles, cart} = this.props
    const filteredCart = pickles.filter(pickle => pickle.id in cart)
    // if (!cart.length)
    //   return (
    //     <div>
    //       <h1>Your Shopping Cart is Empty!</h1>
    //       <h2>
    //         <Link to="/pickles">Check out the Pickle Store!</Link>
    //       </h2>
    //     </div>
    //   )
    return (
      <div>
        <h1>Your Orders</h1>
        <div>
          {filteredCart.map(pickle => (
            <div key={pickle.id}>
              <Link to={`/pickles/${pickle.id}`}> {pickle.title} </Link>
              <p>
                <img src={pickle.imageUrl} />
              </p>
              <p>${pickle.price}</p>

              <p>Quantity: {cart[pickle.id]}</p>
              <button
                type="button"
                onClick={() => this.addOnePickle(pickle.id)}
              >
                + Add One
              </button>
              <button
                type="button"
                onClick={() => this.removeOnePickle(pickle.id)}
              >
                - Remove One
              </button>
              <button
                type="button"
                onClick={() => this.deleteFromCart(pickle.id)}
              >
                Remove Pickle From Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  pickles: state.allPickles
})

const mapDispatch = dispatch => ({
  loadPickles: () => dispatch(fetchPickles()),
  addOnePickleToCart: id => {
    dispatch(addToCart(id))
  },
  removeOnePickleFromCart: id => {
    dispatch(removeOnePickleFromCart(id))
  },
  removePickleFromCart: id => {
    dispatch(removeFromCart(id))
  }
})

export default connect(mapState, mapDispatch)(Cart)
