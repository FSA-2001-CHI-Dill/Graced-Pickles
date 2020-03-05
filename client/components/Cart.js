import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPickles} from '../store/allPickles'

class Cart extends React.Component {
  componentDidMount() {
    this.props.loadPickles()
  }
  // WRITE FUNCTIONS TO HANDLE USER INTERACTION WITH CART
  //remove item completely
  //add to quantity of item
  //subtract from the quantity of item

  render() {
    const {pickles, cart} = this.props
    const filteredCart = pickles.filter(pickle => pickle.id in cart)
    console.log('cart', cart)

    console.log('filteredCart', filteredCart)
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
              <button type="button">Add One More To Cart</button>
              <button type="button">Remove To Cart</button>
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
  loadPickles: () => dispatch(fetchPickles())
})

export default connect(mapState, mapDispatch)(Cart)
