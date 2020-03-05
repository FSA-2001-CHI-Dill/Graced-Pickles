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

export const userAddToCart = pickle => async dispatch => {
  try {
    await axios.put('/api/cart/add', pickle)
    // dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

const userCartReducer = (userCart = [], action) => {
  switch (action.type) {
    case VIEW_CART:
      return action.cart
    default:
      return userCart
  }
}

export default userCartReducer
