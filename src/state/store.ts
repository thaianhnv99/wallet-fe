import { ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import infoReducer from './info/reducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
    infoReducer,
  });
  
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['infoReducer'], // only navigation will be persisted
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = createStore(persistedReducer);
  export const persistor = persistStore(store);
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;