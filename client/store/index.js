import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allPickles from './allPickles'
import singlePickle from './singlePickle'
import cart from './cart'

const reducer = combineReducers({user, allPickles, singlePickle, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

//****PLEASE ADD YOUR redux state IN A COMMENT BELOW:
//user = {}
//allPickles = []
//singlePickle = {}
//cart = []
