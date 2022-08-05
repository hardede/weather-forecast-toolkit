import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import cityReducer from "./reducer/citySlice";

import currentReducer from "./reducer/currentSlice";
import forecastReducer from "./reducer/forecastSlice";

export const rootReducer = combineReducers({
  forecastReducer,
  currentReducer,
  cityReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(setupStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof setupStore.dispatch;
