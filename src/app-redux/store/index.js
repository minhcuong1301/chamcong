import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from "app-redux/reducers";

const composeEnhancers =
  'development' === process.env.NODE_ENV
    ? window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

export default store;