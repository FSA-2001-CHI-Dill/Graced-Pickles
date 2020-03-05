import axios from 'axios'

const SET_PICKLES = 'SET_PICKLES'

const setPickles = pickles => ({
  type: SET_PICKLES,
  pickles
})

export const fetchPickles = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/pickles')
      dispatch(setPickles(data))
    } catch (err) {
      // REVIEW: let's talk error handling
      console.log('Something went wrong!', err)
    }
  }
}

const allPicklesReducer = (allPickles = [], action) => {
  switch (action.type) {
    case SET_PICKLES:
      return action.pickles
    default:
      return allPickles
  }
}

export default allPicklesReducer
