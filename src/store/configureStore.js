import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
});
// configureStore

// const store = createStore(
//   rootReducer, // 리듀서 연결
//   composeWithDevTools(applyMiddleware(...middlewares)),
// );
sagaMiddleware.run(rootSaga);

export default store;
