import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUserOrders} from '../store/allOrders'
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
          <div>Order #{index + 1}</div>
          <div>Status: {order.status}</div>
          <div>Order Date: {moment(order.orderDate).format('MM-DD-YYYY')}</div>
          <div>
            Item(s):
            {order.orderItems.map(item => (
              <div key={item.id}>
                <p>{item.pickle.title} </p>
                <p>Price per item: ${(item.pickle.price / 100).toFixed(2)} </p>
                <p>Quantity: {item.qty} </p>
              </div>
            ))}
            {order.status === 'completed' ? (
              <p>
                {' '}
                Total Amount: $
                {order.orderItems
                  .reduce((acc, item) => {
                    return acc + item.qty * item.price / 100
                  }, 0)
                  .toFixed(2)}
              </p>
            ) : (
              <p> Amount Charged: $0.00</p>
            )}
          </div>
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
