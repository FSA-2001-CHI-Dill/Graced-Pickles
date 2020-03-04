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
      return [...cart, action.pickle]

    default:
      return cart
  }
}

export default cartReducer
