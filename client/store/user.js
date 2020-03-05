import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`${userId}/cart`)
    dispatch(getUser(data))
  } catch (err) {
    console.log(err)
  }
} //component: use this.props.user.orders.orderItems to display (via map) all items in the cart associated with the user

export const userAddsToCart = (userId, itemInfo) => async dispatch => {
  try {
    const {data} = await axios.put(`/${userId}/cart/add`, itemInfo)
    dispatch(getUser(data))
  } catch (err) {
    console.log(err)
  }
} //component: 1) mapDispatch, 2) the second argument this thunk takes (itemInfo) should be an object with pickleId, price, and quantity as keys.

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
