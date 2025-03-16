import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import {
  fetchColors,
  fetchColorsByName,
} from '../../presentation/redux/colorSlice.ts';
import { AppDispatch } from '../store/store.ts';

export const useColors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const colors = useSelector((state: RootState) => state.colors.list);

  const loadColors = () => {
    dispatch(fetchColors());
  };

  const loadColorsByName = (name: string) => {
    return dispatch(fetchColorsByName(name));
  };

  return { colors, loadColors, loadColorsByName };
};
