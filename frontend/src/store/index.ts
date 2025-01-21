import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import documentReducer from "./slices/docSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configure persist settings for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Persist only auth slice
  document: documentReducer,
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
