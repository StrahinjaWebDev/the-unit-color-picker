import { useSearchParams } from 'react-router-dom';

const useSetSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };
};

export default useSetSearchParam;
