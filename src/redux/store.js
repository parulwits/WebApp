import {createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from './reducers';
import mySaga from './saga';
import createSagaMiddleware from 'redux-saga'
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
const AppReducers = combineReducers({
  userReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer'],
};
const persistedReducer = persistReducer(persistConfig, AppReducers);
const sagaMiddleware = createSagaMiddleware()
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga)
let persistor = persistStore(store);
export {store, persistor};