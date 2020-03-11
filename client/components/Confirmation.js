import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const moment = require('moment')
import axios from 'axios'

class Confirmation extends Component {
  async componentDidMount() {
    if (this.props.success) {
      await axios.put('/api/orders/success')
    } else {
      await axios.put('/api/orders/fail')
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
          <p> Please Check your email for details.</p>
          <Link to={`/orders/${order.id}`}>View order details</Link>
        </div>
      )
    if (!success)
      return <div>We could not complete your order. Please try again!</div>
  }
}
const mapState = state => ({
  isLoggedin: !!state.user.id,
  order: state.singleOrder.order,
  loading: state.singleOrder.loading,
  error: state.singleOrder.error
})

export default connect(mapState)(Confirmation)
