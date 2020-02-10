import { combineReducers } from 'redux';
import search from './redux/modules/search'
import auth from './redux/modules/auth'

const rootReducer = combineReducers({
    search,auth
})
export default rootReducer