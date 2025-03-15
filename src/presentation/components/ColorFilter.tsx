import { useState } from 'react';

interface ColorFilterProps {
  onFilter: (name: string) => void;
}

const ColorFilter = ({ onFilter }: ColorFilterProps) => {
  const [filter, setFilter] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className="p-2 border rounded"
        placeholder="Filter colors by name"
      />
    </div>
  );
};

export default ColorFilter;
