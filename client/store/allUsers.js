import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      console.lob(data)
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log('Something went wrong!', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(users = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return users
  }
}
