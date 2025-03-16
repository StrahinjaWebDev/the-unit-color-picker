import { useSearchParams } from 'react-router-dom';

const useGetSearchParam = (key: string): string => {
  const [searchParams] = useSearchParams();
  return searchParams.get(key) || '';
};

export default useGetSearchParam;
