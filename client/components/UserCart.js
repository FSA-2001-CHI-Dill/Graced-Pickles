import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPickles} from '../store/allPickles'
import {fetchCart} from '../store/userCart'

class UserCart extends React.Component {
  componentDidMount() {
    this.props.loadUserCart()
  }

  render() {
    console.log('hello')
    const cart = this.props.cart

    return (
      <div>
        {cart.map(item => (
          <div key={item.pickle.id}>
            <Link to={`/pickles/${item.pickle.id}`}> {item.pickle.title} </Link>
            <p>Quantity: {item.quantity}</p>
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
  loadUserCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(UserCart)
