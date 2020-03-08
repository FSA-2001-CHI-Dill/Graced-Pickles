import axios from 'axios'

//action types
const VIEW_CART = 'VIEW_CART'

const viewCart = cart => ({type: VIEW_CART, cart})

export const fetchCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    console.log('data from server', data)
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateCart = (pickle, qty) => async dispatch => {
  try {
    console.log('pickle', pickle, 'qty', qty)
    const {data} = await axios.put('/api/cart/update', {pickle, qty})
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeAll = pickle => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart/removeAll', pickle)
    console.log(pickle)
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case VIEW_CART:
      return action.cart
    default:
      return cart
  }
}

export default cartReducer
