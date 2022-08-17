import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/TokenSlice";

const rootReducer = combineReducers({
  tokenReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
