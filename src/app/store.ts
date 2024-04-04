import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fitOf } from "./store/fitOf";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./features/auth/authSlice";
import packageSlice from "./features/dashboard/packageSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "package"],
};

const rootReducer = combineReducers({
  [fitOf.reducerPath]: fitOf.reducer,
  auth: authSlice,
  package: packageSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(fitOf.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
