import { createStore, combineReducers, applyMiddleware } from 'redux'

// middleware
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)







//create reducer
import user from './User/redux'
import allPickles from './Pickles/All/redux'
import singlePickle from './Pickles/Single/redux'
import cart from './Cart/redux'
const reducer = combineReducers({ user, allPickles, singlePickle, cart })




const store = createStore(reducer, middleware)

export default store
export * from './User/redux'

//****PLEASE ADD YOUR redux state IN A COMMENT BELOW:
//user = {}
//allPickles = []
//singlePickle = {}
//cart = {}
