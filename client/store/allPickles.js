import axios from 'axios'

const PICKLES_LOAD_START = 'PICKLES_LOAD_START'
const SET_PICKLES = 'SET_PICKLES'
const PICKLES_LOAD_ERROR = 'PICKLES_LOAD_ERROR'
const ADD_PICKLE = 'ADD_PICKLE'

const picklesLoadStart = () => ({
  type: PICKLES_LOAD_START
})

const setPickles = pickles => ({
  type: SET_PICKLES,
  pickles
})

const addPickle = pickle => ({
  type: ADD_PICKLE,
  pickle
})

const picklesLoadingError = err => ({
  type: PICKLES_LOAD_ERROR,
  err
})

export const fetchPickles = () => {
  return async dispatch => {
    try {
      dispatch(picklesLoadStart())
      const {data} = await axios.get('/api/pickles')
      dispatch(setPickles(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(picklesLoadingError(err))
    }
  }
}

export const addNewPickle = pickle => {
  return async dispatch => {
    try {
      dispatch(picklesLoadStart())
      const {data} = await axios.post('/api/pickles', pickle)
      dispatch(addPickle(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(picklesLoadingError(err))
    }
  }
}

export const deleteSinglePickle = pickle => {
  return async dispatch => {
    try {
      dispatch(picklesLoadStart())
      const {data} = await axios.delete(`/api/pickles/${pickle.id}`)
      dispatch(setPickles(data))
    } catch (err) {
      console.log('Something went wrong!', err)
      dispatch(picklesLoadingError(err))
    }
  }
}

const allPicklesReducer = (
  allPickles = {pickles: [], loading: false, error: null},
  action
) => {
  switch (action.type) {
    case PICKLES_LOAD_START:
      return {...allPickles, loading: true}
    case SET_PICKLES:
      return {...allPickles, pickles: action.pickles, loading: false}
    case PICKLES_LOAD_ERROR:
      return {...allPickles, error: action.err, loading: false}
    case ADD_PICKLE:
      return {...allPickles, pickles: [...allPickles.pickles, action.pickle]}
    default:
      return allPickles
  }
}

export default allPicklesReducer
