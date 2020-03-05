import axios from 'axios'

const SELECT_PICKLE = 'SELECT_PICKLE'
const RESET_PICKLES = 'RESET_PICKLES'

const selectPickle = pickle => ({
  type: SELECT_PICKLE,
  pickle
})

export const resetPickles = () => ({
  type: RESET_PICKLES,
  pickle: {}
})

export const fetchSinglePickle = pickleId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/pickles/${pickleId}`)
      dispatch(selectPickle(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(selectPickle(err.response))
      //this is for displaying "pickle does not exist" on the user interface
    }
  }
}

const singlePickleReducer = (singlePickle = {}, action) => {
  switch (action.type) {
    case SELECT_PICKLE:
      return action.pickle
    case RESET_PICKLES:
      return action.pickle
    default:
      return singlePickle
  }
}

export default singlePickleReducer
