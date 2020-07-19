import { createStore } from 'redux';
import reducer from '../src/reducers'
import middleware from '../src/middleware'

const store = createStore(reducer, middleware);

export default store;