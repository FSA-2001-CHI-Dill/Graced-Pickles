import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/singleOrder'
import {Link} from 'react-router-dom'
const moment = require('moment')

class SingleOrder extends Component {
  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.loadOrder(orderId)
  }

  render() {
    const {order, loading, error} = this.props
    if (loading || !order.id) return <h2>Loading</h2>
    if (error) return <h2>Something went wrong</h2>
    else
      return (
        <div>
          <div>Status: {order.status}</div>
          <div>
            Order Date & Time:{' '}
            {moment(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <div>
            Item(s):
            {order.orderItems.map(item => (
              <div key={item.id}>
                <Link to={`/pickles/${item.pickle.id}`}>
                  {' '}
                  {item.pickle.title}{' '}
                </Link>
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
  loadOrder: orderId => dispatch(fetchSingleOrder(orderId))
})

export default connect(mapState, mapDispatch)(SingleOrder)
