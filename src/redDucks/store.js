import {createStore, combineReducers} from 'redux'
import reducer from './reducer'

const rootReducer = combineReducers({
    reduced: reducer
})

export default createStore(rootReducer)