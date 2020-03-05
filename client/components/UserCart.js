import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPickles} from '../store/allPickles'
import {fetchCart} from '../store/userCart'

class UserCart extends React.Component {
  componentDidMount() {
    this.props.loadUserCart(this.props.user.id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Your Orders</h1>
        <div>
          {this.props.orderItems.map(pickle => (
            <div key={pickle.id}>
              <Link to={`/pickles/${pickle.id}`}> {pickle.title} </Link>
              <p>
                <img src={pickle.imageUrl} />
              </p>
              <p>${pickle.price}</p>

              <p>Quantity: {pickle.quantity}</p>
              {/* <button
                type="button"
                onClick={() => this.addToCart(pickle.id)}
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
              </button> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  orderItems: state.user.orders.orderItems
})

const mapDispatch = dispatch => ({
  loadUserCart: userId => dispatch(fetchCart(userId)),
  loadPickles: () => dispatch(fetchPickles())
})

export default connect(mapState, mapDispatch)(UserCart)
