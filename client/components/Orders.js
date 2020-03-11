import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserOrders} from '../store/allOrders'
import {Link} from 'react-router-dom'
const moment = require('moment')

class Orders extends Component {
  componentDidMount() {
    this.props.loadOrders()
  }

  render() {
    const {orders, loading, error} = this.props

    if (loading) return <h2> Loading </h2>
    if (error) return <h2> Something went wrong! </h2>
    if (orders.length === 0) {
      return <div>You have no orders.</div>
    } else {
      return orders.map((order, index) => (
        <div key={order.id}>
          <Link to={`/orders/${order.id}`}>
            <h3> Order #{index + 1}</h3>
          </Link>
          <div>Status: {order.status}</div>
          <div>Order Date: {moment(order.orderDate).format('YYYY-MM-DD')}</div>
        </div>
      ))
    }
  }
}

const mapState = state => ({
  orders: state.allOrders.orders,
  loading: state.allOrders.loading,
  error: state.allOrders.error
})

const mapDispatch = dispatch => ({
  loadOrders: () => dispatch(fetchUserOrders())
})

export default connect(mapState, mapDispatch)(Orders)
