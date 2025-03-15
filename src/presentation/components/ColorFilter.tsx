import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ColorFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const ColorFilter = ({ filter, setFilter }: ColorFilterProps) => {
  const [, setSearchParams] = useSearchParams();

  const onFilter = (newFilter: string) => {
    setFilter(newFilter);
    if (newFilter) {
      setSearchParams({ name: newFilter });
    } else {
      setSearchParams({});
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
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
