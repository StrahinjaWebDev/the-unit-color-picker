import { configureStore } from '@reduxjs/toolkit';
import colorReducer from '../../presentation/redux/colorSlice.ts';

export const store = configureStore({
  reducer: { colors: colorReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
