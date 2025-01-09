import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authSlice from "../redux/slices/authSlice";
import resumeSlice from "./slices/resumeSlice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root", 
  storage,
  whitelist: ["auth"], 
};

const rootReducer = combineReducers({
  auth: authSlice,
  resume: resumeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], 
        ignoredPaths: ["auth.createdAt", "auth.updatedAt"], 
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;