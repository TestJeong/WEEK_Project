import {createStore, applyMiddleware} from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

import rootReducer from '../reducers';

import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, // 리듀서 연결
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
