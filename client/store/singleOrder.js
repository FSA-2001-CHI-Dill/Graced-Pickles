import axios from 'axios'

const ORDER_LOAD_START = 'ORDER_LOAD_START'
const SELECT_ORDER = 'SELECT_ORDER'
const ORDER_LOAD_ERROR = 'ORDER_LOAD_ERROR'

const orderLoadStart = () => ({
  type: ORDER_LOAD_START
})

const selectOrder = order => ({
  type: SELECT_ORDER,
  order
})

const orderLoadingError = err => ({
  type: ORDER_LOAD_ERROR,
  err
})

export const fetchSingleOrder = orderId => {
  return async dispatch => {
    try {
      dispatch(orderLoadStart())
      const {data} = await axios.get(`/api/orders/${orderId}`)
      dispatch(selectOrder(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(orderLoadingError(err))
    }
  }
}

export const confirmOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${orderId}/success`)
      dispatch(selectOrder(data))
    } catch (err) {
      console.log('Something went wrong!', err)
    }
  }
}

const singleOrderReducer = (
  singleOrder = {order: {}, loading: false, error: null},
  action
) => {
  switch (action.type) {
    case ORDER_LOAD_START:
      return {...singleOrder, loading: true}
    case SELECT_ORDER:
      return {...singleOrder, order: action.order, loading: false}
    case ORDER_LOAD_ERROR:
      return {...singleOrder, error: action.err, loading: false}
    default:
      return singleOrder
  }
}

export default singleOrderReducer
