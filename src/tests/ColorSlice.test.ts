import { configureStore } from '@reduxjs/toolkit';
import colorReducer, {
  fetchColors,
  fetchColorsByName,
} from '../presentation/redux/colorSlice.ts';
import { FetchColors } from '../core/use-cases/fetchColors.ts';
import { FetchColorsByName } from '../core/use-cases/fetchColorByName.ts';
import { ColorRepository } from '../data/repositories/ColorRepository.ts';

jest.mock('../data/repositories/ColorRepository.ts');

const mockColorRepository = new ColorRepository();
const fetchColorsUseCase = new FetchColors(mockColorRepository);
const fetchColorsByNameUseCase = new FetchColorsByName(mockColorRepository);

jest.spyOn(fetchColorsUseCase, 'execute');
jest.spyOn(fetchColorsByNameUseCase, 'execute');

const store = configureStore({
  reducer: {
    colors: colorReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

const mockColorList = [
  { id: 1, name: 'Red' },
  { id: 2, name: 'Blue' },
];

describe('colorSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle fetchColors.fulfilled action', async () => {
    (fetchColorsUseCase.execute as jest.Mock).mockResolvedValue(mockColorList);

    await store.dispatch(fetchColors() as never);

    const state = store.getState() as RootState;
    expect(state.colors.list).toEqual(mockColorList);
  });

  it('should handle fetchColorsByName.fulfilled action', async () => {
    (fetchColorsByNameUseCase.execute as jest.Mock).mockResolvedValue([
      mockColorList[0],
    ]);

    await store.dispatch(fetchColorsByName('Red') as never);

    const state = store.getState() as RootState;
    expect(state.colors.list).toEqual([mockColorList[0]]);
  });

  it('should handle fetchColors.rejected action', async () => {
    (fetchColorsUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch colors'),
    );

    await store.dispatch(fetchColors() as never);

    const state = store.getState() as RootState;
    expect(state.colors.list).toEqual([]);
  });

  it('should handle fetchColorsByName.rejected action', async () => {
    (fetchColorsByNameUseCase.execute as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch color by name'),
    );

    await store.dispatch(fetchColorsByName('NonExistingColor') as never);

    const state = store.getState() as RootState;
    expect(state.colors.list).toEqual([]);
  });
});
