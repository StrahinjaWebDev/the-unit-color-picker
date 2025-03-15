import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ColorRepository } from '../../data/repositories/ColorRepository';
import { Color } from '../../core/entities/Color.ts';

const repository = new ColorRepository();

export const fetchColors = createAsyncThunk('colors/fetch', async () => {
  return await repository.getColors();
});

const colorSlice = createSlice({
  name: 'colors',
  initialState: { list: [] as Color[], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default colorSlice.reducer;
