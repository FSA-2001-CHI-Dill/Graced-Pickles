import axios from 'axios'

//action types
// const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = ' REMOVE_FROM_CART'

//action creators
// const setCartItems = cart => ({
//   type: SET_CART,
//   cart
// })

export const addToCart = pickle => ({
  type: ADD_TO_CART,
  pickle
})

// cart = {
//   product_id: qty
// 1: 0
// 3: 9
//}
// obj[key] = number(obj[key]) + 1
const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    // case SET_CART:
    //   return action.cart
    // try approaching as an object with two keys, id & quantity

    // case ADD_TO_CART:
    //   return [...cart, action.pickle]
    case ADD_TO_CART:
      if (!(action.pickle in cart)) {
        cart[action.pickle] = 1
        return {...cart}
      } else {
        cart[action.pickle]++
        return {...cart}
      }
    default:
      return cart
  }
}

export default cartReducer
