import axios from 'axios'

//action types
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const REMOVE_ONE_FROM_CART = 'REMOVE_ONE_FROM_CART'

export const addToCart = id => ({
  type: ADD_TO_CART,
  id
})

export const removeOnePickleFromCart = id => ({
  type: REMOVE_ONE_FROM_CART,
  id
})

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  id
})

const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!(action.id in cart)) {
        cart[action.id] = 1
        // REVIEW: this copy needs to happen before the mutation, not after
        return {...cart}
      } else {
        cart[action.id]++
        return {...cart}
      }
    case REMOVE_ONE_FROM_CART:
      cart[action.id]--
      if (cart[action.id] === 0) {
        delete cart[action.id]
        return {...cart}
      }
      return {...cart}
    case REMOVE_FROM_CART:
      delete cart[action.id]
      return {...cart}
    default:
      return cart
  }
}

export default cartReducer
