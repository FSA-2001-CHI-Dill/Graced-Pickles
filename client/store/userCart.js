import axios from 'axios'

//action types
const VIEW_CART = 'VIEW_CART'

const viewCart = cart => ({type: VIEW_CART, cart})

export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${userId}`)
    dispatch(viewCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const addsToCart = (userId, itemInfo) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/add/${userId}`, itemInfo)
    dispatch(viewCart(data))
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
