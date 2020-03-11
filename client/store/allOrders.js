import axios from 'axios'

const ORDERS_LOAD_START = 'ORDERS_LOAD_START'
const SET_ORDERS = 'SET_ORDERS'
const ORDERS_LOAD_ERROR = 'ORDERS_LOAD_ERROR'

const ordersLoadStart = () => ({
  type: ORDERS_LOAD_START
})

const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

const ordersLoadingError = err => ({
  type: ORDERS_LOAD_ERROR,
  err
})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      dispatch(ordersLoadStart())
      const {data} = await axios.get('/api/orders')
      dispatch(setOrders(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(ordersLoadingError(err))
    }
  }
}

export const fetchUserOrders = () => {
  return async dispatch => {
    try {
      dispatch(ordersLoadStart())
      const {data} = await axios.get('/api/orders/me')
      dispatch(setOrders(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(ordersLoadingError(err))
    }
  }
}

const allOrdersReducer = (
  allOrders = {orders: [], loading: false, error: null},
  action
) => {
  switch (action.type) {
    case ORDERS_LOAD_START:
      return {...allOrders, loading: true}
    case SET_ORDERS:
      return {...allOrders, orders: action.orders, loading: false}
    case ORDERS_LOAD_ERROR:
      return {...allOrders, error: action.err, loading: false}
    default:
      return allOrders
  }
}

export default allOrdersReducer
