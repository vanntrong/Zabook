import createSagaMiddleware from '@redux-saga/core';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSaga from './sagas';
import userReducer from './slice/userSlice';
import themeReducer from './slice/themeSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['socket/setSocket'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['socket.socket'],
        // Ignore these paths in the state
        ignoredPaths: ['socket.socket'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
