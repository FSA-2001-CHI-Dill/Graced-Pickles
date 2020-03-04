import axios from 'axios'
import e from 'express'

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

// export const fetchCart = () => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get('ADD API ROUTE')
//       dispatch(setCartItems(data))
//     } catch (err){
//       console.log('fetch cart thunk err', err)
//     }
//   }
// }

const cartReducer = (cart = [], action) => {
  switch (action.type) {
    // case SET_CART:
    //   return action.cart
    case ADD_TO_CART:
      cart.find(item => {
        if (item.id === action.pickle.id) {
          item.quantity++
        } else {
          action.pickle.quantity = 1
          cart = [...cart, action.pickle]
        }
      })
      return cart
    default:
      return cart
  }
}

export default cartReducer
