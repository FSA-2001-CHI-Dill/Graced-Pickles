import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const moment = require('moment')
import {confirmOrder, fetchSingleOrder} from '../store/singleOrder'
import axios from 'axios'

class Confirmation extends Component {
  componentDidMount() {
    const orderId = this.props.cart[0].orderId
    if (this.props.success) {
      this.props.confirmOrder(orderId)
    } else {
      axios.put(`/api/orders/${orderId}/fail`)
    }
  }

  render() {
    const {order, loading, error, success} = this.props

    if (loading) return 'loading'
    if (error) return 'Something went wrong'
    if (success)
      return (
        <div>
          <h2>Thank you for shopping with us! </h2>
          <p>
            Your order has been placed on:{' '}
            {moment(order.orderDate).format('MM-DD-YYYY')}
          </p>
          <p> Please check your email for details</p>
          <Link to="/pickles">Go back to all pickles!</Link>
        </div>
      )
    if (!success)
      return <div>We could not complete your order. Please try again!</div>
  }
}
const mapState = state => ({
  isLoggedin: !!state.user.id,
  cart: state.cart.items,
  order: state.singleOrder.order,
  loading: state.singleOrder.loading,
  error: state.singleOrder.error
})

const mapDispatch = dispatch => ({
  loadOrder: orderId => dispatch(fetchSingleOrder(orderId)),
  confirmOrder: orderId => dispatch(confirmOrder(orderId))
})

export default connect(mapState, mapDispatch)(Confirmation)
