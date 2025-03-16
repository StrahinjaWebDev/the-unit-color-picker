import { ChangeEvent } from 'react';
import useSetSearchParam from '../../app/hooks/useSetSearchParam.ts';

interface ColorFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const ColorFilter = ({ filter, setFilter }: ColorFilterProps) => {
  const setSearchValue = useSetSearchParam();

  const onFilter = (newFilter: string) => {
    setFilter(newFilter);
    setSearchValue('name', newFilter || null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilter(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a color..."
      />
    </div>
  );
};

export default ColorFilter;
