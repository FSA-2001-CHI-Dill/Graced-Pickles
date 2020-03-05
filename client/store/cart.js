import axios from 'axios'

//action types
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = ' REMOVE_FROM_CART'

//action creators
// const setCartItems = cart => ({
//   type: SET_CART,
//   cart
// })

export const addToCart = id => ({
  type: ADD_TO_CART,
  id
})

const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!(action.id in cart)) {
        cart[action.id] = 1
        return {...cart}
      } else {
        cart[action.id]++
        return {...cart}
      }
    default:
      return cart
  }
}

export default cartReducer
