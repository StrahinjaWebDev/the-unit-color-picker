import colorReducer, { fetchColors } from '../presentation/redux/colorSlice';

test('should handle initial state', () => {
  expect(colorReducer(undefined, { type: 'unknown' })).toEqual({
    list: [],
    status: 'idle',
  });
});

test('should update state when colors are fetched', () => {
  const action = {
    type: fetchColors.fulfilled.type,
    payload: [{ id: '1', name: 'Red', hex: '#ff0000' }],
  };
  expect(colorReducer(undefined, action)).toEqual({
    list: [{ id: '1', name: 'Red', hex: '#ff0000' }],
    status: 'succeeded',
  });
});
