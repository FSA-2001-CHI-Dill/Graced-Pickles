import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {confirmOrder} from '../store/singleOrder'
const moment = require('moment')

class Confirmation extends Component {
  componentDidMount() {
    this.props.confirmOrder()
  }

  render() {
    const {order, loading, error} = this.props

    if (loading) return 'loading'
    if (error) return 'Something went wrong'
    else
      return (
        <div>
          Thank you for shopping with us!
          <p>Order placed on: {moment(order.orderDate).format('MM-DD-YYYY')}</p>
        </div>
      )
  }
}
const mapState = state => ({
  isLoggedin: !!state.user.id,
  order: state.singleOrder.order,
  loading: state.singleOrder.loading,
  error: state.singleOrder.error
})

const mapDispatch = dispatch => ({
  confirmOrder: () => dispatch(confirmOrder())
})

export default connect(mapState, mapDispatch)(Confirmation)
