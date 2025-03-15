import { useState } from 'react';

interface ColorFilterProps {
  onFilter: (name: string) => void;
  initialValue: string;
}

const ColorFilter = ({ onFilter }: ColorFilterProps) => {
  const [filter, setFilter] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
