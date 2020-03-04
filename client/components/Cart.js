import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  // WRITE FUNCTIONS TO HANDLE USER INTERACTION WITH CART
  //remove item completely
  //add to quantity of item
  //subtract from the quantity of item

  render() {
    const pickles = this.props.cart
    if (!pickles.length)
      return (
        <div>
          <h1>Your Shopping Cart is Empty!</h1>
          <h2>Want to Buy Some Pickles?</h2>
        </div>
      )
    return (
      <div>
        <h1>Your Orders</h1>
        <div>
          {pickles.map(pickle => (
            <div key={pickle.id}>
              <Link to={`/pickles/${pickle.id}`}> {pickle.title} </Link>$
              {pickle.price}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

export default connect(mapState)(Cart)
