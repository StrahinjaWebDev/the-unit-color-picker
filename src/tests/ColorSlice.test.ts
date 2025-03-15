import { configureStore } from '@reduxjs/toolkit';
import colorReducer, {
  fetchColors,
  fetchColorsByName,
} from '../presentation/redux/colorSlice.ts';

jest.mock('../data/repositories/ColorRepository.ts');
jest.mock('../core/use-cases/fetchColors.ts');
jest.mock('../core/use-cases/fetchColorByName.ts');

const createTestStore = () =>
  configureStore({
    reducer: {
      colors: colorReducer,
    },
  });

type RootState = ReturnType<ReturnType<typeof createTestStore>['getState']>;

const mockColorList = [
  { id: '1', name: 'Red', hex: '#FF0000' },
  { id: '2', name: 'Blue', hex: '#0000FF' },
];

describe('colorSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle fetchColors.fulfilled action', async () => {
    const store = createTestStore();

    store.dispatch(fetchColors.fulfilled(mockColorList, '', undefined));

    const state = store.getState() as RootState;
    expect(state.colors).toEqual({ list: mockColorList });
  });

  it('should handle fetchColorsByName.fulfilled action', async () => {
    const store = createTestStore();

    store.dispatch(fetchColorsByName.fulfilled([mockColorList[0]], '', 'Red'));

    const state = store.getState() as RootState;
    expect(state.colors).toEqual({ list: [mockColorList[0]] });
  });

  it('should handle fetchColors.rejected action', async () => {
    const store = createTestStore();
    store.dispatch(
      fetchColors.rejected(new Error('Failed to fetch colors'), ''),
    );

    const state = store.getState() as RootState;
    expect(state.colors.list || []).toEqual([]);
  });

  it('should handle fetchColorsByName.rejected action', async () => {
    const store = createTestStore();
    store.dispatch(
      fetchColorsByName.rejected(
        new Error('Failed to fetch color by name'),
        '',
        'NonExistingColor',
      ),
    );

    const state = store.getState() as RootState;
    expect(state.colors.list || []).toEqual([]);
  });
});
