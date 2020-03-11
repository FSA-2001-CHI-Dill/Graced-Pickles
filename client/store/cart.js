import axios from 'axios'

//action types
const CART_LOAD_START = 'CART_LOAD_START'
const VIEW_CART = 'VIEW_CART'
const CART_LOAD_ERROR = 'CART_LOAD_ERROR'

const cartLoadStart = () => ({
  type: CART_LOAD_START
})

const viewCart = cart => ({type: VIEW_CART, cart})

const cartLoadingError = err => ({
  type: CART_LOAD_ERROR,
  err
})

export const fetchCart = () => async dispatch => {
  try {
    dispatch(cartLoadStart())
    const {data} = await axios.get('/api/cart')
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
    dispatch(cartLoadingError(err))
  }
}

export const updateCart = (pickle, qty) => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/update', {pickle, qty})
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeAll = pickle => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/removeAll', pickle)
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const checkout = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/checkout')
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

const cartReducer = (
  cart = {items: [], loading: false, error: null},
  action
) => {
  switch (action.type) {
    case CART_LOAD_START:
      return {...cart, loading: true}
    case VIEW_CART:
      return {...cart, items: action.cart}
    case CART_LOAD_ERROR:
      return {...cart, error: action.err, loading: false}
    default:
      return cart
  }
}

export default cartReducer
