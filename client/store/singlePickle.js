import axios from 'axios'

const PICKLE_LOAD_START = 'PICKLE_LOAD_START'
const SELECT_PICKLE = 'SELECT_PICKLE'
const PICKLE_LOAD_ERROR = 'PICKLE_LOAD_ERROR'
const UPDATE_PICKLE = 'UPDATE_PICKLE'

const pickleLoadStart = () => ({
  type: PICKLE_LOAD_START
})

const selectPickle = pickle => ({
  type: SELECT_PICKLE,
  pickle
})

const pickleLoadingError = err => ({
  type: PICKLE_LOAD_ERROR,
  err
})

const updatePickle = pickle => ({
  type: UPDATE_PICKLE,
  pickle
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
    }
  }
}

export const updateSinglePickle = (pickleId, updates) => {
  return async dispatch => {
    try {
      dispatch(pickleLoadStart())
      const {data} = await axios.put(`/api/pickles/${pickleId}`, updates)
      dispatch(updatePickle(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(pickleLoadingError(err))
    }
  }
}

const singlePickleReducer = (
  singlePickle = {pickle: {}, loading: false, error: null},
  action
) => {
  switch (action.type) {
    case PICKLE_LOAD_START:
      return {...singlePickle, loading: true}
    case SELECT_PICKLE:
      return {...singlePickle, pickle: action.pickle, loading: false}
    case PICKLE_LOAD_ERROR:
      return {...singlePickle, error: action.err, loading: false}
    case UPDATE_PICKLE:
      return {
        ...singlePickle,
        pickle: {...singlePickle.pickle, ...action.pickle},
        loading: false
      }
    default:
      return singlePickle
  }
}

export default singlePickleReducer
