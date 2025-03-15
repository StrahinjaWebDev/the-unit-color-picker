import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Color } from '../../core/entities/Color.ts';
import { ColorRepository } from '../../data/repositories/ColorRepository';
import { FetchColors } from '../../core/use-cases/fetchColors.ts';
import { FetchColorsByName } from '../../core/use-cases/fetchColorByName.ts';

const fetchColorsUseCase = new FetchColors(new ColorRepository());
const fetchColorsByNameUseCase = new FetchColorsByName(new ColorRepository());

export const fetchColors = createAsyncThunk('colors/fetch', async () => {
  return await fetchColorsUseCase.execute();
});

export const fetchColorsByName = createAsyncThunk(
  'colors/fetchByName',
  async (name: string) => {
    return await fetchColorsByNameUseCase.execute(name);
  },
);

const colorSlice = createSlice({
  name: 'colors',
  initialState: { list: [] as Color[] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchColorsByName.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default colorSlice.reducer;
