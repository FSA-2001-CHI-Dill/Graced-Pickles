import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const USER_LOAD_START = 'USER_LOAD_START'
const USER_LOAD_ERROR = 'USER_LOAD_ERROR'

/**
 * ACTION CREATORS
 */
const getAllUsers = users => ({type: GET_ALL_USERS, users})

const userLoadStart = () => ({
  type: USER_LOAD_START
})

const userLoadingError = err => ({
  type: USER_LOAD_ERROR,
  err
})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      dispatch(userLoadStart())
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(userLoadingError(err))
    }
  }
}

export const promoteToAdmin = user => {
  return async dispatch => {
    try {
      dispatch(userLoadStart())
      const {data} = await axios.put(`/api/users/${user.id}`)
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(userLoadingError(err))
    }
  }
}

export const removeUser = user => {
  return async dispatch => {
    try {
      dispatch(userLoadStart())
      const {data} = await axios.delete(`/api/users/${user.id}`)
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(userLoadingError(err))
    }
  }
}

/**
 * REDUCER
 */
const allUsersReducer = (
  allUsers = {users: [], loading: false, error: null},
  action
) => {
  switch (action.type) {
    case USER_LOAD_START:
      return {...allUsers, loading: true}
    case GET_ALL_USERS:
      return {...allUsers, users: action.users, loading: false}
    case USER_LOAD_ERROR:
      return {...allUsers, error: action.err, loading: false}
    default:
      return allUsers
  }
}

export default allUsersReducer
