import axios from 'axios'

const SELECT_PICKLE = 'SELECT_PICKLE'
// REVIEW: talk me thorugh RESET_PICKELS
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
      dispatch(pickleLoadStart())
      const {data} = await axios.get(`/api/pickles/${pickleId}`)
      dispatch(selectPickle(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(pickleLoadingError(err))
      //dispatch(selectPickle(err.response))
      // REVIEW: let's talk error handling
      //this is for displaying "pickle does not exist" on the user interface
    }
  }
}

const singlePickleReducer = (singlePickle = { fields: {}, loading: false, error: null}, action) => {
  switch (action.type) {
    case PICKLE_LOAD_START:
        return {...singlePickle, loading: true }
    case PICKLE_LOAD_ERROR:
      return { ...singlePickle, error: action.error, loading: false}
    case SELECT_PICKLE:
      return { ...singlePickle, fields: action.pickle, loading: false}
    case RESET_PICKLES:
      return action.pickle
    default:
      return singlePickle
  }
}

export default singlePickleReducer
