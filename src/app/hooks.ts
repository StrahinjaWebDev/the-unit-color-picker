import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store.ts';
import { fetchColors } from '../presentation/redux/colorSlice';
import { AppDispatch } from './store.ts';

export const useColors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const colors = useSelector((state: RootState) => state.colors.list);
  const status = useSelector((state: RootState) => state.colors.status);

  const loadColors = () => {
    dispatch(fetchColors());
  };

  return { colors, status, loadColors };
};
